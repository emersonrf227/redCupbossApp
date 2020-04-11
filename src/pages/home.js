import React, { Component } from 'react';
import { StyleSheet, TextInput, View, SafeAreaView, Image, ScrollView, } from 'react-native'
import { Container, Header, Button, Icon, Text, Content, Footer, FooterTab, Card, CardItem, Body } from 'native-base';
import Radio from '../components/radio';
import * as WebBrowser from 'expo-web-browser';


export default class Home extends React.Component {
  static navigationOptions = { headerShown: false }


  constructor(props) {
    super(props);

  }


  render() {

    const _handlePressButtonAsync = async () => {
      let result = await WebBrowser.openBrowserAsync('https://radioredcup.com.br');
      setResult(result);
    };

    

    return (
      <SafeAreaView style={styles.safeview}>
        <Header style={{ backgroundColor: '#000' }} transparent >
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            color: '#FFF'
          }}>

            <Image
              style={{ height: 75, width: 75, marginTop: -10 }}
              source={require('../../assets/img/Logo.png')}
              resizeMode="contain"
            />

          </View>
        </Header>


        <Container style={styles.container}>
          <Radio></Radio>
        </Container>




   

     

        <Footer >
          <FooterTab style={{backgroundColor:"#CCC"}}>
            <Button active vertical onPress={() => this.props.navigation.navigate('Home')}>
              <Icon active style={{ fontSize: 20,  }} active type="FontAwesome" name="music" />
              <Text style={{ fontSize: 11, }}>Rádio</Text>
            </Button>

            <Button vertical onPress={() => this.props.navigation.navigate('Destaques')}>
              <Icon style={{ fontSize: 20, }} type="FontAwesome" name="star" />
              <Text style={{ fontSize: 11,  }}>Destaques</Text>
            </Button>

            <Button vertical onPress={_handlePressButtonAsync}>
            <Image
              style={{ height: 30, width: 30}}
              source={require('../../assets/img/logoP.png')}
              resizeMode="contain"
            />
            <Text style={{ fontSize: 11,   }}>Red Cup</Text> 
            </Button>
          </FooterTab>
        </Footer>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
    backgroundColor: '#a00f01',
    justifyContent: "center",
  },

  container: {
    flex: 1,
    backgroundColor: '#a00f01',

  },

  container2: {
    marginTop: 10,
    backgroundColor: '#e66a22',
    textAlign: "center",
    alignItems: "center",
    color: "#FFF",
    justifyContent: "center",
  },

  form: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginTop: 50
  },

  btLogin: {
    borderRadius: 15,
    marginTop: 50,
    backgroundColor: "#02c19e",
    fontSize: 45,
  },
})