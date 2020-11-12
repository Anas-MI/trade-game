
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Course from '../../controller/services/course';
const course = new Course;
import {Platform, StyleSheet } from 'react-native';
import { Container   ,Text ,Content,Body,Spinner,
  CardItem,Card} from 'native-base';
import SideBar from "../elements/Sidebar"
import CourseList from "../elements/courseList";
import HeaderPage from "../elements/HeaderPage";
import Swiper from 'react-native-swiper-animated';               
export default class TestPage extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      membershipData:'',
      courseData:'',
      open:false,
      loder:true
      };
      this.getCourseWithMembership=this.getCourseWithMembership.bind(this);
  }
  componentDidMount(){
     this.getCourseWithMembership();
  }
  
 toggleOpen(){
   this.setState({
     open:!this.state.open
   })
 }
  getCourseWithMembership(){
    
    course.courseWithMembership()
        .then(res=>{
          console.log("responseeeeeeeee",res);
          this.setState({
            membershipData:res.all_Membership,
            courseData:res.courses,
            loder:false
          })
        })
        .catch(err=>{
          console.log("errrrrrrrrrrrr",err);
        })
  }
  render() {
    const {membershipData,courseData , loder}=this.state;
  return (  
    loder ? <Spinner color='blue' /> : 
    <Container >
      
      <HeaderPage pageTitle="Courses "  toggleOpen={()=>this.toggleOpen()} />
      {this.state.open && <SideBar navigation={this.props.navigation} style={StyleSheet.animatedBox}/> }
     
      <Content>
        
        {membershipData && membershipData.length>0 ?
        membershipData.map((member,index)=>
            <Card key={index}>
               <CourseList  courseArray={courseData[index]} navigationList={this.props.navigation} key={index} />
            </Card> 
        )
        
        : 
        <Card>
            <CardItem>
              <Body>
                <Text >Sorry , No Course .</Text>
              </Body>
            </CardItem>
          </Card>
        }
      </Content>
    </Container>                
   );
  }
}

const styles = StyleSheet.create({
  text:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#8D8D8D',
    margin:10
   },
   heading:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width:"100%",
    fontSize:20,
    marginBottom:5,
    
   }
  
});
   