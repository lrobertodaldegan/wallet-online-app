import React, { useState, useContext } from 'react';
import { 
  View, 
  ActivityIndicator, 
  TouchableHighlight, 
  Alert, 
  StyleSheet,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import { AuthContext, BaseURL } from '../components/AuthContext';
import { Label } from '../components/Label';
import Input from '../components/Input';
import Select from '../components/Select';

const Types = [
  {label:'Entrada (creditou)', value:'Entrada (creditou)'},
  {label:'Saída (debitou)', value:'Saída (debitou)'}
];

const Cats = [
  {label:'Cartão de Crédito',value:'Cartão de Crédito'}, 
  {label:'Seguro automotivo',value:'Seguro automotivo'}, 
  {label:'Seguro imobiliário',value:'Seguro imobiliário'}, 
  {label:'Combustível',value:'Combustível'}, 
  {label:'Alimentação',value:'Alimentação'}, 
  {label:'Lazer',value:'Lazer'}, 
  {label:'Imposto',value:'Imposto'}, 
  {label:'Conta',value:'Conta'}, 
  {label:'Financiamento de automóvel',value:'Financiamento de automóvel'}, 
  {label:'Financiamento de imóvel',value:'Financiamento de imóvel'}, 
  {label:'Roupas', value:'Roupas'},
  {label:'Manutenção de automóvel', value:'Manutenção de automóvel'}, 
  {label:'Manutenção de imóvel',value:'Manutenção de imóvel'}, 
  {label:'Empréstimo',value:'Empréstimo'}, 
  {label:'Salário',value:'Salário'}, 
  {label:'Outros',value:'Outros'}, 
].sort((a, b) => {
  if (a.label < b.label) {
    return -1;
  }
  if (a.label > b.label) {
    return 1;
  }
  return 0;
});

const Recs = [
  {label:'Mensal', value:'Mensal'}, 
  {label:'Eventual', value:'Eventual'},
];

const Months = [
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

const YearsB = Array.from(new Array(2), (_, index) => {
  let yb = ((new Date().getFullYear() - (index+1)).toString());

  return {label:yb, value:yb};
});
const YearsF = Array.from(new Array(3), (_, index) => {
  let yf = ((new Date().getFullYear() + (index)).toString());

  return {label:yf, value:yf};
});

const Years = [...YearsB, ...YearsF].sort((a, b) => {
  if (a.label < b.label) {
    return -1;
  }
  if (a.label > b.label) {
    return 1;
  }
  return 0;
});

const AddScreen = ({ navigation }) => {
  const [desc, setDesc] = useState('');
  const [value, setValue] = useState('');
  const [cat, setCat] = useState('');
  const [type, setType] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [rec, setRec] = useState('');
  const [isLoading, setLoading] = useState(false);
  const { token, signOut } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut(() => navigation.navigate('Login'));
  }

  const handleLogin = async () => {
    let ok = true;

    let msg = '';

    if(!desc || desc.length < 1){
      ok = false;
      msg += "Informe uma descrição válida!\n";
    }

    if(!value || value.length < 1){
      ok = false;
      msg += "Informe um valor válido!\n";
    }

    if(!cat || cat.length < 3){
      ok = false;
      msg += "Selecione uma categoria!\n";
    }

    if(!type || type.length < 3){
      ok = false;
      msg += "Selecione um tipo (entrada ou saída)!\n";
    }

    if(!month || month.length < 3){
      ok = false;
      msg += "Selecione um mês!\n";
    }

    if(!year || year.length < 4){
      ok = false;
      msg += "Selecione um ano!\n";
    }

    if(!rec || rec.length < 4){
      ok = false;
      msg += "Selecione uma recorrência!\n";
    }

    if(ok === true){
      try {
        setLoading(true);

        let body = {
          desc:desc,
          val:value,
          type:type,
          cat:cat,
          month:month,
          year:year,
          rec:rec
        };

        const response = await fetch(`${BaseURL}/item`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.ok) {
          navigation.navigate('Home');
        } else {
          if(response && response.status === 401)
            handleSignOut();
          else
            Alert.alert('Erro', data?.message || 'Falha ao cadastrar item');
        }
      } catch (error) {
        Alert.alert('Erro', 'Falha inexperada ao cadastrar item');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Info', msg);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}
        behavior='padding'>

      <ImageBackground style={styles.logo}
          source={require('../assets/logo-500.png')}/>

      <Label value={'Novo item'}
              style={styles.wellcome}/>

      <Input
        placeholder="Descrição"
        val={desc}
        onChangeVal={setDesc}
        placeholderTextColor={'#888'}
      />

      <Input
        placeholder="Valor"
        val={value}
        onChangeVal={setValue}
        placeholderTextColor={'#888'}
        keyboardType='numeric'
      />

      <View style={styles.formGroup}>
        <Select 
          placeholder='Escolha uma categoria...'
          legend='Categoria'
          onSelect={(v) => setCat(v)}
          options={Cats}
        />

        <Select 
          placeholder='Escolha um tipo...'
          legend='Tipo'
          onSelect={(v) => setType(v)}
          options={Types}
        />
      </View>

      <View style={styles.formGroup}>
        <Select 
          placeholder='Escolha um mês...'
          legend='Mês'
          onSelect={(v) => setMonth(v)}
          options={Months}
        />

        <Select 
          placeholder='Escolha um ano...'
          legend='Ano'
          onSelect={(v) => setYear(v)}
          options={Years}
        />
      </View>

      <Select 
        placeholder='Escolha a recorrência...'
        legend='Recorrência'
        onSelect={(v) => setRec(v)}
        options={Recs}
      />

      <TouchableHighlight 
          style={styles.button}
          underlayColor={'transparent'}
          onPress={handleLogin}>

        {isLoading === true ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Label value='Salvar' style={styles.btnLbl}/>
        )}

      </TouchableHighlight>

      <TouchableHighlight 
          style={styles.linkBtn}
          underlayColor={'transparent'}
          onPress={() => navigation.navigate('Home')}>

          <Label value={'Voltar'}
              style={styles.passBtnLbl}/>

        </TouchableHighlight>
    </KeyboardAvoidingView>
  );
};

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  loadConteiner:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  container:{
    height:window.height,
    width:window.width,
    backgroundColor:'#fafafa',
    justifyContent:'flex-end',
  },
  logo:{
    height:window.width * 0.25,
    width:window.width * 0.25,
    marginLeft:window.width * 0.37,
    marginBottom:window.width * 0.1,
  },
  wellcome:{
    textAlign:'center',
    color:'#000',
    fontSize:20,
    marginBottom:20,
  },
  formGroup:{
    flexDirection:'row',
    width:window.width - 20,
    marginLeft:10,
    paddingVertical:10,
    justifyContent:'space-between',
  },
  button: {
    width:window.width - 40,
    height:50,
    marginLeft:20,
    marginTop:20,
    backgroundColor:'#000',
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center'
  },
  btnLbl:{
    color:'#FFF',
    fontSize:20
  },
  linkBtn:{
    width:window.width - 40,
    height:50,
    marginLeft:20,
    marginTop:10,
    backgroundColor:'transparent',
    alignItems:'center',
    justifyContent:'center'
  },
});

export default AddScreen;