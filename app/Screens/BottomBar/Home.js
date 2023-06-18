import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {vanData} from '../../Utils/Data';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

export default function Home() {
  const [NewVanData, setNewVanData] = useState([]);
  const [cardNum, setcardNum] = useState('');
  const [money, setmoney] = useState('');
  const users = auth().currentUser;
  useEffect(() => {
    refreshVirs();
  }, []);
  const navigation = useNavigation();

  function refreshVirs() {
    var docRefWithFiltringbyType = firestore()
      .collection('Virement')
      .where('owner', '==', users.uid);

    setNewVanData([]);
    docRefWithFiltringbyType
      .get()
      .then(docRef => {
        var list = [];
        docRef.forEach(elm => {
          list.push(elm.data());
        });
        setNewVanData(list);
      })
      .catch(error => {
        console.log({error});
      });

    firestore()
      .collection('Users')
      .doc(users.uid)
      .get()
      .then(res => {
        if (res) {
          const userData = res.data();
          setcardNum(userData.cardNumber);
          if (NewVanData.length !== 0) {
            setmoney(userData.money - NewVanData[0].valeur);
          } else {
            setmoney(userData.money);
          }
          console.log(
            '🚀 ~ file: Home.js:54 ~ refreshVirs ~ NewVanData:',
            NewVanData,
          );
        } else {
          console.log('ée');
        }
      });
  }

  const VanItem = ({item}) => (
    <View>
      <Text style={{color: '#EBF0FF', marginTop: 10, fontWeight: 'bold'}}>
        Date
      </Text>
      <View
        style={{
          width: 350,
          height: 70,
          marginTop: 10,
          borderRadius: 8,
          backgroundColor: '#4B5678',
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 5,
          }}>
          {item.Name ? (
            <Text style={{fontSize: 17, color: '#EBF0FF'}}>{item.Name}</Text>
          ) : (
            <Text style={{fontSize: 17, color: '#EBF0FF'}}>{item.to}</Text>
          )}
          <Text style={{fontSize: 17, color: '#EBF0FF'}}>{item.motif}</Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 5,
          }}>
          <Text style={{fontSize: 17, color: '#EBF0FF'}}>
            {item.valeur} DZD
          </Text>
          <Text style={{fontSize: 17, color: '#EBF0FF'}}>Sent</Text>
        </View>
      </View>
    </View>
  );
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#040D27',
      }}>
      <View style={{alignItems: 'center', marginTop: 30}}>
        <Text
          style={{
            padding: 10,
            borderRadius: 8,
            fontSize: 16,
            backgroundColor: '#848484',
            color: 'white',
            fontWeight: 'bold',
          }}>
          {cardNum}{' '}
        </Text>
        <Text
          style={{
            marginTop: 20,
            fontSize: 25,
            color: '#EBF0FF',
            fontWeight: 'bold',
          }}>
          {money} DZD
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          refreshVirs();
          console.log(NewVanData);
        }}
        style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
        <Text style={{color: 'white', fontSize: 20}}>Transactions</Text>
        <Image
          style={{width: 20, height: 20, marginLeft: 10}}
          source={require('../../../assets/refresh.png')}
        />
      </TouchableOpacity>
      <View
        style={{
          borderBottomColor: '#EBF0FF',
          borderWidth: 1,
          width: 300,
        }}
      />
      {NewVanData.length == 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            style={{width: 250, height: 250}}
            source={require('../../../assets/nocard.png')}
          />

          <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
            Vous n'avez pas de Transactions
          </Text>
        </View>
      ) : (
        <FlatList
          data={NewVanData}
          renderItem={({item}) => {
            return <VanItem item={item} />;
          }}
          keyExtractor={vanitem => vanitem.motif}
          scrollEnabled={true}
          ListFooterComponent={<View style={{height: 20}} />}
        />
      )}
    </View>
  );
}
