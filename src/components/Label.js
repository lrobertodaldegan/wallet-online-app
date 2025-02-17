import React, { useState, useEffect } from 'react';
import {
    Text,
    StyleSheet,
} from 'react-native';

export const Label = ({ value='', style={} }) => {
  return (
    <Text style={{...styles.l, ...style}}>{value}</Text>
  );
};

const styles = StyleSheet.create({
    l:{
        fontFamily: 'Montserrat-Regular',
    },
});