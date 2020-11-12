import axios from 'axios';
import {apiUrl} from '../../config';



export default class Course{
    constructor(){

    }
   courseWithMembership() {
     const encodeForm = (data) => {
            return Object.keys(data)
                .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                .join('&');
            }
          //console.log(encodeForm(formData));
          
          return  axios.get(apiUrl+"/getCourseWithMembership", {headers: {'Accept': 'application/json'}})
                .then(function (response) {
                    return response.data
                })
                .catch(function (error) {
                    console.log(error);
                   return false
            });
        
      }
      getSingleCourses(id) {
        const encodeForm = (data) => {
            return Object.keys(data)
                .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                .join('&');
            }
          //console.log(encodeForm(formData));
          return  axios.get(apiUrl+"/getSingleCourse/"+id, {headers: {'Accept': 'application/json'}})
                .then(function (response) {
                  //  console.log(response);
                    return response.data
                })
                .catch(function (error) {
                    console.log(error);
                   return false
            });
   
           
         }

    
  
}