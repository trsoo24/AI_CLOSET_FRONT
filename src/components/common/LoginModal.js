import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { X } from 'lucide-react-native';
import { COLORS, SPACING } from '../../constants';
import { LoginScreen } from '../../screens/LoginScreen';

export const LoginModal = ({ visible, onClose, onLoginSuccess }) => {
  const handleLoginSuccess = () => {
    onLoginSuccess?.();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
        >
          <X size={24} color={COLORS.gray700} />
        </TouchableOpacity>

        <LoginScreen
          onLoginSuccess={handleLoginSuccess}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1000,
    padding: SPACING.sm,
  },
});
