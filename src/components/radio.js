import { View, Text, ActivityIndicator, StyleSheet, SafeAreaView, Header, Image, Content, ScrollView, FlatList } from 'react-native'
import React, { Component } from 'react';
import { Alert, TouchableOpacity, Fragment } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Constants, Audio } from 'expo-av'
import { Grid, Col, Row, Button, Card, CardItem, Left, Right, Body, Icon } from 'native-base';
import MarqueeText from 'react-native-marquee';
import Modal from 'react-native-modal';





export default class Radio extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			playbackInstance: null,
			sound: null,
			volume: 1.0,
			isBuffering: true,
			musica: '',
			photoMusic: 'https://s08.maxcast.com.br/cover/0/not-found.png',
			player: null,
			isModalVisible: false, 
			
		}
	
	}


	state = { 
		refreshing: true, 
		results: []
	  };
	





	toggleModal = () => {

		



		this.setState({isModalVisible: !this.state.isModalVisible});

		

	  };



	  getData() {

		const url = 'http://app.radioredcup.com.br/API/programacaoApp/?User=redCup&Password=jJy3bXXdhwraAoWZneUKWwjdYNFBMd';
		fetch(url)
		  .then((response) => response.json())
		  .then((response) => {  
			
		   
			if(response.status == 1){
			  
			  this.setState({
				results: response.programacao,
				refreshing: false,
			  });
	
			  console.log(this.state.results)
			
			}else if(response.status == 0){
			  Alert.alert(response.messagem);
			}
		  }).catch(function(error) {
			Alert.alert('Sem conexão com a internet');
		  });
	}
  
	







	

	
	async componentWillUnmount() {
		clearInterval(this._interval);

		const { sound } = this.state
		await sound.stopAsync()


		this.setState({
			isPlaying: false
		})
	}


	async consultaMusica() {
		const request = await fetch('https://s04.maxcast.com.br/api/status/radioredcup/current.json');
		const data = await request.json()
		this.setState({ musica: data.playing.current })
		this.setState({ photoMusic: data.song_data.cover })
	}




	componentDidMount() {

		this.getData();
		Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
			playsInSilentModeIOS: true,
			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
			shouldDuckAndroid: true,
			staysActiveInBackground: true,
			playThroughEarpieceAndroid: false

		});

		this.consultaMusica();
		this._interval = setInterval(() => {
			this.consultaMusica()
		}, 5000);

	}

	onPlaybackStatusUpdate = status => {
		this.setState({
			isBuffering: status.isBuffering
		})
	}

	async playAudio() {
		const { volume } = this.state
		const status = {
			volume: volume
		}
		const source = {
			uri: "https://s04.maxcast.com.br:8128/live"
		}

		try {

			await Audio.setIsEnabledAsync(true);
			const sound = new Audio.Sound();
			sound.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
			await sound.loadAsync(source, status, false);
			this.setState({
				sound

			})
			this.setState({
				playbackInstance: false
			})

			await sound.playAsync();
		} catch (error) {
			console.error(error);
		}
	}

	async StopAudio() {
		const { sound } = this.state
		await sound.stopAsync()
	}




	onPlaybackStatusUpdate = status => {
		this.setState({
			isBuffering: status.isBuffering
		})
	}

	handlePlay = async () => {

		this.setState({
			playbackInstance: true
		})

		this.playAudio();

		this.setState({
			isPlaying: true
		})

	}

	handlePause = async () => {

		this.StopAudio();
		this.setState({
			isPlaying: false
		})
	}

	renderFileInfo() {
		
		const { playbackInstance, } = this.state

		const style = Platform.OS === 'ios' ?
			{ width: 200, height: 200, marginTop: 0 } :
			{
				width: 200,
				height: 200,
				position: 'absolute',
				left: '50%',
				marginLeft: -55
			};




		return playbackInstance ? (



			<View style={{ height: "94%", backgroundColor: "#000", marginLeft: 20, marginRight: 20, marginTop: 30, alignItems: "center", }}>
				
			<Image
               style={styles.logo}
              source={require('../../assets/img/Logo.png')}
              resizeMode="contain"
          />
		  	<Image
               style={styles.load}
              source={require('../../assets/img/load.gif')}
             
          />

		  <Text style={{ color:"#FFF"}}> Aguarde Carregando a Rádio</Text> 
				
				
			
			</View>
 
		) : <TouchableOpacity style={{ marginLeft: 20, marginRight: 20, marginTop: 30 }} >
				{this.state.isPlaying ? (
				<View style={{ height: "99%", backgroundColor: "#fff", alignItems: "center" }}>

				<Grid style={{ backgroundColor: "#000", width: "100%", alignItems: "center" }}  >
					<Row>
						<Image style={style}
							source={require('../../assets/img/disk_red.gif')}

						// source={{ uri: this.state.photoMusic }}
						/>

					</Row>
				</Grid>

				<Grid style={{ backgroundColor: "#000", width: "100%", alignItems: "center" }}  >


					<Row>
						<Image style={{ height: 80, width: 80, alignItems: "center", marginTop: 0 }}
							source={{ uri: this.state.photoMusic }}
						/>
					</Row>


					<Row style={{ marginTop: 30 }}>
						<Col size={10}><Ionicons name='ios-pause' size={50} color='#fff' style={{ marginLeft: 20 }} onPress={this.handlePause} /></Col>

						<Col size={30}>
							<Text style={{ color: "#FFF", fontSize: 16, marginLeft: 2 }}>Tocando agora:</Text>

							<MarqueeText
								style={{ fontSize: 15, color: "#FFF", marginLeft: 2 }}
								duration={3000}
								marqueeOnStart
								loop
								marqueeDelay={1000}
								marqueeResetDelay={1000}
							>


								{this.state.musica}
							</MarqueeText>
						</Col>
					</Row>
					<Col style={{width:"100%"}}>
					<Button   danger full onPress={this.toggleModal}>
							<Text style={{ color: "#FFF", fontSize: 18 }} >PROGRAMAÇÃO</Text>
						</Button>
					</Col>
				</Grid>
			</View>
				) : (
						<View style={{ height: "99%", backgroundColor: "#fff", alignItems: "center" }}>

							<Grid style={{ backgroundColor: "#000", width: "100%", alignItems: "center" }}  >
								<Row>
									<Image style={style}
										source={require('../../assets/img/disk_red.png')}

									// source={{ uri: this.state.photoMusic }}
									/>

								</Row>
							</Grid>

							<Grid style={{ backgroundColor: "#000", width: "100%", alignItems: "center" }}  >


								<Row>
									<Image style={{ height: 80, width: 80, alignItems: "center", marginTop: 0 }}
										source={{ uri: this.state.photoMusic }}
									/>
								</Row>


								<Row style={{ marginTop: 30 }}>
									<Col size={10}><Ionicons name='ios-play-circle' size={50} color='#fff' style={{ marginLeft: 20 }} onPress={this.handlePlay} /></Col>

									<Col size={30}>
										<Text style={{ color: "#FFF", fontSize: 16, marginLeft: 2 }}>Tocando agora:</Text>

										<MarqueeText
											style={{ fontSize: 15, color: "#FFF", marginLeft: 2 }}
											duration={3000}
											marqueeOnStart
											loop
											marqueeDelay={1000}
											marqueeResetDelay={1000}
										>
  

											{this.state.musica}
										</MarqueeText>
									</Col>
								</Row>
								<Col style={{width:"100%"}}>
									<Button   danger full onPress={this.toggleModal}>
										<Text style={{ color: "#FFF", fontSize: 18 }} >PROGRAMAÇÃO</Text>
									</Button>

									{/* <Text style={{ color: "#FFF", fontSize: 18, marginLeft: 2 }}>:</Text> */}

								</Col>
							</Grid>
						</View>
					)}
			</TouchableOpacity>

	}

	render() {

		return (

			<View >




		



				{this.renderFileInfo()}




				<Modal isVisible={this.state.isModalVisible} style={{ height: 400}}>
			<View style={{backgroundColor:"#a00f01",  height: "80%", width: "100%" }}> 

		

			<CardItem  style={{ backgroundColor: "#000", alignItems: "center"}}>
			<Left> 
			<Body >
		
			<Text style={{ color: "#FFF", fontSize: 16}} > PROGRAMAÇÃO</Text>
		
			</Body>
			</Left> 

			<Right> 
			
			<Button  bordered light full  title="Hide modal" onPress={this.toggleModal}>
			<Text style={{ color: "#FFF", fontSize: 15}}>Fechar</Text>
			</Button>
		
		
			</Right> 




		</CardItem>
			
				
<ScrollView> 



<FlatList
          data={this.state.results}
          keyExtractor={item => item.programacao}
          renderItem={({ item }) => {
            return (
              <View>
                 <Card style={{ marginLeft:30, marginRight:30, marginTop: 10}}>
            <CardItem>
            
                <Body>
                  <Text style={{fontSize: 18, color: "#a00f01"}}>{item.title_programacao}</Text>
                  <Text>{item.periodo}</Text>
                </Body>
             
            </CardItem>
            <CardItem cardBody>
               <Image source={{uri: item.url}}  style={{height: 230,  width: null, flex: 1}}/>
            </CardItem>
            <CardItem>    
                         
              <Body>  
			  <Text>{item.conteudo_programcao}</Text> 
              </Body>
            
            </CardItem>
          </Card>
              </View>
            );
          }}
        />
        
</ScrollView> 
		
            
           
			</View>
        </Modal>
			</View>


		);
	}
}




const styles = StyleSheet.create({


	control: {
		marginLeft: 20,
	},
	controls: {
		flexDirection: 'row'
	}, 
	logo: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 300,
	},
	
	load: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
		height: 90,
		marginTop: -50
    },
})