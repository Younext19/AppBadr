import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Profile() {
  const navigation = useNavigation();
  const users = auth().currentUser;
  const [FullName, setFullName] = useState('');
  useEffect(() => {
    getData();
  });

  function getData() {
    const userDocument = firestore()
      .collection('Users')
      .doc(users.uid)
      .get()
      .then(res => {
        if (res) {
          const userData = res.data();
          setFullName(userData.name);
        } else {
          console.log('ée');
        }
      });
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#040D27',
      }}>
      <Image
        style={{width: 150, height: 150}}
        source={require('../../../assets/profile2.png')}
      />
      <Text style={{fontSize: 26, fontWeight: 'bold', color: '#EBF0FF'}}>
        {FullName}
      </Text>
      <TouchableOpacity
        style={{
          width: 300,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
          borderRadius: 8,
          backgroundColor: '#9DC08B',
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
          Carte
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 300,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
          borderRadius: 8,
          backgroundColor: '#9DC08B',
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
          Offre{' '}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 300,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
          borderRadius: 8,
          backgroundColor: '#9DC08B',
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
          Paramètre{' '}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 300,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
          borderRadius: 8,
          backgroundColor: '#DF6765',
        }}
        onPress={() => {
          auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
          Disconnect
        </Text>
      </TouchableOpacity>
    </View>
  );
}
