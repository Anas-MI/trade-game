import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  ImageBackground
} from 'react-native';
import {Button,Content,Body
    } from 'native-base';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';

 
export default class Game2 extends Component {
    static navigationOptions = {
        header: null
      }
    constructor(props) {
        super(props);
        this.state = {
          start: '',
          end:'',
          middle:false,
          next:false
          };
       }
  onStrokeStart(x,y){
      this.setState({
        start:y
    })
  }
 onStrokeChanged(x,y){
     if(y > 310 && y < 325){
      this.setState({
        middle:true
     })
     }
     this.setState({
        end:y
     })
     console.log("byeeeeee in function",x +"hello"+ y );
 }
 onStrokeEnd(){
   
     const {start , end , middle} =this.state;
     if(start >= 175 && start <=200 && end>=150 && end<=200 && middle ){
          alert("Woooo ! Your Answer is Correct .");
          this.setState({
            next:true
          })
     }else{
      alert("Ooh ! Your Answer is Wrong .");
     }
    // alert(" Soryy We are working on this section line details : Starting From" + this.state.start +" Ending to "+ this.state.end);
     
 }
  render() {
   
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
        <ImageBackground source={{uri: "http://goldenfuturelife.in/tradeGame/assets/uploads/users/2019-05-17.jpg"}} style={{width: '100%', height: "100%" , marginTop:5 }}>
          <RNSketchCanvas
            containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
            canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
            defaultStrokeIndex={0}
            defaultStrokeWidth={5}
            clearComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Clear</Text></View>}
           
           
            strokeWidthComponent={(w) => {
              return (<View style={styles.strokeWidthButton}>
                <View  style={{
                  backgroundColor: 'white', marginHorizontal: 2.5,
                  width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                }} />
              </View>
            )}}
            
            savePreference={() => {
              return {
                folder: 'RNSketchCanvas',
                filename: String(Math.ceil(Math.random() * 100000000)),
                transparent: false,
                imageType: 'png'
              }
            }}
            onStrokeChanged={(x,y)=>{
                this.onStrokeChanged(x,y)
            }}
            onStrokeStart={(x,y)=>{
                this.onStrokeStart(x,y)
            }}
            onStrokeEnd={(x)=>{
                this.onStrokeEnd(x)
            }}
            getPaths={(x)=>{
                this.onStrokeChanged(x)
            }}
          />
          {this.state.next && 
            <View>
               <View style={StyleSheet.detasilsSection}>
                <Body style={styles.detasilsSection} >
                  <Text style={styles.heading}>Congratulations Your Course completed.</Text>
                </Body>
              </View>
              <Button block light style={styles.marginTB10} onPress={() => this.props.navigation.navigate('Dashboard')}>
                <Text >Next Course</Text>
              </Button>
            </View>
          }
          </ImageBackground>
        </View>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF',
  },
  strokeColorButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
  },
  heading:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    width:"100%",
    fontSize:25,
    marginBottom:5,
   },
  strokeWidthButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#39579A'
  },
  functionButton: {
    marginHorizontal: 2.5, marginVertical: 8, height: 30, width: 60,
    backgroundColor: '#39579A', justifyContent: 'center', alignItems: 'center', borderRadius: 5,
  }
});
 
AppRegistry.registerComponent('example', () => example);