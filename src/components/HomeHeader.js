import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import {Label} from './Label';
import Input from './Input';
import Select from './Select';
import ToggleInput from './ToggleInput';
import PendingTip from './PendingTip';

const monthOptions = [
  {label:'JAN', value:'JAN'}, 
  {label:'FEV', value:'FEV'}, 
  {label:'MAR', value:'MAR'}, 
  {label:'ABR', value:'ABR'}, 
  {label:'MAI', value:'MAI'}, 
  {label:'JUN', value:'JUN'}, 
  {label:'JUL', value:'JUL'}, 
  {label:'AGO', value:'AGO'}, 
  {label:'SET', value:'SET'}, 
  {label:'OUT', value:'OUT'}, 
  {label:'NOV', value:'NOV'}, 
  {label:'DEZ', value:'DEZ'},
];

const initialMonthVal = monthOptions[(new Date().getMonth())].value;

const YearsB = Array.from(new Array(2), (_, index) => {
  let yb = ((new Date().getFullYear() - (index+1)).toString());

  return {label:yb, value:yb};
});
const YearsF = Array.from(new Array(3), (_, index) => {
  let yf = ((new Date().getFullYear() + (index)).toString());

  return {label:yf, value:yf};
});

const yearsOptions = [...YearsB, ...YearsF].sort((a, b) => {
  if (a.label < b.label) {
    return -1;
  }
  if (a.label > b.label) {
    return 1;
  }
  return 0;
});

const initialYearVal = yearsOptions[2].value;

const HomeHeader = ({
                    itens=[], 
                    selectedMonth=initialMonthVal,
                    selectedYear=initialYearVal,
                    onFilter=(text, unpaid)=>null, 
                    onDateFilter=(month, year)=>null
                  }) => {
  const [balance, setBalance] = useState(0);
  const [debits, setDebits] = useState(0);
  const [textFilter, setTextFilter] = useState("");
  const [unpaid, setUnpaid] = useState(false);

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

  useEffect(() => {
    onFilter(textFilter, unpaid);
  }, [textFilter, unpaid]);

  const formatValues = (val) => {
    const f = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2 
    });

    return f.format(val);
  };

  

  return (
    <>
      <PendingTip itens={itens}/>

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

      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Input val={textFilter} 
            placeholder='Busque por nome'
            onChangeVal={(t) => setTextFilter(t)}
            style={styles.formInput}
          />
          {textFilter && textFilter.length > 0 && (
            <TouchableHighlight 
                style={styles.cleanBtn}
                underlayColor={'transparent'}
                onPress={() => setTextFilter("")}>
      
                <Label value={'x'}
                    style={styles.cleanBtnLbl}/>
      
            </TouchableHighlight>
          )}
        </View>

        <View style={styles.formGroup}>
          <View style={styles.formGroupItem}>
            <Select initialVal={selectedMonth} 
              legend='Mês'
              placeholder='Escolha um mês'
              options={monthOptions}
              onSelect={(newMonth) => onDateFilter(newMonth, null)}/>
          </View>
          <View style={styles.formGroupItem}>
            <Select initialVal={selectedYear} 
              legend='Ano'
              placeholder='Escolha um ano'
              options={yearsOptions}
              onSelect={(newYear) => onDateFilter(null, newYear)}/>
          </View>
          <View style={styles.formGroupItem}>
            <ToggleInput 
              labels={['Em aberto', 'Em aberto']}
              onChange={() => setUnpaid(!unpaid)}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const window = Dimensions.get('window');

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
  form:{
    borderRadius:10,
    marginVertical:5,
    backgroundColor:'#fff',
  },
  formGroup:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  formGroupItem:{
    width:(window.width-20) * 0.3
  },
  formInput:{
    width:window.width * 0.72,
    height:40,
    paddingHorizontal:5,
  },
  cleanBtn:{
    backgroundColor:'#eee',
    borderRadius:25,
    height:30,
    width:30,
    alignItems:'center',
  },
  cleanBtnLbl:{
    fontSize:20,
    color:'#888'
  },
});

export default HomeHeader;