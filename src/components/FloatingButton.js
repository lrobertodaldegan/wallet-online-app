import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Label } from './Label';

const FloatingButton = ({ label="+", onPress=()=>null }) => {
  return (
    <TouchableOpacity style={styles.fab} 
        onPress={onPress}>
      <Label value={label} style={styles.fabText}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    minWidth: 50,
    height: 50,
    paddingHorizontal:10,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#000',
    borderRadius: 5,
    elevation: 8, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 }, // Sombra para iOS
    shadowOpacity: 0.3, // Sombra para iOS
    shadowRadius: 2, // Sombra para iOS
  },
  fabText: {
    color: 'white',
  },
});

export default FloatingButton;