import React from 'react';
import { 
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';

const Input = ({
                placeholder="",
                style={},
                val="",
                onChangeVal=(t)=>null,
                placeholderTextColor="",
                secure=false,
                keyboardType='default'
              }) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={[styles.input, style]}
      value={val}
      onChangeText={onChangeVal}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={secure}
      keyboardType={keyboardType}
    />
  );
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  input: {
    width:window.width - 40,
    height:50,
    marginLeft:20,
    backgroundColor:'#fff',
    fontFamily: 'Montserrat-Regular',
    borderRadius:10,
    marginTop:5,
    paddingHorizontal:10,
  },
});

export default Input;