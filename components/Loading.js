import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

// lib
import i18n from '../lib/i18n/i18n';

export default function Loading() {
  return (
    <View style={styles.container}>
      <Text style={styles.textLoading}>{`${i18n.t('loading')}...`}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    justifyContent: 'center',
    alignItems: 'center'
  },
  textLoading: {
    marginTop: 20,
    fontSize: 30,
    color: "#444",
  },
});
