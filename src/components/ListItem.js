import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
} from 'react-native';
import { Label } from './Label';
import ToggleInput from './ToggleInput';

export const ListItem = ({ item, onCheck=(item)=>null, onDel=(item)=>null }) => {
  const [expand, setExpand] = useState(false);

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
      <View style={{height:expand === true ? 270 : 60}}>
        <View style={styles.header}>
          <View style={styles.headerDetails}>
            <Label style={styles.title} value={item.desc}/>
            <Label style={styles.val} value={formatValues(item.val)}/>
          </View>

          {item.type && item.type.includes('debit') && (
            <ToggleInput 
              initialEnabled={item.paid === true}
              onChange={() => onCheck(item)}
            />
          )}
        </View>

        {expand === true ? (
          <>
            <Label style={styles.desc} value={item.type}/>
            <Label style={styles.desc} value={item.cat}/>
            <Label style={styles.desc} value={item.month}/>
            <Label style={styles.desc} value={item.year}/>
            <Label style={styles.desc} value={item.rec}/>

            <TouchableHighlight 
                style={styles.delBtn}
                underlayColor={'transparent'}
                onPress={() => onDel(item)}>

                <Label value={'Excluir'} style={styles.delBtnLbl}/>

            </TouchableHighlight>
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
  header:{
    flex:1,
    flexDirection:'row',
  },
  headerDetails:{
    width:window.width * 0.7
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
  delBtn:{
    width:window-20,
    backgroundColor:'#fff',
    marginVertical:20
  },
  delBtnLbl:{
    textAlign:'center',
    color:'#d50000',
  },

});