
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet  ,ImageBackground,Image  } from 'react-native';
import { Header, Content, Card, CardItem, Text,  Body,  } from 'native-base';
import {baseUrl} from '../../config';

export default class CourseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      membershipData:'',
      courseData:''
      };
   }
  componentDidMount(){
   }


  render() {
      
  const {courseArray}=this.props;
 
   return (  
    <Content>
       {courseArray && courseArray.length>0 ?
          courseArray.map((course,index)=>
          <Card style={styles.card}>
            
            <CardItem cardBody onPress={() => this.props.navigation.navigate('LessionPage',{itemId: course.id , itemName : course.title})}  >
            <ImageBackground source={{uri: 'https://www.carz91.com/tradeGame/assets/uploads/users/1137084142477949_bV6mZ02CuHKsDrIRW8Pe_height640.png'}} style={{width: '100%', height: 200}}>
            <Text style={styles.courseDoneMsg} onPress={() => this.props.navigation.navigate('LessionPage',{itemId: course.id , itemName : course.title})} >{course.title}</Text>
            </ImageBackground>
            </CardItem>
          
          </Card>
          )
          : 
          <Card>
              <CardItem>
                <Body>
                  <Text>No data in this section</Text>
                </Body>
              </CardItem>
            </Card>
          }
        </Content>
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
    width:"100%",
    fontSize:18
   },
   card:{
    padding:5,
    marginBottom:20

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
   courseDoneMsg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    backgroundColor:"#cccccc47",
    fontSize: 30,
    paddingTop:70
}
  
});
