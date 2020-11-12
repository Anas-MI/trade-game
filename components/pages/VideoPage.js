import React, { Component } from 'react';
import { Container, Text, Content, Button, Spinner } from 'native-base';
import { StyleSheet, View, Dimensions, Image, ScrollView } from 'react-native';
import MainHeader from "../elements/Header"
import HTML from 'react-native-render-html';
import Quiz from '../../controller/services/quiz';
import { baseUrl } from '../../config';
// import Video from 'react-native-video';
// import Video from 'react-native-af-video-player'
import Video from 'react-native-video';
//Import React Native Video to play video
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';

const quiz = new Quiz;

export default class VideoPage extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            all_lession: [],
            open: false,
            loder: true,
            currentLession: 0,
            quizStart: false,
            courseId: 0,
            courseName: '',
            videoUrl: baseUrl+props.navigation.getParam('videoID', 'NO-ID'),
            currentTime: 0,
            duration: 0,
            isFullScreen: false,
            isLoading: true,
            paused: false,
            playerState: PLAYER_STATES.PLAYING,
            screenType: 'content',
        };

    }
    componentDidMount() {
        const { navigation } = this.props;
        const courceId = navigation.getParam('itemId', 'NO-ID');
        const itemName = navigation.getParam('itemName', 'NO-ID');
        const videoUrl = navigation.getParam('videoID', 'NO-ID');
        this.setState({
            courseId: courceId,
            courseName: itemName,
         })
        if (courceId) {
            this.getLessionList(courceId)
        }
      
    }
    getLessionList(courceId) {
        quiz.getLessionByCourse(courceId)
            .then(res => {
                const courseList = res.singleCourseLession;
                courseList.push({ GoToQuiz: true });
                this.setState({
                    all_lession: courseList,
                    loder: false
                })
            })
            .catch(err => {
                console.log("errrrrrrrrrrrr", err);
            })
    }
    onSeek = seek => {
    //Handler for change in seekbar
    this.videoPlayer.seek(seek);
  };
  onPaused = playerState => {
    //Handler for Video Pause
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };
 
  onReplay = () => {
    //Handler for Replay
    this.setState({ playerState: PLAYER_STATES.PLAYING });
    this.videoPlayer.seek(0);
  };
 
  onProgress = data => {
    const { isLoading, playerState } = this.state;
    // Video Player will continue progress even if the video already ended
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({ currentTime: data.currentTime });
    }
  };
  
  onLoad = data => this.setState({ duration: data.duration, isLoading: false });
  
  onLoadStart = data => this.setState({ isLoading: true });
  
  onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });
  
  onError = () => alert('Oh! ', error);
  
  exitFullScreen = () => {
    alert('Exit full screen');
  };
  
  enterFullScreen = () => {};
  
  onFullScreen = () => {
    if (this.state.screenType == 'content')
      this.setState({ screenType: 'cover' });
    else this.setState({ screenType: 'content' });
  };
    renderToolbar = () => (
    <View>
      <Text> toolbar </Text>
    </View>
  );
  onSeeking = currentTime => this.setState({ currentTime });
    toggleOpen() {
        this.setState({
            open: !this.state.open
        })
    }
    nextLession(type) {
        const { all_lession, currentLession } = this.state;
        if (type === 'right') {
            console.log('total length is ', all_lession.length + '==' + currentLession);
            //all_lession.length >= currentLession-1
            if (currentLession < 2) {
                this.setState({
                    currentLession: currentLession + 1
                })
            } else {
                this.setState({
                    quizStart: true
                })
            }
        } else {
            this.setState({
                currentLession: currentLession - 1
            })
        }
    }
    onBuffer = e => {
        console.log({ e })
    }
    render() {
        const { all_lession, courseId, quizStart, loder, courseName, videoUrl } = this.state;
        const fullWidth = Dimensions.get('window').width - 20;
        const fullWidths = Dimensions.get('window').width;
         const videoFile = 'https://relentless.doitsindia.com/assets/uploads/video/SampleVideo_1280x720_1mb_(1).mp4';// require("../../image/video.webm");
       // const videoFile = "https://player.vimeo.com/video/131506613/config?autopause=1&autoplay=1&byline=0&collections=1&context=Vimeo%5CController%5CClipController.main&default_to_hd=1&outro=nothing&portrait=0&share=1&title=0&watch_trailer=0&s=bfacda4afc046cf7c416f445234c62d2c30e0a2d_1570557100";

        
        
        const staticVideo =  videoUrl;
        console.log('video url', staticVideo);
        return (
            loder ? <Spinner color='blue' /> :
    
                       <View style={styles.container}>
        <Video
          onEnd={this.onEnd}
          onLoad={this.onLoad}
          onLoadStart={this.onLoadStart}
          onProgress={this.onProgress}
          paused={this.state.paused}
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          resizeMode={this.state.screenType}
          onFullScreen={this.state.isFullScreen}
          source={{ uri: staticVideo }}
          style={styles.mediaPlayer}
          volume={10}
        />
        <MediaControls
          duration={this.state.duration}
          isLoading={this.state.isLoading}
          mainColor="#333"
          onFullScreen={this.onFullScreen}
          onPaused={this.onPaused}
          onReplay={this.onReplay}
          onSeek={this.onSeek}
          onSeeking={this.onSeeking}
          playerState={this.state.playerState}
          progress={this.state.currentTime}
          toolbar={this.renderToolbar()}
        />
      </View>
                      


        )
    }
}
const theme = {
    title: '#FFF',
    more: '#446984',
    center: '#7B8F99',
    fullscreen: '#446984',
    volume: '#A5957B',
    scrubberThumb: '#234458',
    scrubberBar: '#DBD5C7',
    seconds: '#DBD5C7',
    duration: '#DBD5C7',
    progress: '#446984',
    loading: '#DBD5C7'
}

const styles = StyleSheet.create({
    text: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#8D8D8D',
        padding: 20
    },

    heading: {
        fontSize: 30,
        marginTop: 20,
        padding: 0
    },
    courseDoneMsg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#8D8D8D',
        padding: 20,
        fontSize: 20,
        marginTop: 100
    },
    detasilsSection: {
        padding: 0,
        flex: 1,
        width: "100%",

    },
    margin20: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#8D8D8D',
        width: "90%",
        margin: 15,
    },
    quaction: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 14,
        width: "100%",
    },

    backgroundVideo: {
    },
    containr: {
        backgroundColor: "#000000"
    },
    container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },

});
