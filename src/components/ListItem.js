import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';

export const ListItem = ({ item, onPay=()=>null, onDel=()=>null }) => {
  const [expand, setExpand] = useState(false);

  if(!item || item == null)
    return <></>;

  return (
    <View style={styles.container}>
        <Text>{item._id}</Text>
        <Text>{item.desc}</Text>
        <Text>{item.val}</Text>
        <Text>{item.type}</Text>
        <Text>{item.cat}</Text>
        <Text>{item.month}</Text>
        <Text>{item.year}</Text>
        <Text>{item.rec}</Text>
        <Text>{item.paid}</Text>
    </View>
  );
};

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        width:window-20,
        minHeight:50,
        backgroundColor:'#fff'
    },

});