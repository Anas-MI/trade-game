import axios from 'axios';
import { apiUrl } from '../../config';
export default class Quiz {
    constructor() {

    }

    getQuizByCourse(id) {
        const encodeForm = (data) => {
            return Object.keys(data)
                .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                .join('&');
        }
        //console.log(encodeForm(formData));
        return axios.get(apiUrl + "/getQuizByCourse/" + id, { headers: { 'Accept': 'application/json' } })
            .then(function (response) {
                // console.log(response);
                return response.data
            })
            .catch(function (error) {
                console.log(error);
                return false
            });


    }
    getLessionByCourse(id) {
        const encodeForm = (data) => {
            return Object.keys(data)
                .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                .join('&');
        }
        //console.log(encodeForm(formData));
        return axios.get(apiUrl + "/getSingleCourseLession/" + id, { headers: { 'Accept': 'application/json' } })
            .then(function (response) {
                // console.log(response);
                return response.data
            })
            .catch(function (error) {
                console.log(error);
                return false
            });
    }


}