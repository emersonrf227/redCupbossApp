import { View, Text, ActivityIndicator, StyleSheet, SafeAreaView, Header, Image, Content } from 'react-native'
import React, { Component } from 'react';
import { TouchableOpacity, Fragment} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Audio } from 'expo-av'
import { Grid, Col, } from 'native-base';

export default class Radio extends Component {
	static navigationOptions = { headerShown: false }
	constructor(props) {
		super(props);
		this.state = {
			isPlaying: false,
			playbackInstance: null,
			volume: 1.0,
			isBuffering: true,
			musica: '',
			photoMusic: 'https://s08.maxcast.com.br/cover/0/not-found.png',
			player: null
		}






	}

	async componentWillUnmount() {
		clearInterval(this._interval);
		const { playbackInstance } = this.state
		await playbackInstance.stopAsync()
		

		this.setState({
			isPlaying: false
		})
	}


	async consultaMusica() {
		const request = await fetch('https://s08.maxcast.com.br/api/status/redcup-grmusic/current.json');
		const data = await request.json()
		this.setState({ musica: data.playing.current })
		this.setState({ photoMusic: data.song_data.cover })

		console.log(data.song_data.cover);
	}


	async componentDidMount() {

		this.consultaMusica();
		this._interval  = setInterval(() => {
			this.consultaMusica()
		}, 5000);





		try {
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: false,
				interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
				playsInSilentModeIOS: true,
				interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
				shouldDuckAndroid: true,
				staysActiveInBackground: true,
				playThroughEarpieceAndroid: false
			})

			this.loadAudio()
		} catch (e) {
			console.log(e)
		}
	}

	loadAudio() {
		const { volume } = this.state
		const playbackInstance = new Audio.Sound()
		const source = {
			uri: "https://s08.maxcast.com.br:8016/live?id=1572558656328"
		}

		const status = {
			volume: volume
		}

		playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
		playbackInstance.loadAsync(source, status, false)
		var timer = setInterval(() => {
		this.setState({
			playbackInstance
		})
	}, 5000)



	}

	onPlaybackStatusUpdate = status => {
		this.setState({
			isBuffering: status.isBuffering
		})
	}

	handlePlay = async () => {
		const { playbackInstance } = this.state
		
		
		await playbackInstance.playAsync();
		this.setState({
			isPlaying: true
		})

	}

	handlePause = async () => {
	
		const { playbackInstance } = this.state
		await playbackInstance.pauseAsync()
		this.setState({
			isPlaying: false
		})
	}

	renderFileInfo() {
		const { playbackInstance, } = this.state
		return playbackInstance ? (
			<TouchableOpacity style={styles.control} >
				{this.state.isPlaying ? (
					<View style={{ height: 70 }}>
						<Grid >
							<Col size={1} style={{ height: 70 }}><Ionicons name='ios-pause' size={50} color='#fff' onPress={this.handlePause} /></Col>
							<Col size={5}><Text style={{ color: "#FFF", fontSize: 20 }}>Rádio Gr News</Text>
								<Text style={{ color: "#FFF" }}>Tocando agora: {this.state.musica} </Text>
							</Col>
							<Col size={2}>
								<Image style={{ height: 70, width: 70,}}
								source={{ uri: this.state.photoMusic }}
								/>
								</Col>
						</Grid>
					</View>
				) : (
						<View style={{ height: 70 }}>
							<Grid >
								<Col size={1} style={{ height: 70 }}><Ionicons name='ios-play-circle' size={50} color='#fff' onPress={this.handlePlay} /></Col>
								<Col size={5}><Text style={{ color: "#FFF", fontSize: 20 }}>Rádio Gr News</Text>
									<Text style={{ color: "#FFF" }}>Tocando agora: {this.state.musica} </Text>
								
								</Col>
								<Col size={2}>
								<Image style={{ height: 70, width: 70,}}
								source={{ uri: this.state.photoMusic }}
								/>
								</Col>
							</Grid>
						</View>
					)}
			</TouchableOpacity>
		) : 
		<View style={{ height: 70 }}>
		<Grid >
			<Col size={9}>
				<Text style={{ color: "#FFF" }}>Carregando Rádio. </Text>
			</Col>
		</Grid>
	</View>
	}




	render() {





		return (

			<View>
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