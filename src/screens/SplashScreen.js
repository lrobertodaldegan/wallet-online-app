import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.splashContainer}>
      <Image source={require('../assets/logo-500.png')} style={styles.splashLogo} />
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Cor de fundo da splash screen
  },
  splashLogo: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
  },
});

export default SplashScreen;