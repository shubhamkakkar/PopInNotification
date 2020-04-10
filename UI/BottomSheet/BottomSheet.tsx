import React, {ReactNode} from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAvoidingViewUI} from '../';

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
  visible: boolean;
  headerTitle: string;
};

const {height} = Dimensions.get('screen');
const translateYHeight = height / 6;

export default function BottomSheet({headerTitle, visible, children, onClose}: ModalProps) {
  const translateY = React.useMemo(() => new Animated.Value(height), []);

  function animationStart(toValue: number) {
    Animated.spring(translateY, {
      toValue,
      useNativeDriver: true,
    }).start(() => {});
  }

  React.useEffect(() => {
    visible && animationStart(translateYHeight);
  }, [visible]);

  function onPress() {
    animationStart(-height);
    onClose();
  }

  const Header = () => (
    <View style={styles.header}>
      <View style={styles.cancelButtonWrapper}>
        <TouchableOpacity {...{onPress}}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.headerText}>{headerTitle}</Text>
    </View>
  );
  return (
    <Modal transparent visible={visible} animationType={'slide'}>
      <Animated.View style={[styles.modal, styles.topBorderRadius]}>
        <SafeAreaView style={[styles.bottomArea, styles.topBorderRadius]}>
          <Header />
          <View style={[styles.childrenWrapper, styles.topBorderRadius]}>
            <KeyboardAvoidingViewUI>{children}</KeyboardAvoidingViewUI>
          </View>
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  topBorderRadius: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modal: {
    position: 'absolute',
    marginLeft: '1%',
    marginRight: '1%',
    bottom: 0,
    width: '98%',
    height: '75%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 24,
    zIndex: 24,
  },
  header: {
    padding: 10,
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2196f3',
  },
  bottomArea: {
    height: '100%',
  },
  cancelButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  cancelText: {
    color: '#2196f3',
  },
  childrenWrapper: {
    flex: 1,
  },
});
