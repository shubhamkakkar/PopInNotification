import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {PopInNotch} from './UI';
export default function App() {
  const [state, setstate] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <PopInNotch
        {...{
          state,
          text: 'Alert',
        }}
      />
      <Button title="Click Me" onPress={() => setstate(!state)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
