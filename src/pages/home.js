import React, { Component } from 'react';
import { StyleSheet, TextInput, View, SafeAreaView, Image, ScrollView,} from 'react-native'
import {Header, Button, Icon, Text, Content,Footer, FooterTab, Card, CardItem, Body  } from 'native-base';
import Radio from '../components/radio';


export default class Home extends Component {
  static navigationOptions = { headerShown: false }

 
  constructor(props) {
    super(props);
    // AsyncStorage.getItem('cpfGrdirect', (err, result) => {
    // if(result == null){
    //   this.props.navigation.navigate('Login')
    // }  
    // });
  }


 


  render() {

    const _handlePressButtonAsync = async () => {
      let result = await WebBrowser.openBrowserAsync('https://www.ilikeweb.com.br');
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
              style={{ height: 80, width: 80, marginTop: -25 }}
              source={require('../../assets/img/Logo.png')}
              resizeMode="contain"
          />
        
          </View>
        </Header>
   
      
     
        <Radio></Radio> 

        
       
          <Content />
        
      
        <Footer>
          <FooterTab>
            <Button active  vertical onPress={() => this.props.navigation.navigate('Home')}>
              <Icon  active style={{fontSize:20}} active type="FontAwesome"  name="music" />
              <Text style={{fontSize:9}}>Rádio</Text>
            </Button>
            
            <Button  vertical onPress={() => this.props.navigation.navigate('Destaques')}>
              <Icon   style={{fontSize:20}} type="FontAwesome" name="star" />
              <Text style={{fontSize:9}}>Destaque</Text>
            </Button>

            <Button vertical onPress={() => this.props.navigation.navigate('MenuGr')}>
              <Icon  style={{fontSize:20}} type="FontAwesome" name="usd" />
              <Text style={{fontSize:9}}>Conheça</Text>
            </Button>

            <Button  vertical onPress={() => this.props.navigation.navigate('Logout')}>
              <Icon  style={{fontSize:20}} type="FontAwesome" name="power-off" />
              <Text style={{fontSize:9}}>Sair</Text>
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