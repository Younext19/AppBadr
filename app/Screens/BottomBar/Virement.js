import React, {useState} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Virement() {
  let user = auth().currentUser;
  const uid = user.uid;
  var docRef = firestore().collection('Users').doc(uid);
  function SaveOfferToFS(data) {
    const userRefrence = firestore().collection('Virement').doc();
    userRefrence
      .set({
        Name: NomPrenom,
        motif: Motif,
        valeur: Valeur,
        owner: uid,
        type: 'envoyé',
      })
      .then(res => {
        console.log('offer added!');
      });
  }
  const [NomPrenom, setNomPrenom] = useState('');
  const [Motif, setMotif] = useState('');
  const [Valeur, setValeur] = useState('');

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#040D27',
        padding: 20,
      }}>
      <View>
        <Text style={{fontSize: 16, color: '#EBF0FF', marginTop: 8}}>
          Nom & Prénom
        </Text>
        <TextInput
          placeholder="John Doe"
          placeholderTextColor={'#EBF0FF'}
          style={{
            width: 300,
            height: 50,
            borderWidth: 1,
            marginTop: 5,
            padding: 8,
            borderRadius: 8,
            color: '#EBF0FF',
            borderColor: '#EBF0FF',
          }}
          onChangeText={v => {
            setNomPrenom(v);
          }}
        />
        <Text style={{fontSize: 16, color: '#EBF0FF', marginTop: 8}}>
          Motif
        </Text>
        <TextInput
          placeholderTextColor={'#EBF0FF'}
          placeholder="Prêt"
          style={{
            width: 300,
            height: 50,
            borderWidth: 1,
            marginTop: 5,
            padding: 8,
            borderRadius: 8,
            color: '#EBF0FF',
            borderColor: '#EBF0FF',
          }}
          onChangeText={v => {
            setMotif(v);
          }}
        />
        <Text style={{fontSize: 16, color: '#EBF0FF', marginTop: 8}}>
          Valeur
        </Text>
        <TextInput
          placeholderTextColor={'#EBF0FF'}
          placeholder="3000"
          style={{
            width: 300,
            height: 50,
            borderWidth: 1,
            marginTop: 5,
            padding: 8,
            borderRadius: 8,
            color: '#EBF0FF',
            borderColor: '#EBF0FF',
          }}
          onChangeText={v => {
            setValeur(v);
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
        }}>
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
            // navigation.navigate('BottomNavigation', {screen: 'Home'});
            SaveOfferToFS();
          }}>
          <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold'}}>
            Faire un virement
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
