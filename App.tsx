import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {PopInNotchContainer} from './UI';
export default function App() {
  const [state, setstate] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <PopInNotchContainer {...{state}} />
      <Button title="Click Me" onPress={() => setstate(!state)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
