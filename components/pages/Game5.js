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

 
export default class Game5 extends Component {
    static navigationOptions = {
        header: null
      }
    constructor(props) {
        super(props);
        this.state = {
          start: '',
          end:'',
          nextGame:false,
          middle:false,
          };
       }
       onStrokeStart(x,y){
        
           this.setState({
               start:y
           })
        
    }
    onStrokeChanged(x,y){
        if(y > 270 && y < 280){
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
        console.log("starting point -" , start);
        console.log("Ending point -" , end);
        console.log("Middle point -" , middle);
        if(start >= 170 && start <=200 && end>=320 && end<=350 && middle){
             alert("Woooo ! Your Answer is Correct .");
             this.setState({
                nextGame:true
             });
        }else{
          alert("Ooh ! Your Answer is Wrong .");
        }
       // alert(" Soryy We are working on this section line details : Starting From" + this.state.start +" Ending to "+ this.state.end);
        
    }
    render(){
   
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
        <ImageBackground source={{uri: "http://goldenfuturelife.in/tradeGame/assets/uploads/users/2019-06-01_(4).png"}} style={{width: '100%', height: "100%" , marginTop:5 }}>
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
          {this.state.nextGame &&
             <Button block light style={styles.marginTB10} onPress={() => this.props.navigation.navigate('Game2')}>
                <Text>Next Stap</Text>
            </Button>
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