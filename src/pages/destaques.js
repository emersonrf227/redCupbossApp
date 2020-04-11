import React, { Component } from 'react';
import { FlatList, StyleSheet, TextInput, View, SafeAreaView, Image, ScrollView, RefreshControl, Linking } from 'react-native'
import { Header, Button, Icon, Text, Content, Footer, FooterTab, CardItem, Card, Left, Body, Right } from 'native-base';
import * as WebBrowser from 'expo-web-browser';
export default class Destaques extends Component {
  static navigationOptions = { headerShown: false }


  constructor(props) {
    super(props);
    this.getData();


  }

  state = {
    refreshing: true,
    results: []
  };


  getData() {

    const url = 'http://app.radioredcup.com.br/API/destaquesApp/?User=redCup&Password=jJy3bXXdhwraAoWZneUKWwjdYNFBMd';
    fetch(url)
      .then((response) => response.json())
      .then((response) => {


        if (response.status == 1) {

          this.setState({
            results: response.destaques,
            refreshing: false,
          });

          console.log(this.state.results)

        } else if (response.status == 0) {
          Alert.alert(response.messagem);
        }
      }).catch(function (error) {
        Alert.alert('Sem conexão com a internet');
      });
  }

  ilike = (index) => {
    let dados = this.state.results;

    console.log(dados[index].ilike)

    let artista = dados[index].id_destaque


    fetch('http://app.radioredcup.com.br/API/ilikeApp/?User=redCup&Password=jJy3bXXdhwraAoWZneUKWwjdYNFBMd&Id=' + artista)
      .then((response) => response.json())
      .then((data) => {

        let ilike = parseInt(this.state.like) + 1;
        this.setState({
          like: ilike,
        });
      });

    dados[index].ilike = parseInt(dados[index].ilike) + 1;
    console.log(dados)
    this.setState({ results: dados });




  }






  //http://app.radioredcup.com.br/API/destaquesApp/?User=redCup&Password=jJy3bXXdhwraAoWZneUKWwjdYNFBMd


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
              style={{ height: 80, width: 80, marginTop: -25 }}
              source={require('../../assets/img/Logo.png')}
              resizeMode="contain"
            />

          </View>
        </Header>

        <CardItem style={{ backgroundColor:"#a00f01",  alignItems:"center"}}>
            <Body>
              <Text style={{color:"#FFF", fontSize: 20}}> DESTAQUES</Text>
            </Body>
        </CardItem>

        <ScrollView>

          <FlatList
            data={this.state.results}
            keyExtractor={item => item.id_destaque}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <Card style={{ marginLeft: 30, marginRight: 30, marginTop: 10 }}>
                    <CardItem>
                      <Left>
                        <Body>
                          <Text>{item.title_destaque}</Text>
                          <Text>{item.musica_destaque}</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem cardBody>
                      <Image source={{ uri: item.url }} style={{ height: 150, width: null, flex: 1 }} />
                    </CardItem>
                    <CardItem>
                      <Left>
                        <Button transparent onPress={() => this.ilike(index)}>
                          <Icon active name="thumbs-up" />
                          <Text>{item.ilike}</Text>
                        </Button>
                      </Left>
                      <Body>

                      </Body>
                      <Right>

                        <Icon onPress={() => Linking.openURL(item.url_canal)} active style={{ color: "#FF0000" }} type="FontAwesome" name="youtube" />

                      </Right>
                    </CardItem>
                  </Card>







                  {/* // <Text>  {item.musica_destaque}</Text> */}
                </View>
              );
            }}
          />

        </ScrollView>
        <Content />



        <Footer >
          <FooterTab style={{ backgroundColor: "#CCC" }}>
            <Button vertical onPress={() => this.props.navigation.navigate('Home')}>
              <Icon style={{ fontSize: 20, }} active type="FontAwesome" name="music" />
              <Text style={{ fontSize: 11, }}>Rádio</Text>
            </Button>

            <Button active vertical onPress={() => this.props.navigation.navigate('Destaques')}>
              <Icon active style={{ fontSize: 20, }} type="FontAwesome" name="star" />
              <Text style={{ fontSize: 11, }}>Destaques</Text>
            </Button>

            <Button vertical onPress={_handlePressButtonAsync}>
              <Image
                style={{ height: 30, width: 30 }}
                source={require('../../assets/img/logoP.png')}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 11, }}>Red Cup</Text>
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

