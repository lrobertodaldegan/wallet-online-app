import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {Label} from './Label';

const HomeHeader = ({itens=[]}) => {
  const [balance, setBalance] = useState(0);
  const [debits, setDebits] = useState(0);

  useEffect(() => {
    setBalance(
      itens.reduce((total, item) =>
        item.type.includes('debit') ? total - item.val : total + item.val, 0)
    );

    setDebits(
      itens.reduce((total, item) =>
        item.type.includes('debit') ? total - item.val : total + 0, 0)
    );
  }, []);

  const formatValues = (val) => {
    const f = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2 
    });

    return f.format(val);
  };

  return (
    <View style={styles.container}>
      <View>
        <Label value='Saldo:' style={styles.legend}/>
        <Label value={formatValues(balance)} style={styles.balance}/>
      </View>

      <View>
        <Label value='Saídas:' style={styles.legend}/>
        <Label value={formatValues(debits)} style={styles.debits}/>
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
    backgroundColor:'#fff',
    justifyContent:'space-between'
  },
  legend:{
    color:'#888',
    fontSize:10
  },
  balance:{
    fontSize:24
  },
  debits:{
    fontSize:24,
    color:'#d50000'
  },
});

export default HomeHeader;