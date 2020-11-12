/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import {Platform, StyleSheet ,View , ImageBackground } from 'react-native';
import { Container  ,Title ,Text 
  ,Subtitle,Button,Content,Body,
  Input, Item ,Icon, Left, Right} from 'native-base';
import { AccessToken, } from 'react-native-fbsdk';  

import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin } from 'react-native-google-signin';

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state ={ isLoggedIn: false };
  }

  componentDidMount() {    
    GoogleSignin.configure({
      webClientId: '126075386294-03ghe713crv0v0j7ljkl5fpp03cg87c8.apps.googleusercontent.com', 
    });
    AsyncStorage.getItem('user').then(res => {
      
      const user  = JSON.parse(res)
      if(user.id){
        this.props.navigation.navigate('Dashboard')
      }else{
        // this.props.navigation.navigate('Login')
        this.checkFbUser()
      }
    })
    .catch(err => {
      console.log({err})
      this.checkFbUser()
      // this.props.navigation.navigate('Login')
    })
  }
  static navigationOptions = {
    header: null
  }
  checkFbUser = () => {
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        console.log({
          data
        })
        if(data.accessToken){
          this.props.navigation.navigate('Dashboard')
        }else{
          this.props.navigation.navigate('Login')
        }
        console.log(data.accessToken.toString())
      }
    ).catch(err => {
      console.log({err})
      this.props.navigation.navigate('Login')
    })
  }
  render() {
  
    return (  
       <Container style={styles.backGround} >
         {/* <ImageBackground source={{uri: "http://goldenfuturelife.in/tradeGame/main.jpg"}} style={{width: '100%', height: '100%',opacity: 0.6}}>  */}
         <Content>
        
            <Title style={styles.title}>
              Welcome
            </Title>
            <Text style={styles.text}>
                Relentless Trade
            </Text>
            <Text style={styles.smalltext}>
                Trading
            </Text>
            {/* <Button transparent success ><Text onPress={() => this.props.navigation.navigate('Dashboard')}> Go to Details </Text></Button> */}
            
        </Content>
        {/* </ImageBackground> */}
      </Container>
      
    );
  }
}

const styles = StyleSheet.create({
    backGround:{
      backgroundColor:"#F5F5F5"
    },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#8D8D8D',
    fontSize: 35,
    marginTop: 150,
    },
   text:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#8D8D8D',
    margin:15,
    fontSize:25
   },
   smalltext:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#8D8D8D',
    fontSize:14
   },
  
 
});
