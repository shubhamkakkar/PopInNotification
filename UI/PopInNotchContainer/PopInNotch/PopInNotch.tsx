import React from 'react';
import {Animated, Dimensions, StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';

type TPopInNotch = {
  bottom: number;
  text: string;
  state: boolean;
  customContainerStyle?: ViewStyle;
  iconComponent?: React.ReactChild;
  customIconContainerStyle?: ViewStyle;
  customTextStyle?: TextStyle;
};

const {width: SCREENWIDTH} = Dimensions.get('window');

export default function PopInNotch({
  bottom,
  state,
  customContainerStyle,
  iconComponent,
  customIconContainerStyle,
  text,
  customTextStyle,
}: TPopInNotch) {
  const opacity = React.useMemo(() => new Animated.Value(0), []);

  function animationRunner(toValue: number) {
    Animated.timing(opacity, {
      toValue,
      useNativeDriver: true,
      duration: 1000,
    }).start();
  }

  React.useEffect(() => {
    if (state) {
      animationRunner(1);
      setTimeout(() => animationRunner(0), 5000);
    }
  }, [state]);

  return (
    <Animated.View style={[styles.container, customContainerStyle, {opacity, bottom}]}>
      <View style={styles.intermediateWrapper}>
        {iconComponent && (
          <View style={[styles.iconContainer, customIconContainerStyle]}>{iconComponent}</View>
        )}
        <View style={styles.textContainer}>
          <Text style={[styles.text, customTextStyle]}>{text}</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    right: 10,
    position: 'absolute',
    width: (SCREENWIDTH * 2) / 3,
    height: 50,
    backgroundColor: 'blue',
  },
  intermediateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
    padding: 20,
  },
  iconContainer: {
    marginHorizontal: 10,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});
