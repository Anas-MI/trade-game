
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
import { StyleSheet ,View , ImageBackground , Dimensions} from 'react-native';
import { Container  ,Text ,Content , Body ,Spinner,Button} from 'native-base';
import SideBar from "../elements/Sidebar"
import HeaderPage from "../elements/HeaderPage";
import HTML from 'react-native-render-html';

export default class CourseSingle extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      membershipData:'',
      courseData:'',
      open:false,
      courseId:0,
      baseUrl:'',
      loder:true,
      youtubeStatus:false,
      };
      this.getSingleCourse = this.getSingleCourse.bind(this);
  }
  componentDidMount(){
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    this.setState({
        courseId:itemId
    })
    if(itemId){
      this.getSingleCourse(itemId)
    }
    
  }
  toggleOpen(){
    this.setState({
      open:!this.state.open
    })
  }

  getSingleCourse(id){
    course.getSingleCourses(id)
    .then(res=>{
       this.setState({
        courseData:res.singleCourse[0],
        baseUrl:res.baseurl,
        loder:false
       })
    })
    .catch(err=>{
      console.log("errrrrrrrrrrrr",err);
    })
  }

  render() {
    const {courseData , baseUrl ,  loder ,courseId }=this.state;
    const imageUrl = baseUrl+courseData.image;
    const fullWidth = Dimensions.get('window').width - 30
   return (  
   
    loder ? <Spinner color='blue' /> : 
    <Container >
      <HeaderPage pageTitle={courseData.title}  toggleOpen={()=>this.toggleOpen()} />
      {this.state.open && <SideBar navigation={this.props.navigation} style={StyleSheet.animatedBox}/> }
      <Content>
        <View>
        <ImageBackground source={{uri: imageUrl}} style={{width: '100%', height: 330  }}>
        </ImageBackground>
        </View>
        <View style={StyleSheet.detasilsSection}>
            <Body style={styles.detasilsSection} >
               <Text style={styles.heading}>{courseData.title} jkhfdsjk</Text>
               <Button block light style={styles.marginTB10} 
                onPress={() => this.props.navigation.navigate('VideoPage',{itemId: courseId,videoID:''})}>
                <Text >Play Video</Text>
              </Button>
               <HTML html={courseData.details} containerStyle={[{
                  width: fullWidth
                }]} imagesMaxWidth={fullWidth} /> 
            </Body>
            <Button block light style={styles.marginTB10} 
              onPress={() => this.props.navigation.navigate('LessionPage',{itemId: courseId})}>
              <Text >Start Lession</Text>
            </Button>
            <Button block light style={styles.marginTB10} 
              onPress={() => this.props.navigation.navigate('QuizPage',{itemId: courseId})}>
              <Text >Start Quiz</Text>
            </Button>
        </View>
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
    textAlign: 'left',
    width:"100%",
    fontSize:25,
    marginBottom:5,
   },
   detasilsSection:{
    margin:20
   }
  
});
