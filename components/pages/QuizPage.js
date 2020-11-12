import React, {Component} from 'react';
import { Container   ,Text ,Content,Body,Button} from 'native-base';
import { StyleSheet ,View,Dimensions } from 'react-native';
import MainHeader from "../elements/Header"
import HTML from 'react-native-render-html';
import Quiz from '../../controller/services/quiz';
const quiz = new Quiz;
export default class QuizPage extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      all_quiz:[],
      courseData:'',
      open:false,
      loder:true,
      currentQuiz:0,
      result:false,
      resultMsg:'',
      finalLink:false,
      };  

  }
  componentDidMount(){
    const { navigation } = this.props;
    const courceId=navigation.getParam('itemId', 'NO-ID');
    console.log("idddd",courceId);
    this.setState({
        courseId:courceId
    })
    if(courceId){
        this.getQuizList(courceId)
      }
    }
  getQuizList(courceId){
    quiz.getQuizByCourse(courceId)
        .then(res=>{
          this.setState({
            all_quiz:res.all_quiz,
            loder:false
          })
        })
        .catch(err=>{
          console.log("errrrrrrrrrrrr",err);
        })
  }
 toggleOpen(){
   this.setState({
     open:!this.state.open
   })
 }
 selectAns(ansNo,currentQuiz,quiz){
    if(ansNo === quiz.currectAns){
         if(currentQuiz === this.state.all_quiz.length-1){
            this.setState({
                result:true,
                resultMsg:'Course is Completed .. !',
                finalLink:true
            })
                     
         }else{
            this.setState({
                currentQuiz:currentQuiz+1,
                result:true,
                resultMsg:'Correct Answer .. !',
              })
         }
         
          setTimeout(()=>{
              this.setState({
                result:false,
                resultMsg:''
              })
              if(this.state.finalLink){
                this.props.navigation.navigate('Dashboard')
              }
           },3000)
    }else{
        this.setState({
            result:true,
            resultMsg:'Invalid Answer .. !'
        })
        setTimeout(()=>{
            this.setState({
              result:false,
              resultMsg:''
            })
            if(this.state.finalLink){
              this.props.navigation.navigate('Dashboard')
            }
         },3000)
    }
 }

  render() {
    const {all_quiz,currentQuiz,result,resultMsg }=this.state;
    console.log({all_quiz});
    const fullWidth = Dimensions.get('window').width - 30
  return (  
   
    <Container >
      
      <MainHeader navigation={this.props.navigation}
            title="Quiz"
            /> 
     
      <Content>
         {all_quiz && all_quiz.length>0 && 
            <Body>
                <View style={styles.detasilsSection}>
                    <Text style={styles.heading}>{all_quiz[currentQuiz].title}</Text>
                    <HTML html={all_quiz[currentQuiz].details} containerStyle={[{
                    width: fullWidth,
                    size:14
                    }]} imagesMaxWidth={fullWidth} />  
                     <Button bordered success style={styles.margin20} onPress={()=>this.selectAns('A',currentQuiz,all_quiz[currentQuiz])}>
                       <Text style={styles.quaction}>{all_quiz[currentQuiz].ans1}</Text>
                    </Button>
                    <Button bordered info style={styles.margin20}  onPress={()=>this.selectAns('B',currentQuiz,all_quiz[currentQuiz])}>
                       <Text style={styles.quaction}>{all_quiz[currentQuiz].ans2}</Text>
                    </Button>
                    <Button bordered warning style={styles.margin20} onPress={()=>this.selectAns('C',currentQuiz,all_quiz[currentQuiz])}>
                       <Text style={styles.quaction}>{all_quiz[currentQuiz].ans3}</Text>
                    </Button>
                    <Button bordered dark style={styles.margin20} onPress={()=>this.selectAns('D',currentQuiz,all_quiz[currentQuiz])} >
                       <Text style={styles.quaction}>{all_quiz[currentQuiz].ans4}</Text>
                    </Button>
                </View>
                <View style={styles.ansSection}>
                   {result &&
                     <Text style={styles.heading}>
                        {resultMsg}
                     </Text>
                   }
                </View>
            </Body>
            
         }
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
     fontSize:20,
     marginTop:20,
     padding:10
   },
   detasilsSection:{
    padding:20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width:"100%"
   },
   margin20:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#8D8D8D',
    width:"100%",
    margin:15,
   },
   quaction:{
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize:14,
    width:"100%",
   },
  
  
});
