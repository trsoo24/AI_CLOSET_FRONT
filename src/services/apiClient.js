import { API_CONFIG } from '../config/api';
import { tokenService } from './tokenService';

class ApiClient {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
    this.isRefreshing = false; // 토큰 갱신 중복 방지
    this.failedQueue = []; // 갱신 대기 중인 요청들
  }

  // 토큰 가져오기 (tokenService 사용으로 변경)
  async getToken() {
    return await tokenService.getAccessToken();
  }

  // 공통 헤더 생성
  async getHeaders(needsAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (needsAuth) {
      const token = await this.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  // 토큰 갱신
  async refreshToken() {
    try {
      const refreshToken = await tokenService.getRefreshToken();
      if (!refreshToken) {
        throw new Error('REFRESH_TOKEN_NOT_FOUND');
      }

      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('REFRESH_FAILED');
      }

      const data = await response.json();
      await tokenService.saveTokens(data.data.accessToken, data.data.refreshToken);
      return true;
    } catch (error) {
      console.error('토큰 갱신 실패:', error);
      await tokenService.clearTokens(); // 토큰 갱신 실패 시 모두 삭제
      return false;
    }
  }

  // 401 에러 시 대기 중인 요청 처리
  processQueue(error, token = null) {
    this.failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    this.failedQueue = [];
  }

  // 공통 요청 메서드
  async request(method, endpoint, data = null, params = {}, needsAuth = true) {
    try {
      const queryString = Object.keys(params).length
        ? '?' + new URLSearchParams(params).toString()
        : '';
      
      const url = `${this.baseURL}${endpoint}${queryString}`;
      const headers = await this.getHeaders(needsAuth);

      const options = {
        method,
        headers,
      };

      if (data && method !== 'GET') {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(url, options);

      // 401 Unauthorized 처리
      if (response.status === 401 && needsAuth) {
        // 이미 토큰 갱신 중이면 대기
        if (this.isRefreshing) {
          return new Promise((resolve, reject) => {
            this.failedQueue.push({ resolve, reject });
          })
            .then(() => {
              // 갱신 완료 후 재시도
              return this.request(method, endpoint, data, params, needsAuth);
            })
            .catch(err => {
              throw err;
            });
        }

        // 토큰 갱신 시작
        this.isRefreshing = true;

        try {
          const refreshed = await this.refreshToken();
          
          if (refreshed) {
            this.processQueue(null);
            // 갱신 성공 후 재시도
            return await this.request(method, endpoint, data, params, needsAuth);
          } else {
            // 갱신 실패
            const error = new Error('UNAUTHORIZED');
            this.processQueue(error, null);
            throw {
              status: 401,
              message: '인증이 만료되었습니다. 다시 로그인해주세요.',
              code: 'UNAUTHORIZED',
            };
          }
        } finally {
          this.isRefreshing = false;
        }
      }

      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // GET 요청
  async get(endpoint, params = {}, needsAuth = true) {
    return this.request('GET', endpoint, null, params, needsAuth);
  }

  // POST 요청
  async post(endpoint, data = {}, needsAuth = true) {
    return this.request('POST', endpoint, data, {}, needsAuth);
  }

  // PUT 요청
  async put(endpoint, data = {}, needsAuth = true) {
    return this.request('PUT', endpoint, data, {}, needsAuth);
  }

  // DELETE 요청
  async delete(endpoint, needsAuth = true) {
    return this.request('DELETE', endpoint, null, {}, needsAuth);
  }

  // PATCH 요청 (추가)
  async patch(endpoint, data = {}, needsAuth = true) {
    return this.request('PATCH', endpoint, data, {}, needsAuth);
  }

  // 응답 처리
  async handleResponse(response) {
    // Content-Type 확인
    const contentType = response.headers.get('content-type');

    // JSON이 아닌 응답 처리 (HTML 에러 페이지 등)
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('JSON이 아닌 응답:', {
        status: response.status,
        statusText: response.statusText,
        contentType,
        body: text.substring(0, 200), // 처음 200자만 로깅
      });

      throw {
        status: response.status,
        message: response.status === 200
          ? '서버가 올바른 형식의 데이터를 반환하지 않았습니다.'
          : `서버 오류 (${response.status})`,
        data: text,
      };
    }

    let data;
    try {
      data = await response.json();
    } catch (err) {
      console.error('JSON 파싱 실패:', err);
      throw {
        status: response.status,
        message: 'JSON 파싱 실패',
        data: null,
      };
    }

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || '오류가 발생했습니다.',
        data: data,
      };
    }

    return {
      success: true,
      data: data.data || data,
      message: data.message,
    };
  }

  // 에러 처리
  handleError(error) {
    console.error('API 요청 실패:', error);
    
    // 인증 만료 에러는 상위로 전파
    if (error.code === 'UNAUTHORIZED') {
      throw error;
    }
    
    return {
      success: false,
      error: error.message || '네트워크 오류가 발생했습니다.',
      status: error.status,
    };
  }
}

export default new ApiClient();