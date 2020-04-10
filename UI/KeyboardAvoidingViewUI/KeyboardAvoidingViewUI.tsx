import React from 'react';
import {ScrollView, KeyboardAvoidingView, StyleSheet, Platform} from 'react-native';
export default function KeyboardAvoidingViewUI({children}: {children: React.ReactNode}) {
  return (
    <KeyboardAvoidingView
      style={s.flex}
      enabled={true}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>{children}</ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'space-around',
  },
});
