import React, {useState} from 'react';
import {Image, TextInput} from 'react-native';
import {View} from 'react-native';
import {Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native';
import {isConnected} from '../../Utils/Data';
import auth from '@react-native-firebase/auth';

export default function Login() {
  const [mail, setmail] = useState('');
  const [password, setpassword] = useState('');
  const [incorrectForm, setincorrectForm] = useState(false);
  const navigation = useNavigation();
  function signin() {
    // condition
    if (mail !== '' && password !== '') {
      auth()
        .signInWithEmailAndPassword(mail, password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            setincorrectForm;
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            setincorrectForm;
          }

          console.error(error);
        });
    } else {
      setincorrectForm(true);
    }
  }
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#040D27'}}>
      {/* <Image/> */}
      <View style={{alignItems: 'center', marginTop: 40}}>
        <Image
          style={{width: 300, height: 100}}
          source={require('../../../assets/badrlogo.png')}
        />
        <Text style={{fontWeight: 'bold', fontSize: 20, color: '#fff'}}>
          Banque Construction Algerie
        </Text>
      </View>

      <View style={{marginLeft: 20}}>
        <Text style={{fontSize: 40, fontWeight: 'bold', color: '#EBF0FF'}}>
          Se Connecter
        </Text>
        <View
          style={{
            width: '100%',
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Image
            style={{width: 25, height: 25}}
            source={require('../../../assets/mail.png')}
          />
          <TextInput
            style={{
              width: '80%',
              borderBottomWidth: 1,
              padding: 3,
              marginLeft: 10,
              color: '#EBF0FF',
              borderColor: '#EBF0FF',
            }}
            placeholder={'example@gmail.com'}
            placeholderTextColor={'#EBF0FF'}
            onChangeText={v => {
              setmail(v);
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Image
            style={{width: 25, height: 25}}
            source={require('../../../assets/pw.png')}
          />
          <TextInput
            style={{
              width: '80%',
              borderBottomWidth: 1.5,
              marginLeft: 10,
              color: '#EBF0FF',
              borderColor: '#EBF0FF',
            }}
            placeholder={'Password'}
            secureTextEntry={true}
            placeholderTextColor={'#EBF0FF'}
            onChangeText={v => {
              setpassword(v);
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            marginEnd: 50,
            marginTop: 5,
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#EBF0FF'}}>
            mot de passe oublié ?
          </Text>
        </View>
      </View>
      {incorrectForm ? (
        <View>
          <Text style={{fontSize: 20, color: 'red'}}>
            Formulaire incorrecte
          </Text>
        </View>
      ) : (
        <View />
      )}

      <View
        style={{
          alignItems: 'center',

          justifyContent: 'center',
          flexDirection: 'column',
          marginTop: 20,
        }}>
        <TouchableOpacity
          style={{
            width: 300,
            height: 40,
            backgroundColor: '#3066BE',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
          }}
          onPress={() => {
            signin();
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 17, color: 'white'}}>
            Se connecter
          </Text>
        </TouchableOpacity>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <View style={{width: '30%', height: 1, backgroundColor: '#EBF0FF'}} />
          <View>
            <Text
              style={{
                width: 50,
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#EBF0FF',
              }}>
              OU
            </Text>
          </View>
          <View style={{width: '30%', height: 1, backgroundColor: '#EBF0FF'}} />
        </View>

        <TouchableOpacity
          style={{
            width: 300,
            height: 40,
            backgroundColor: '#9DC08B',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            flexDirection: 'row',
            marginTop: 20,
          }}
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 17, color: 'white'}}>
            Créer un compte{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
