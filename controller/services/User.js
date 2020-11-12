import axios from 'axios';
import {apiUrl} from '../../config';



export default class User{
    constructor(){

    }
   login(email,password) {
   
      let formData = {email: email, password: password};
      const encodeForm = (data) => {
            return Object.keys(data)
                .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                .join('&');
            }
          console.log(encodeForm(formData));
          return  axios.post(apiUrl+"/login", encodeForm(formData), {headers: {'Accept': 'application/json'}})
                .then(function (response) {
                   // console.log(response);
                    return response.data
                })
                .catch(function (error) {
                    console.log(error);
                   return false
            });

        
      }

      reg(email,password,username,mobile) {
   
        let formData = {email: email, password: password,name:username,mobile:mobile};
        const encodeForm = (data) => {
              return Object.keys(data)
                  .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                  .join('&');
              }
           
            return  axios.post(apiUrl+"/Registration", encodeForm(formData), {headers: {'Accept': 'application/json'}})
                  .then(function (response) {
                     // console.log("response",response);
                      return response.data
                  })
                  .catch(function (error) {
                     // console.log("errrrrrr",error);
                     return false
              });
  
          
        }
        forgotPass(email){
            let formData = {email: email};
            const encodeForm = (data) => {
                return Object.keys(data)
                    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                    .join('&');
                }
           
            return  axios.post(apiUrl+"/forgotPasswordSendEmail", encodeForm(formData), {headers: {'Accept': 'application/json'}})
                  .then(function (response) {
                      console.log("response",response);
                      return response.data
                  })
                  .catch(function (error) {
                     // console.log("errrrrrr",error);
                     return false
              });
        }
        updateNewPassword(userId,password){
            let formData = {id: userId , password:password};
            const encodeForm = (data) => {
                return Object.keys(data)
                    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                    .join('&');
                }
           
            return  axios.post(apiUrl+"/updatePassword", encodeForm(formData), {headers: {'Accept': 'application/json'}})
                  .then(function (response) {
                      //console.log("response",response);
                      return response.data
                  })
                  .catch(function (error) {
                     // console.log("errrrrrr",error);
                     return false
              });
        }
  
}