
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
  Input, Item ,Icon, Left, Right , Spinner} from 'native-base';
  import User from '../../controller/services/User';
  const user = new User;

type Props = {}; 

export default class Registration extends Component<Props> {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      email_err:false,
      email_message:'',
      username: '',
      username_err:false,
      username_message:'',
      mobile: '',
      mobile_err:false,
      mobile_message:'',
      password:'',
      password_err:false,
      password_message:'',
      conpassword:'',
      conpassword_err:false,
      conpassword_message:'',
      loder:false,
      passwordStatus:true,
      passwordconStatus:true
    };
    this.onRegClick = this.onRegClick.bind(this);
    this.formValidation = this.formValidation.bind(this);
  }
  static navigationOptions = {
    header: null
  }
  formValidation(type,name,value,key,keyErr,match=''){
    
    if(type==="required"){
      if(value.length>1 && value !==''){
        return true;
      }else{
        console.log("error section")
        const err= name + " is required";
        this.setState( { [key] : true , [keyErr]:err } );
        return false;
      }
    }
    if(type==="email"){
      var re = /\S+@\S+\.\S+/;
      if(re.test(value)){
        return true;
      }else{
        console.log("error section")
        const err= name + " is not valid";
        this.setState( { [key] : true , [keyErr]:err } );
        return false;
      }
    }
    if(type==="mobile"){
      var phoneno = /^\d{10}$/;
      if((value.match(phoneno))){
        return true;
      }else{
        console.log("error section")
        const err= name + " number is not valided";
        this.setState( { [key] : true , [keyErr]:err } );
        return false;
      }
    }
    if(type==="password"){
      if(value.length>4 && value !==''){
        return true;
      }else{
        console.log("error section")
        const err= name + " should be grater then 4 character";
        this.setState( { [key] : true , [keyErr]:err } );
        return false;
      }
    }
    if(type==="match"){
      if(value===match){
        return true;
      }else{
        console.log("error section")
        const err= "Password And Confirm password don't match .";
        this.setState( { [key] : true , [keyErr]:err } );
        return false;
      }
    }
    
  }
  onRegClick(){
    if(
      this.formValidation('required','Full Name',this.state.username,'username_err','username_message') &&
      this.formValidation('required','Email',this.state.email,'email_err','email_message') &&
      this.formValidation('email','Email',this.state.email,'email_err','email_message')&&
      this.formValidation('required','Mobile',this.state.mobile,'mobile_err','mobile_message') &&
      this.formValidation('mobile','Mobile',this.state.mobile,'mobile_err','mobile_message') &&
      this.formValidation('required','Password',this.state.password,'password_err','password_message')&&
      this.formValidation('password','Password',this.state.password,'password_err','password_message')&&
      this.formValidation('required','Confirm Password',this.state.conpassword,'conpassword_err','conpassword_message')&&
      this.formValidation('match','Confirm Password',this.state.conpassword,'conpassword_err','conpassword_message', this.state.password)
      ){
        this.setState({
          loder:true
        })
        const email=this.state.email;
        const username=this.state.username;
        const mobile=this.state.mobile;
        const password=this.state.password;
        user.reg(email,password,username,mobile)
        .then(res=>{
          this.setState({
            loder:false
          })
          alert(res.message);
          if(res.status){
            this.props.navigation.navigate('Login')
            }else{
           
          }
        })
      }
     
  }
  render() {
    const {passwordStatus,passwordconStatus} = this.state
    return (  
      this.state.loder ? <Spinner color='blue' /> :
       <Container >
         <ImageBackground source={{uri: "https://carz91.com/tradeGame/main.jpg"}} style={{width: '100%', height: '100%'}}> 
         <Content>
         
            <Title style={styles.title}>
              Relentless Trade 
            </Title>
            <Text style={styles.text}>
                Lorem Ipsum is simply dummy 
                text of the printing and typesetting
                industry.
            </Text>
           <Body style={styles.loginSection}>
                  <Item regular style={this.state.username_err ? styles.loginInputError :styles.loginInput}>
                    <Input placeholder='Full Name'
                     onChangeText={(username) => this.setState({username,username_err:false})}
                     value={this.state.username}
                     name="username"
                      />
                    <Icon name='md-person' />
                  </Item>
                  {this.state.username_err && <Text style={styles.errorMsg}>{this.state.username_message}</Text> }
                  <Item regular style={this.state.email_err ? styles.loginInputError :styles.loginInput}>
                    <Input placeholder='Email'
                    onChangeText={(email) => this.setState({email,email_err:false})}
                    value={this.state.email}
                    name="email"
                     />
                    <Icon  name='md-mail' />
                  </Item>
                  {this.state.email_err && <Text style={styles.errorMsg}>{this.state.email_message}</Text> }
                  <Item regular style={this.state.mobile_err ? styles.loginInputError :styles.loginInput}>
                    <Input placeholder='Mobile Number'
                    onChangeText={(mobile) => this.setState({mobile,mobile_err:false})}
                    value={this.state.mobile}
                    name="mobile"
                     />
                    <Icon  name='md-call' />
                  </Item>
                  {this.state.mobile_err && <Text style={styles.errorMsg}>{this.state.mobile_message}</Text> }
                  <Item regular style={this.state.password_err ? styles.loginInputError :styles.loginInput}>
                    <Input placeholder='Password'
                     onChangeText={(password) => this.setState({password,password_err:false})}
                     value={this.state.password}
                     name="password"
                     secureTextEntry={passwordStatus}
                      />
                      <Icon  name={passwordStatus ? 'md-eye':'md-eye-off'} onPress={()=>{this.setState({passwordStatus:!passwordStatus})}} />
                   
                  </Item>
                  {this.state.password_err && <Text style={styles.errorMsg}>{this.state.password_message}</Text> }
                  <Item regular style={this.state.conpassword_err ? styles.loginInputError :styles.loginInput}>
                    <Input placeholder='Confirm Password'
                    onChangeText={(conpassword) => this.setState({conpassword,conpassword_err:false})}
                    value={this.state.conpassword}
                    name="confirmPassword"
                    secureTextEntry={passwordconStatus}
                     />
                     <Icon  name={passwordconStatus ? 'md-eye':'md-eye-off'} onPress={()=>{this.setState({passwordconStatus:!passwordconStatus})}} />
                  </Item>
                  {this.state.conpassword_err && <Text style={styles.errorMsg}>{this.state.conpassword_message}</Text> }
                  <Button block danger onPress={this.onRegClick} style={styles.marginTB10}>
                      <Text>Signup</Text>
                  </Button>
                  <Button block light style={styles.marginTB10} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text >Login</Text>
                  </Button>

            </Body>
             
            
         
        </Content>
        </ImageBackground>
      </Container>
      
    );
  }
}

const styles = StyleSheet.create({
  
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#111111',
    fontSize: 25,
    marginTop: 30,
    margin:5
   },
   text:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#111111',
    margin:10
   },
   loginSection:{
     margin:15
   },
   loginInput:{
    marginTop:10,
    marginBottom:10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#111111',
    backgroundColor:"#ffffff"
  },
  loginInputError:{
   marginTop:10,
   marginBottom:10,
   borderRadius: 4,
   borderWidth: 10,
   borderColor: '#F10909',
   backgroundColor:"#ffffff"
  },
   link:{
     textAlign:'right',
     width:"100%",
     flex: 1,
   },
   fullWidth:{
     width:"100%"
   },
   marginTB10:{
     marginTop:10,
     marginBottom:10
   },
   font5:{
     fontSize:10
   },
   socailLogin:{
     flex:1,
     flexDirection:"row",
     marginTop:10
    },
   floatLeft:{
     width:"50%",
     flex:.5,
     alignItems: 'center',
     marginRight:5
   },
   floatRight:{
    width:"50%",
     flex:.5,
    alignItems: 'center',
    marginLeft:5
   },
   errorMsg:{
    color:'#F10909',
    textAlign:"left"
  }
 
});
