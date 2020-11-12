import React, {Component} from 'react';
import {StyleSheet } from 'react-native';
import { Container   ,Text ,Content,Body,Button, Card, CardItem, Icon} from 'native-base';
import { List, ListItem, } from 'native-base';
import MainHeader from "../elements/Header"
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'        

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

   componentDidMount(){
    const value =  AsyncStorage.getItem('user').then(res => {
      
        const user  = JSON.parse(res)
        this.setState({user})
        // let url = `https://relentless.doitsindia.com/api/get_all_transactions/?user_id=${this.state.user.id}&symbol=&transaction_type=buy`    
       let url = `https://relentless.doitsindia.com/api/get_all_random_transactions/?user_id=${this.state.user.id}&symbol=&transaction_type=buy`
        console.log({url})
        // processThis()

     
            let data =  Axios.get(url).then(data1 => {
                console.log({data1})
                let data = data1.data.records
                console.log({data})
        //         let groups = Object.create(null);
        //     let result;
        
        // data.forEach(function (a) {
        //     groups[a.currency_symbol] = groups[a.currency_symbol] || [];
        //     groups[a.currency_symbol].push(a);    
        // });
        
        // result = Object.keys(groups).map(function (k) {
        //     var temp = {};
        //     temp[k] = groups[k];
        //     return temp;
        // });
        ////

        var holder = {};

        data.forEach(function(d) {
          if (holder.hasOwnProperty(d.currency_symbol)) {
            holder[d.currency_symbol] = holder[d.currency_symbol] + parseInt(d.remaining_unit);
          } else {
            holder[d.currency_symbol] = parseInt(d.remaining_unit);
          }
        });
        
        var obj2 = [];
        
        for (var prop in holder) {
          obj2.push({ name: prop, value: holder[prop] });
        }

        console.log({obj2})
        this.setState({obj2})
//         const res = [...data.reduce(
//             (a, b) => a.set(b.currency_symbol, Object.assign((a.get(b.currency_symbol) || {remaining_unit: null, current_close_price: null, currency_symbol: null}), b)),
//             new Map
//         ).values()];
        
// console.log({res})


//   let arr = data1.data.results
//   let   result1 = [];
// console.log({"decdec": data})
//   data.forEach(function (a) {
//     if (!this[a.currency_symbol]) {
//         this[a.currency_symbol] = { currency_symbol: a.currency_symbol, contributions: 0 };
//         result1.push(this[a.name]);
//     }
//     this[a.currency_symbol].current_close_price += a.current_close_price;
// }, Object.create(null));

// console.log({result1})

//         this.setState({result1})
        // this.state.result.map(el => {
        //     console.log({el})
        // })
        let cards = this.state.obj2.map(share => (
            <CardItem style={{flexDirection:"row"}}>
                <Text style={{flex:1}}>{share.name}</Text>
        {/* <Text style={{flex:1}}>{"       "}</Text> */}
                <Text style={{flex:1}}>Quantity: {share.value}</Text>

            </CardItem>
        ))
        this.setState({cards})
        // console.log(result);

            }).catch(console.log)
            
    
       
    }).catch(
          console.log
        )
    
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
            title="Transactions"
            /> 
            <Container>
                <Content>
                    <Card>
                        {this.state.cards}
                        {/* <CardItem>              
                            <Icon name='logo-google' />                
                            <Text>FB</Text><Text>24$</Text><Text>Sell This</Text>
                            <Button bordered info>Sell</Button>
                        </CardItem> */}
                   </Card>
                </Content>
            </Container>
      {/* <HeaderPage pageTitle="Courses "  toggleOpen={()=>this.toggleOpen()} />
      {this.state.open && <SideBar navigation={this.props.navigation} style={StyleSheet.animatedBox}/> } */}
     {/* <Container> */}
                {/* <Content>
                    <List>
                        <ListItem >
                        <Content>
          <Body > */}
          
                            {/* <Button bordered info> Sell </Button> */}
              {/* </Body>
              </Content>
                            
                        </ListItem> */}
                        {/* <ListItem>
                            <Text>Nathaniel Clyne
                            <Button bordered info> Sell </Button></Text>
                        </ListItem>
                        <ListItem>
                            <Text>Dejan Lovren
                            <Button bordered info> Sell </Button></Text>
                        </ListItem> */}
                    {/* </List>
                </Content> */}
            {/* </Container> */}
      {/* <Content>
          <Body >
            <Text style={styles.heading}>aaaaa </Text>
            <Text style={styles.text}>aaaaa
            </Text>
          </Body>
         
      
      </Content> */}
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
