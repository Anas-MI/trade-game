
import React, { Component } from 'react';

import {  StyleSheet,  ImageBackground } from 'react-native';
import {
  Container, Title, Text
  ,  Button, Content, Body,
  Input, Item, Icon,   Form, Spinner
} from 'native-base';
import User from '../../controller/services/User';
const user = new User;

type Props = {};

export default class ForgotPassword extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      email_err: false,
      email_message: '',
      loder: false,
      otp:'',
      formChange:false,
      enterOtp:null,
      otpError:'',
      userId:null
    };
    this.onLoginClick = this.onLoginClick.bind(this);
    this.formValidation = this.formValidation.bind(this);
  }
  static navigationOptions = {
    header: null
  }
  formValidation(type, name, value, key, keyErr) {

    if (type === "required") {
      if (value.length > 1 && value !== '') {
        return true;
      } else {
        console.log("error section")
        const err = name + " is required";
        this.setState({ [key]: true, [keyErr]: err });
        return false;
      }
    }
    if (type === "email") {
      var re = /\S+@\S+\.\S+/;
      if (re.test(value)) {
        return true;
      } else {
        console.log("error section")
        const err = name + " is not valided";
        this.setState({ [key]: true, [keyErr]: err });
        return false;
      }
    }
   

  }
  
 

  onLoginClick() {
    
    if (
      this.formValidation('required', 'Email', this.state.email, 'email_err', 'email_message') &&
      this.formValidation('email', 'Email', this.state.email, 'email_err', 'email_message') 
    ) {
      this.setState({
        loder: true
      })
      const email = this.state.email;
      user.forgotPass(email)
        .then(res => {
          // console.log(res);
          if (res.status) {
            this.setState({
              loder: false,
              otp:res.otp,
              formChange:true,
              userId:res.userId
            })
            // alert(res.message);
            
       } else {
            this.setState({
              loder: false
            })
            // alert(res.message);
          }
        })



    }
  }

  onCheckOtp(){
    const {otp,enterOtp,userId} =this.state;
    console.log('iiiiiiiii',this.state);
    if(otp=== parseInt(enterOtp) ){
        this.props.navigation.navigate('SavePassword',{userId: userId})
    }else{
      alert("OTP Doesn't Match!")
    }
}


  responseFacebook = (response) => {
    console.log(response);
  }
  render() {
    const { formChange,enterOtp} = this.state;
    return (
      this.state.loder ? <Spinner color='blue' /> :
        <Container >
          <ImageBackground source={{ uri: "https://carz91.com/tradeGame/main.jpg" }} style={{ width: '100%', height: '100%' }}>
            <Content>

              <Title style={styles.title}>
                Relentless Trade
            </Title>
              <Text style={styles.text}>
               OTP has been sent to you. Please enter it to continue
            </Text>
              <Body style={styles.loginSection}>
                  {formChange ?
                   <Form >
                    <Item regular style={this.state.email_err ? styles.loginInputError : styles.loginInput} >
                        <Input placeholder='OTP'
                        onChangeText={(enterOtp) => this.setState({ enterOtp })}
                        value={enterOtp}
                        name="enterOtp" />
                        <Icon active name='md-person' />
                    </Item>
                    <Button block danger onPress={()=>this.onCheckOtp()} style={styles.marginTB10}>
                        <Text >Check OTP</Text>
                    </Button>
                  </Form>
                  :
                  <Form >
                    <Item regular style={this.state.email_err ? styles.loginInputError : styles.loginInput} >
                        <Input placeholder='Email'
                        onChangeText={(email) => this.setState({ email, email_err: false })}
                        value={this.state.email}
                        name="email" />
                        <Icon active name='md-person' />
                    </Item>
                    {this.state.email_err && <Text style={styles.errorMsg}>{this.state.email_message}</Text>}
                    
                    {this.state.password_err && <Text style={styles.errorMsg}>{this.state.password_message}</Text>}
                    <Item style={styles.link} onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.link}>Login</Text>
                    </Item>
                    <Button block danger onPress={this.onLoginClick} style={styles.marginTB10}>
                        <Text >Send Email</Text>
                    </Button>
                 </Form>
                
                }
               

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
    marginTop: 50,
    margin: 5
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#111111',
    margin: 25
  },
  loginSection: {
    margin: 30
  },
  loginInput: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#111111',
    backgroundColor: "#ffffff",
    width:"100%"
  },
  loginInputError: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 4,
    borderWidth: 10,
    borderColor: '#F10909',
    backgroundColor: "#ffffff"
  },
  link: {
    textAlign: 'right',
    width: "100%",
    flex: 1,

  },
  fullWidth: {
    width: "100%"
  },
  marginTB10: {
    marginTop: 10,
    marginBottom: 10
  },
  font5: {
    fontSize: 8
  },
  socailLogin: {
    flex: 1,
    flexDirection: "row",
    marginTop: 1
  },
  floatLeft: {
    width: "50%",
    flex: .5,
    alignItems: 'center',
    marginRight: 5
  },
  floatRight: {
    width: "50%",
    flex: .5,
    alignItems: 'center',
    marginLeft: 5
  },
  errorMsg: {
    color: '#F10909'
  }


});
