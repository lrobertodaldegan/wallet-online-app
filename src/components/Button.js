import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Label } from './Label';

const Button = ({ label="+", onPress=()=>null }) => {
  return (
    <TouchableOpacity style={styles.fab} 
        onPress={onPress}>
      <Label value={label} style={styles.fabText}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    height: 50,
    paddingHorizontal:10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    borderRadius: 5,
  },
  fabText: {
    color: 'white',
  },
});

export default Button;