import React, { useState, useEffect, useContext } from 'react';
import { 
  View, 
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
import FloatingButton from '../components/FloatingButton';
import Button from '../components/Button';

const MONTHS = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
const YearsB = Array.from(new Array(2), (_, index) => ((new Date().getFullYear() - (index+1)).toString()));
const YearsF = Array.from(new Array(3), (_, index) => ((new Date().getFullYear() + (index)).toString()));
const Years = [...YearsB, ...YearsF].sort();

const HomeScreen = ({navigation}) => {
  const { token, signOut } = useContext(AuthContext);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMonth(MONTHS[(new Date().getMonth())]);
    setYear((new Date().getFullYear()));
  }, []);

  useEffect(() => {
    loadItems();
  }, [month, year, navigation]);

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
          setFiltered(data);
        } else {
          if(response && response.status === 401)
            handleSignOut();
          else
            Alert.alert('Erro', data?.message || 'Falha ao carregar itens');
        }
      } catch (error) {
        console.error('Erro ao carregar itens:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFilter = (text, unpaid) => {
    if(items && items.length > 0 && text && text.length > 0){
      let itemsFiltered = [];

      if(unpaid === true){
        items.map(i => {
          if(!i.paid || i.paid === false){
            if(i.desc.includes(text) || i.desc.toLowerCase().includes(text))
              itemsFiltered.push(i);
          }
        });
      } else {
        items.map(i => {
          if(i.desc.includes(text) || i.desc.toLowerCase().includes(text))
            itemsFiltered.push(i);
        });
      }

      setFiltered(itemsFiltered);
    } else {
      if(unpaid === true){
        let itemsUnpaid = [];
      
        items.map(i => {
          if(!i.paid || i.paid === false)
            itemsUnpaid.push(i);
        });

        setFiltered(itemsUnpaid);
      } else {
        setFiltered(items);
      }
    }
  }

  const handleDateFilter = (month, year) => {

    if(month !== null)
      setMonth(month);

    if(year !== null)
      setYear(year);
  }

  const handleSignOut = () => {
    signOut(() => navigation.navigate('Login'));
  }

  const handleMarkItem = async (item) => {
    try{
      let body = {
        id:item._id,
        month:month,
        year:year
      };

      let url = `${BaseURL}${item.paid === true ? `/item/unpay` : `/item/pay`}`;

      const response = await fetch(url, {
        method:'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (!response.ok) {
        if(response && response.status === 401)
          handleSignOut();
        else
          Alert.alert('Ops!', data?.message || 'Falha ao marcar ou desmarcar itens');
      }

    } catch (error) {
      console.error('Erro ao marcar ou desmarcar item:', error);
    }
  };

  const handleDelItem = async (item) => {
    try{
      let url = `${BaseURL}/item?id=${item._id}&month=${month}&year=${year}`;

      const response = await fetch(url, {
        method:'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if(response && response.status === 401)
          handleSignOut();
        else
          Alert.alert('Erro', data?.message || 'Falha ao tentar excluir item');
      } else {
        loadItems();
      }
    } catch(error) {
      console.error('Erro ao excluir item:', error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          keyboardShouldPersistTaps='always'
          keyboardDismissMode='on-drag'
          ListHeaderComponent={
            <HomeHeader itens={items}
              selectedMonth={month}
              selectedYear={year}
              onFilter={handleFilter}
              onDateFilter={handleDateFilter}
            />
          } 
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={loadItems}
            />
          }
          data={filtered}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <ListItem item={item} 
                onCheck={handleMarkItem} 
                onDel={handleDelItem}
              />
            );
          }}
          ListFooterComponent={
            <View style={styles.foot}>
              <Button label="Sair" 
                onPress={handleSignOut} />
            </View>
          }
        />
      )}

      <FloatingButton label='Lançar novo gasto' 
        onPress={() => navigation.navigate('Add')}/>
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
  foot:{
    paddingVertical:20,
    marginBottom:100
  },
});

export default HomeScreen;