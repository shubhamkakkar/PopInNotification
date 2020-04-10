import React, {ReactNode, useRef} from 'react';
import {
  TouchableOpacity,
  Animated,
  Dimensions,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  PanResponder,
} from 'react-native';
import {KeyboardAvoidingViewUI} from '../';

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
  visible: boolean;
  headerTitle: string;
  isDoneEnabled?: boolean;
};

const {height} = Dimensions.get('screen');
const translateYHeight = height / 6;

export default function BottomSheet({
  isDoneEnabled,
  headerTitle,
  visible,
  children,
  onClose,
}: ModalProps) {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: (evt, grantState) => {
        console.log({evt, grantState});
        return Animated.event([null, {dx: pan.x, dy: pan.y}], {
          useNativeDriver: true,
        });
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;

  const translateY = React.useMemo(() => new Animated.Value(height), []);

  function animationStart(toValue: number) {
    Animated.spring(translateY, {
      toValue,
      useNativeDriver: true,
    }).start();
  }

  React.useEffect(() => {
    visible && animationStart(translateYHeight);
  }, [visible]);

  function onPressCancel() {
    animationStart(-height);
    onClose();
  }

  function onPressDone() {
    if (isDoneEnabled) {
      animationStart(-height);
      onClose();
    }
  }

  console.log({pan});

  function Header() {
    return (
      <View style={[styles.header, styles.topBorderRadius]} {...panResponder.panHandlers}>
        <TouchableOpacity {...{onPress: onPressCancel}}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>{headerTitle}</Text>
        </View>
        <TouchableOpacity {...{onPress: onPressDone}} disabled={!isDoneEnabled}>
          <Text style={isDoneEnabled ? styles.cancelText : styles.disableButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  }
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
    marginLeft: '1.5%',
    marginRight: '1.5%',
    bottom: 0,
    width: '97%',
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
    zIndex: 500,
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2196f3',
  },
  bottomArea: {
    height: '100%',
  },
  cancelText: {
    color: '#2196f3',
  },
  childrenWrapper: {
    flex: 1,
    padding: 10,
  },
  headerTextWrapper: {
    flex: 1,
  },
  disableButtonText: {
    color: '#ccc',
  },
});
