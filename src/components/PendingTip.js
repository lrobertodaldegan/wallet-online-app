import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Label } from './Label';
import { useState } from 'react';

const PendingTip = ({ itens=[] }) => {

  const formatValues = (val) => {
    const f = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2 
    });

    return f.format(val);
  };

  const renderPendingLabel = () => {
    if(itens && itens.length > 0){
      let pendingQtd = 0;
      let pendingValue = 0;
      
      for(let i of itens){
        if(i.paid === false && i.type.includes('debit')){
          pendingValue -= i.val;
          pendingQtd += 1;
        }
      }

      if(pendingQtd > 0){
        return (
          <Label style={styles.pendingLbl}
            value={`Você ainda possui ${pendingQtd} contas em aberto! (${formatValues(pendingValue)})`}/>
        );
      } else {
        return (
          <Label style={styles.pendingLbl}
            value={`Parabéns! Todas as contas foram pagas!`}/>
        );
      }
    }

    return <></>;
  }

  return (
    <View style={styles.pendingValues}>
      {renderPendingLabel()}
    </View>
  );
};

const styles = StyleSheet.create({
  pendingValues:{
    backgroundColor:'rgba(255, 174, 23, .5)',
    borderRadius:10,
    marginVertical:5,
    paddingVertical:10,
    paddingHorizontal:20
  },
  pendingLbl:{
    textAlign:'center'
  },
});

export default PendingTip;