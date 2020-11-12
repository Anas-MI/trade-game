
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet ,View , ImageBackground ,Image ,TouchableHighlight,Text,Animated,Easing} from 'react-native';
import {Drawer , Header, Left, Body, Right, Button, Icon, Title} from 'native-base';


import SideBar from "./Sidebar"

export default class HeaderPage extends Component {
  
  constructor(props) {
    super(props);
    this.animatedValue3 = new Animated.Value(0)
    this.state = {
      email: '',
      membershipData:'',
      courseData:'',
      open:false
      };
   }
componentDidMount(){
 
}

   toggleOpen = () => {
    //this.setState({ open: !this.state.open });
    this.props.toggleOpen();
   
  };
 
  render() {
 
   
  return (  
   
    
   <View>
       <Header>
        <Left>
          <Button onPress={() => this.toggleOpen()}  transparent  >
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.pageTitle}</Title>
        </Body>
        <Right/>
      </Header>
      <View>
      
      </View>
      
    
     
   </View>
 
 
     
    );
  }
}

const styles = StyleSheet.create({
    courseTitle:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#ffffff',
    marginTop:25,
    width:"100%",
    fontSize:18,
    fontFamily: "Fontisto",
   },
   card:{
    padding:5
   },
   courseTitledetails:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#ffffff',
    fontSize:12,
    padding:5,
    
   },
   body:{
    backgroundColor:'#1c1b1b47',
    width:"100%"
   },
   animatedBox: {
    flex: 1,
    backgroundColor: "#38C8EC",
    padding: 10
  },
  
});
