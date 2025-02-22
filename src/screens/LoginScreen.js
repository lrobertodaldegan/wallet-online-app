import React, { useState, useEffect, useContext } from 'react';
import { 
  View, 
  TextInput, 
  TouchableHighlight, 
  Alert, 
  StyleSheet,
  Dimensions,
  Linking,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import { AuthContext, BaseURL } from '../components/AuthContext';
import { Label } from '../components/Label';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { token, signIn } = useContext(AuthContext);

  useEffect(() => {
    if(token && token !== null){
      navigation.navigate('Home');
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BaseURL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        signIn(data.token, () => navigation.navigate('Home'));
      } else {
        Alert.alert('Erro', data.message || 'Falha ao fazer login');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao fazer login');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}
        behavior='padding'>

      <ImageBackground style={styles.logo}
          source={require('../assets/logo-500.png')}/>

      <Label value={'Bem-vindo!'}
              style={styles.wellcome}/>

      <TextInput
        placeholder="Usuário"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholderTextColor={'#888'}
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={'#888'}
        secureTextEntry={!showPass}
      />

      {
        password &&
        <TouchableHighlight 
          style={styles.passBtn}
          underlayColor={'transparent'}
          onPress={() => setShowPass(!showPass)}>

          <Label value={showPass === true ? 'Esconder a senha' : 'Mostrar a senha'}
              style={styles.passBtnLbl}/>

        </TouchableHighlight>
      }

      <TouchableHighlight 
          style={styles.button}
          underlayColor={'transparent'}
          onPress={handleLogin}>

        <Label value='Entrar' style={styles.btnLbl}/>

      </TouchableHighlight>

      <TouchableHighlight 
          style={styles.linkBtn}
          underlayColor={'transparent'}
          onPress={() => Linking.openURL('https://wallet.lucasrobertodev.com.br/register')}>

          <Label value={'Quero me cadastrar'}
              style={styles.passBtnLbl}/>

        </TouchableHighlight>
    </KeyboardAvoidingView>
  );
};

const window = Dimensions.get('window');

const styles = StyleSheet.create({
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
    marginBottom:window.width * 0.25,
  },
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
  passBtn:{
    width:window.width - 40,
    height:25,
    marginLeft:20,
    marginTop:5,
    backgroundColor:'transparent',
    alignItems:'center',
    justifyContent:'center',
  },
  passBtnLbl:{
    color:'#000',
    fontSize:16
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

export default LoginScreen;