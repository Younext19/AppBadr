import React, {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function FirstSign({route, navigation}) {
  const [Phone, setPhone] = useState('pon');
  const [CardNum, setCardNum] = useState('num');
  const [ExpDate, setExpDate] = useState('azd');
  const [CVV, setCVV] = useState('dzdz');
  const {email, password, fullName} = route.params;
  useEffect(() => {
    console.log(route.params);
    console.log(email);
  });
  function signupDone() {
    console.log({
      name: fullName,
      mail: email,
      pw: password,
      cardNumber: CardNum,
      expDate: ExpDate,
      cvv: CVV,
    });
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('User account created & signed in!');
        firestore()
          .collection('Users')
          .doc(res.user.uid)
          .set({
            name: fullName,
            mail: email,
            cardNumber: CardNum,
            expDate: ExpDate,
            cvv: CVV,
          })
          .then(() => {
            console.log('User added!');
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#040D27',
        padding: 40,
      }}>
      <View
        style={{
          width: '100%',
          height: 40,
          flexDirection: 'column',
          marginTop: 20,
          color: '#EBF0FF',
        }}>
        <Text
          style={{
            marginLeft: 10,
            fontSize: 20,
            color: '#000',
            fontWeight: 'bold',
            color: '#EBF0FF',
          }}>
          Numéro de téléphone
        </Text>
        <TextInput
          style={{
            width: '80%',
            borderBottomWidth: 1,
            padding: 3,
            marginLeft: 10,
            color: '#EBF0FF',
            borderColor: '#EBF0FF',
          }}
          placeholder={'+213 555555555'}
          placeholderTextColor={'#EBF0FF'}
          onChangeText={v => {
            setPhone(v);
          }}
        />
      </View>
      <View
        style={{
          width: '100%',
          height: 40,
          flexDirection: 'column',
          marginTop: 50,
        }}>
        <Text
          style={{
            marginLeft: 10,
            fontSize: 20,
            color: '#000',
            fontWeight: 'bold',
            color: '#EBF0FF',
          }}>
          Numéro de carte
        </Text>
        <TextInput
          style={{
            width: '80%',
            borderBottomWidth: 1,
            padding: 3,
            marginLeft: 10,
            color: '#EBF0FF',
            borderColor: '#EBF0FF',
          }}
          placeholderTextColor={'#EBF0FF'}
          placeholder={'5050 5050 5050 XXXX'}
          onChangeText={v => {
            setCardNum(v);
          }}
        />
      </View>
      <View
        style={{
          width: '30%',
          height: 40,
          flexDirection: 'column',
          marginTop: 50,
        }}>
        <Text
          style={{
            marginLeft: 10,
            fontSize: 20,
            fontWeight: 'bold',
            color: '#EBF0FF',
          }}>
          Exp Date
        </Text>
        <TextInput
          style={{
            width: '80%',
            borderBottomWidth: 1,
            padding: 3,
            marginLeft: 10,
            color: '#EBF0FF',
            borderColor: '#EBF0FF',
          }}
          placeholderTextColor={'#EBF0FF'}
          placeholder={'01/24'}
          onChangeText={v => {
            setExpDate(v);
          }}
        />
      </View>
      <View
        style={{
          width: '30%',
          height: 40,
          flexDirection: 'column',
          marginTop: 50,
        }}>
        <Text
          style={{
            marginLeft: 10,
            fontSize: 20,
            fontWeight: 'bold',
            color: '#EBF0FF',
          }}>
          CVV
        </Text>
        <TextInput
          style={{
            width: '80%',
            borderBottomWidth: 1,
            padding: 3,
            marginLeft: 10,
            color: '#EBF0FF',
            borderColor: '#EBF0FF',
          }}
          placeholder={'XXX'}
          placeholderTextColor={'#EBF0FF'}
          onChangeText={v => {
            setCVV(v);
          }}
        />
      </View>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          style={{
            width: 300,
            height: 60,
            backgroundColor: '#9DC08B',
            marginTop: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}
          onPress={() => {
            signupDone();
          }}>
          <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold'}}>
            Enregistrer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
