import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Signup() {
  const navigation = useNavigation();
  const [fullName, setfullName] = useState('azd');
  const [mail, setmail] = useState('fazf@gma.fr');
  const [password, setpassword] = useState('azdada');
  const [IncorrectForm, setIncorrectForm] = useState(false);

  function signup() {
    if (password.length >= 8) {
      navigation.navigate('FirstSign', {
        email: mail,
        password: password,
        fullName: fullName,
      });
    } else {
      setIncorrectForm(true);
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
          Signup
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
            source={require('../../../assets/profile2.png')}
          />
          <TextInput
            style={{
              width: '80%',
              borderBottomWidth: 1,
              marginLeft: 10,
              fontSize: 16,
              color: '#EBF0FF',
              borderColor: '#EBF0FF',
            }}
            placeholder={'Full Name'}
            placeholderTextColor={'#EBF0FF'}
            onChangeText={v => {
              setfullName(v);
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
            source={require('../../../assets/mail.png')}
          />
          <TextInput
            style={{
              width: '80%',
              borderBottomWidth: 1.5,
              marginLeft: 10,
              fontSize: 16,
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
              borderBottomWidth: 1,
              marginLeft: 10,
              fontSize: 16,
              color: '#EBF0FF',
              borderColor: '#EBF0FF',
            }}
            placeholder={'Password'}
            placeholderTextColor={'#EBF0FF'}
            secureTextEntry={true}
            onChangeText={v => {
              setpassword(v);
            }}
          />
        </View>
        <Text style={{fontSize: 13, color: '#EBF0FF'}}>
          By signing in you're agree to our Terms & Conditions and Privacy
          Policy
        </Text>
        {IncorrectForm ? (
          <View>
            <Text style={{fontSize: 20, color: 'red'}}>
              Formulaire incorrecte
            </Text>
          </View>
        ) : (
          <View />
        )}

        <View style={{alignItems: 'center'}}>
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
              // HNA TROH UNE AUTRE PAGE
              signup();
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 17, color: 'white'}}>
              Continue
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 17,
              marginTop: 15,
              color: '#EBF0FF',
            }}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            Joined us before? Login
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
