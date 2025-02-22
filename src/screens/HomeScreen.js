import React, { useState, useEffect, useContext } from 'react';
import { 
  View, 
  Text, 
  Button, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator,
  Alert,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { AuthContext, BaseURL } from '../components/AuthContext';
import { ListItem } from '../components/ListItem';
import HomeHeader from '../components/HomeHeader';

const MONTHS = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
const YearsB = Array.from(new Array(2), (_, index) => ((new Date().getFullYear() - (index+1)).toString()));
const YearsF = Array.from(new Array(3), (_, index) => ((new Date().getFullYear() + (index)).toString()));
const Years = [...YearsB, ...YearsF].sort();

const HomeScreen = ({navigation}) => {
  const { token, signOut } = useContext(AuthContext);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMonth(MONTHS[(new Date().getMonth())]);
    setYear((new Date().getFullYear()));
  }, []);

  useEffect(() => {
    loadItems();
  }, [month, year]);

  const loadItems = async () => {
    if(month && month != null && year && year != null){
      setIsLoading(true);

      const url = `${BaseURL}/item?month=${month}&year=${year}&dt=${(new Date().getMilliseconds())}`;

      try {
        const response = await fetch(url, {
          method:'GET',
          headers: {
            'Authorization': `${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setItems(data);
        } else {
          if(response && response.status === 401)
            handleSignOut();
          else
            Alert.alert('Erro', response?.data?.message || 'Falha ao carregar itens');
        }
      } catch (error) {
        console.error('Erro ao carregar itens:', error);
        // Trate o erro de acordo com a sua necessidade
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSignOut = () => {
    signOut(() => navigation.navigate('Login'));
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          ListHeaderComponent={
            <HomeHeader itens={items}/>
          } 
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={loadItems}
            />
          }
          data={items}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return <ListItem item={item}/>
          }}
          ListFooterComponent={
            <Button title="Sair" onPress={handleSignOut} />
          }
        />
      )}
    </View>
  );
};

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'#fafafa',
    height:window.height,
    width:window.width,
  },
});

export default HomeScreen;