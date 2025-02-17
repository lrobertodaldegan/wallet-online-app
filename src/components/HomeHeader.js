import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {Label} from './Label';

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <View>
        <Label value='Saldo:' style={styles.legend}/>
        <Label value='R$ 0,00' style={styles.balance}/>
      </View>

      <View>
        <Label value='Saídas:' style={styles.legend}/>
        <Label value='R$ 0,00' style={styles.debits}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    padding:10,
    borderRadius:10,
    marginVertical:5,
    backgroundColor:'#fff'
  },
  legend:{
    color:'#ccc',
    fontSize:10
  },
  balance:{
    fontSize:20
  },
  debits:{
    fontSize:20,
    color:'#d50000'
  },
});

export default HomeHeader;