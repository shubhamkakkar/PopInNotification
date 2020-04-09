import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PopInNotch from './PopInNotch/PopInNotch';
export default function PopInNotchContainer({state}: {state: boolean}) {
  return (
    <View style={styles.container}>
      <PopInNotch
        {...{
          bottom: 10,
          text: 'Shubham',
          state,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
