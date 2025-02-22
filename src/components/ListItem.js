import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
} from 'react-native';
import { AuthContext, BaseURL } from '../components/AuthContext';
import { Label } from './Label';

export const ListItem = ({ item, onCheck=()=>null, onDel=()=>null }) => {
  const { token } = useContext(AuthContext);
  const [expand, setExpand] = useState(false);

  const handleMarkItem = (item) => {
    let body = {
      id:item._id,
      month:month,
      year:year
    };

    let url = `${BaseURL}${item.paid === true ? `/item/unpay` : `/item/pay`}`;

    api.put(url, body, {
      headers: {
        'Authorization': `${token}`,
      }
    }).catch(error => console.error('Erro ao marcar ou desmarcar item:', error));

    onCheck();
  };

  const handleDelItem = (item) => {
    api.delete(`${BaseURL}/item?id=${item._id}&month=${month}&year=${year}`, {
      headers: {
        'Authorization': `${token}`,
      }
    }).catch(error => console.error('Erro ao deletar item:', error));

    onDel();
  };

  const formatValues = (val) => {
    const f = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2 
    });

    return f.format(val);
  };

  if(!item || item == null)
    return <></>;

  const borderColor = item.type && item.type.includes('debit') ? '#d50000' : 'green';

  return (
    <View style={[styles.container, {borderRightColor:borderColor}]}>
      <View style={{height:expand === true ? 220 : 60}}>
        <Label style={styles.title} value={item.desc}/>
        <Label style={styles.val} value={formatValues(item.val)}/>

        {expand === true ? (
          <>
            <Label style={styles.desc} value={item.type}/>
            <Label style={styles.desc} value={item.cat}/>
            <Label style={styles.desc} value={item.month}/>
            <Label style={styles.desc} value={item.year}/>
            <Label style={styles.desc} value={item.rec}/>
            <Label style={styles.desc} value={item.paid}/>
          </>
        ) : <></>}
      </View>

      <TouchableHighlight 
          style={styles.expandBtn}
          underlayColor={'transparent'}
          onPress={() => setExpand(!expand)}>

          <Label value={expand === true ? 'Mostrar menos' : 'Mostrar mais'}
              style={styles.expandBtnLbl}/>

      </TouchableHighlight>
    </View>
  );
};

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container:{
    width:window-20,
    backgroundColor:'#fff',
    padding:10,
    paddingRight:0,
    borderRightWidth:5,
    borderBottomWidth:1,
    borderBottomColor:'#fafafa',
  },
  title:{
    fontSize:18,
    marginBottom:5
  },
  val:{
    fontSize:16,
    marginBottom:5 
  },
  desc:{
    marginTop:5,
  },
  expandBtn:{
    width:window-20,
  },
  expandBtnLbl:{
    textAlign:'center',
    color:'#888',
  },

});