import React, {Component} from 'react';
import {StyleSheet } from 'react-native';
import { Container   ,Text ,Content,Body,} from 'native-base';
import MainHeader from "../elements/Header"

export default class About extends Component {
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
    
  }
  
  
 toggleOpen(){
   this.setState({
     open:!this.state.open
   })
 }

  render() {
    const {membershipData,courseData , loder}=this.state;
  return (  
   
    <Container >
       <MainHeader navigation={this.props.navigation}
            title="About"
            /> 
      {/* <HeaderPage pageTitle="Courses "  toggleOpen={()=>this.toggleOpen()} />
      {this.state.open && <SideBar navigation={this.props.navigation} style={StyleSheet.animatedBox}/> } */}
     
      <Content>
          <Body >
            <Text style={styles.heading}>What is Lorem Ipsum? </Text>
            <Text style={styles.text}> Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled 
                    it to make a type specimen book. It has survived not 
                    only five centuries,
                    typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled 
                    it to make a type specimen book. It has survived not 
                    only five centuries,
            </Text>
          </Body>
         
      
      </Content>
    </Container>
  
  
    )
  }
}

const styles = StyleSheet.create({
  text:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#8D8D8D',
    padding:20
   },
   heading:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width:"100%",
    fontSize:20,
    marginBottom:5,
    marginTop:20
   }
  
});
