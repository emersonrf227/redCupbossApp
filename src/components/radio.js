import { View, Text, ActivityIndicator, StyleSheet, SafeAreaView, Header, Image, Content } from 'react-native'
import React, { Component } from 'react';
import { Alert, TouchableOpacity, Fragment } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Constants, Audio } from 'expo-av'
import { Grid, Col,Row } from 'native-base';
import MarqueeText from 'react-native-marquee';



export default class Radio extends Component {

	static navigationOptions = { headerShown: false }
	constructor(props) {
		super(props);
		this.state = {
			playbackInstance: null,
			sound: null,
			volume: 1.0,
			isBuffering: true,
			musica: '',
			photoMusic: 'https://s08.maxcast.com.br/cover/0/not-found.png',
			player: null
		}
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
		{ width: 200, height: 200,  marginTop:0 } :
		{ 
		  width: 200, 
		  height: 200, 
		  position: 'absolute', 
		  left: '50%', 
		  marginLeft: -55
	  }; 




		return playbackInstance ? (

			

			<View style={{ height: "98%", backgroundColor: "#000" }}>
				<Grid style={{ backgroundColor: "#000" }} >
					<Col size={9}>
						<Text style={{ color: "#FFF" }}>Aguarde carregando rádio. </Text>
					</Col>
				</Grid>
			</View>

		) : <TouchableOpacity style={{ marginLeft: 20, marginRight: 20, marginTop: 30 }} >
				{this.state.isPlaying ? (
				<View style={{ height: "98%", backgroundColor: "#fff", alignItems:"center" }}>
			<Grid style={{ backgroundColor: "#000", width: "100%", alignItems:"center"}}  >
					<Row>
					<Image style={style}
					source={require('../../assets/img/disk_red.gif')}
	
						// source={{ uri: this.state.photoMusic }}
					/>
				
					</Row>
					</Grid>

				<Grid style={{ backgroundColor: "#000", width: "100%", alignItems:"center"}}  >
			

				<Row>
				<Image style={{ height: 80, width: 80, alignItems:"center", marginTop:10  }}
					source={{ uri: this.state.photoMusic }}
				/>
				</Row>

			
				<Row>
				<Col size={10}><Ionicons name='ios-pause' size={100} color='#fff' style={{marginLeft:10}} onPress={this.handlePause} /></Col>

				<Col size={20}>
								<Text style={{ color: "#FFF", fontSize: 18, marginLeft: 2 }}>Tocando agora:</Text>

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

				</Grid>









			</View>
				) : (
					<View style={{ height: "98%", backgroundColor: "#fff", alignItems:"center" }}>
				
					<Grid style={{ backgroundColor: "#000", width: "100%", alignItems:"center"}}  >
					<Row>
					<Image style={style}
					source={require('../../assets/img/disk_red.png')}
	
						// source={{ uri: this.state.photoMusic }}
					/>
				
					</Row>
					</Grid>
	
					<Grid style={{ backgroundColor: "#000", width: "100%", alignItems:"center"}}  >
				
	
					<Row>
					<Image style={{ height: 80, width: 80, alignItems:"center", marginTop:10  }}
						source={{ uri: this.state.photoMusic }}
					/>
					</Row>

				
					<Row>
					<Col size={10}><Ionicons name='ios-play-circle' size={100} color='#fff' style={{marginLeft:10}}  onPress={this.handlePlay} /></Col>

					<Col size={20}>
									<Text style={{ color: "#FFF", fontSize: 18, marginLeft: 2 }}>Tocando agora:</Text>

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
	
					</Grid>
	
	
	
	
	
	
	
	
	
				</View>
					)}
			</TouchableOpacity>
















	}




	render() {





		return (

			<View >
				{this.renderFileInfo()}
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
	}
})