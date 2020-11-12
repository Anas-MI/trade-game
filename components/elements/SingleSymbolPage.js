import React, { Component } from "react";
import { Text, Button, CardItem, Card, Spinner, Icon } from "native-base";
import ShareChart from "./tradingGraph/ShareChart";
import { Dimensions, StyleSheet, ScrollView } from "react-native";
import { View } from "react-native";
import Modal from "react-native-modal";
import RangeSlider from "rn-range-slider";
import { getStockChart } from "../../controller/services/rapidApi";
import Chart from "./Chart";
import AsyncStorage from '@react-native-community/async-storage'        
import axios from 'axios';
import {apiUrl} from '../../config';

import moment from "moment"
import "moment-timezone";
import Axios from "axios"

export default class SingleSymbolPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      symbol: this.props.symbol ? this.props.symbol : "fb",
      symbolData: [],
      chartData: null,
      symbolPriceData: [],
      loder: true,
      mapDataNew: [],
      modalStatus: false,
      modalStatus2: false,
      day: 1,
      quantity:1,
      selectedData : null,
      dataSelected: false,
      exists: false, 
      isProfit: false,
      isLoss: false,
      showRange: false,
      value: 0
    };
  }
  componentDidMount() {
    this.getRapidData({
      interval: "60m",
      range: "1d",
      day: 1
    });
    const value =  AsyncStorage.getItem('user').then(res => {
      
      const user  = JSON.parse(res)
      this.setState({user})
      let url = `https://relentless.doitsindia.com/api/get_all_transactions/?user_id=${this.state.user.id}&symbol=&transaction_type=buy`    
        console.log({url})
        // processThis()

     
            let data =  Axios.get(url).then(data1 => {
                console.log({data1})
                let data = data1.data.records
                let final = data.find(o => o.currency_symbol === this.state.symbol.toUpperCase());
                if(final){

                  this.setState({exists: true, value:final.current_close_price, final })
                  if(final.purchased_unit > 1){
                    this.setState({showRange: true})
                  } else {
                    this.setState({showRange: false})
                  }
                  if(final.current_close_price > final.yahoo_current_price){
                    this.setState({isLoss: true})
                } else if(final.current_close_price < final.yahoo_current_price){
                  this.setState({isProfit: true})

                 }
                }
                console.log({data, final})
                
              }).catch(console.log)
    }).catch(
        console.log
      )
  }
  getRapidData = ({ interval, range, day }) => {
    this.setState({
      loder: true
    });
    getStockChart({
      interval: interval || "60m",
      symbol: this.props.symbol,
      range: range || "1d"
    })
      .then(res => {
        console.log("getStockChart", { res });
        if (res && res.data) {
          if (res.data.chart) {
            if (
              !res.data.chart.error &&
              res.data.chart.result &&
              res.data.chart.result.length > 0
            ) {
              const {
                indicators: { quote },
                timestamp,
                meta
              } = res.data.chart.result[0];
              console.log({
                timestamp
              });
              const chartData = timestamp && timestamp.map((el, i) => {
                console.log({ el });
                return {
                  x: new Date(el * 1000),
                  close: quote[0].close[i],
                  high: quote[0].high[i],
                  low: quote[0].low[i],
                  open: quote[0].open[i]
                };
              });
              this.setState({
                day,
                mapDataNew: chartData,
                loder: false
              });

              console.log({
                chartData
              });
            }
          }
        }
      })
      .catch(err => {
        console.log("getStockChart", { err });
      });
  };
  singleSymbolData = data => {
    const timeData = Object.keys(data)
      .map(el => el !== "Meta Data" && data[el] && data[el])
      .filter(el => el);
    const timeDataA = timeData[0];

    const labels = Object.keys(timeDataA).filter((e, i) => i < 7);
    const dataSet = Object.keys(timeDataA)
        .map(el => timeDataA[el]["1. open"])
        .filter((e, i) => i < 7),
      mapData = {
        labels,
        datasets: [{ data: dataSet }]
      };
    const symbolPriceData = Object.keys(timeDataA)
      .map(el => timeDataA[el])
      .filter((e, i) => i < 7);
    this.setState({
      chartData: mapData,
      symbolPriceData: symbolPriceData
    });
    const newMapData = Object.keys(timeDataA).map(el => timeDataA[el]);
    console.log({
      newMapData
    });
    var day = this.state.day;
    if (day == 1) {
      day = 20;
    }
    if (day == 5) {
      day = 5;
    }
    if (day == 6) {
      day = 30;
    }
    // day=this.state.day == 5 ? 5 : 50;

    const filteredArr = Object.keys(timeDataA).filter((a, i) => i < day);
    const mapDataNew = filteredArr.map(el => ({
      x: new Date(el),
      open: timeDataA[el]["1. open"],
      high: timeDataA[el]["2. high"],
      low: timeDataA[el]["3. low"],
      close: timeDataA[el]["4. close"]
    }));
    console.log({
      mapDataNew
    });
    this.setState({
      mapDataNew
    });
  };

  getPriceByQty = (price = 0 , qty = 1) =>{
     const totalPrice=price*qty;
     return ' $' + totalPrice.toFixed(2);
  }

  //Function to buy a share
  buyShare = (selectedData) => {
    // let timea = selectedData.name.toString()
    var ts = moment(selectedData.name, "h:m a, DD/MM/YY").valueOf().toString();
    console.log(this.state)
    let dateToSend = ts.slice(0, -3);
    let userId = this.state.user.id
    let unit = this.state.quantity
const url = `https://relentless.doitsindia.com/api/TG_user_buy_company_share/?user_id=${userId}&symbol=${this.state.symbol.toUpperCase()}&share_unit=${unit}&date=${dateToSend}`
console.log({url})
axios.get(url).then(console.log).catch(console.log)
  }

  sellShare = (selectedData) => {
    // let timea = selectedData.name.toString()
    let ts = moment().valueOf().toString();
    console.log(ts)
    let dateToSend = ts.slice(0, -3);
    let userId = this.state.user.id
    let unit = this.state.quantity
    // const url = `https://relentless.doitsindia.com/api/TG_user_sale_company_share/?user_id=104&symbol=HYDR.ME&sale_unit=25&date=1557210600`
const url = `https://relentless.doitsindia.com/api/TG_user_sale_company_share/?user_id=${userId}&symbol=${this.state.symbol.toUpperCase()}&sale_unit=${unit}&date=${dateToSend}`
console.log({url})
axios.get(url).then(console.log).catch(console.log)
  }

  formatTime = (time) => {
    let timea = time.toString()
    let time2 = moment(timea).format()
    var ts = moment(time, "h:m a, DD/MM/YY").valueOf();
var m = moment(ts);
var s = m.format("M/D/YYYY H:mm");
    // .tz('Europe/Paris').format(),
    // timestamp = moment(time2).format("X");
    console.log({ts,s})
  }

  render() {
    console.log(this.state)
    const data = this.state.chartData;
    const { 
      symbolPriceData, 
      loder, 
      mapDataNew, day, modalStatus,quantity,
      selectedData, modalStatus2
    } = this.state;
    // const price =
    //   mapDataNew && mapDataNew.length > 0 ? mapDataNew.reverse()[0] : [];
    // console.log({ price, mapDataNew });
    // const chartConfig = {
    //   backgroundGradientFrom: "#ffffff",
    //   backgroundGradientTo: "#fcfcfc",
    //   color: (opacity = 5) => `rgba(0, 179, 30, ${1})`
    // };
    const screenWidth = Dimensions.get("window").width + 100;
    return loder ? (
      <Spinner color="blue" />
    ) : (
      <ScrollView heading="FB">
        <Chart 
          symbol={this.state.symbol}
          onCandleSelect={selectedData => {
            this.setState({
              selectedData,
              dataSelected:true
            }, console.log({
              selectedData
            }, this.formatTime(selectedData.name)))
        }} />
        {
          // new Array(100).fill("").map((el, i)=> <Text>asdf {i}</Text>)
        }
         {
          // selectedData && selectedData.Close && 
        //   <Text>
        //     {/* Rate {parseFloat(selectedData.Close).toFixed(2)}$ */}
        //  {selectedData}
        //   </Text>
        }
     
        {/* {
          selectedData && 
          <Text style={styles.alignText}>
            Close:-  {parseFloat(selectedData.data[2]).toFixed(2)}$
          </Text>
        } */}
       {this.state.dataSelected &&
          <View>
           
            <Card style={styles.cart_info}>
              <CardItem>
                <View style={styles.row}>
                  <View style={styles.col6}>
                    <Text style={styles.gray}>Open </Text>
                    <Text style={styles.black}>
                    Rate {parseFloat(selectedData.data[1]).toFixed(2)}$

                    </Text>
                  </View>
                  <View style={styles.col6}>
                    <Text style={styles.gray}>Close </Text>
                    <Text style={styles.black}>
                    Rate {parseFloat(selectedData.data[2]).toFixed(2)}$

                    </Text>
                  </View>
                </View>
              </CardItem>
              <CardItem>
                <View style={styles.row}>
                  <View style={styles.col6}>
                    <Text style={styles.gray}>Highest </Text>
                    <Text style={styles.black}>
                    Rate {parseFloat(selectedData.data[4]).toFixed(2)}$

                    </Text>
                  </View>
                  <View style={styles.col6}>
                    <Text style={styles.gray}>Lowest </Text>
                    <Text style={styles.black}>
                    Rate {parseFloat(selectedData.data[3]).toFixed(2)}$

                    </Text>
                  </View>
                </View>
              </CardItem>
            </Card>
            <View style={styles.row}>
              <View style={this.state.exists ? styles.col6 : styles.col12}>
                <Button full success onPress={() => {
                    this.setState({ modalStatus: !modalStatus });
                  }}>
                  <Text
                   
                  >Buy</Text>
                </Button>
              </View>
              {this.state.exists && <View style={styles.col6}>
                <Button full danger onPress={() => {
                    this.setState({ modalStatus2: !modalStatus2 });
                  }}>
                  <Text style={styles.btn_icon}>
                    {this.state.isLoss && <Icon style={{fontSize:50}}name='ios-arrow-round-down'/>}
                    {this.state.isProfit && <Icon style={{fontSize:50}}name='ios-arrow-round-up'/>}
                    
                    </Text>
                  <Text
                    onPress={() => {
                      this.setState({ modalStatus: !modalStatus });
                    }}
                  // style={styles.btn_block}
                  >
                    <Text style={styles.btn_text_1}>
                      Sell
                      </Text>
                      {/* <Text style={styles.btn_text_2}>
                        
                        434$
                        </Text> */}
                  </Text>
                </Button>
              </View>}

                        {/* Sell share model */}
                        <Modal isVisible={modalStatus2}>
                        {/* <View style={styles.row}> */}
                     
                        
                <View style={styles.modalView}>
                  <Card style={styles.cart_info}>
                    <Text>  </Text>
                        <Text>    You have {this.state.final.purchased_unit} Share</Text>
                    <CardItem>
                      <View style={styles.row}>
                        <View style={styles.col12}>
                          <Text style={styles.gray}>Purchased Price</Text>
                          <Text style={styles.black}>
                    {/* Rate {parseFloat(selectedData.data[1]).toFixed(2)}$ */}
                    {parseFloat(this.state.final.current_close_price).toFixed(2)}
                          </Text>
                        </View>
                        {/* <View style={styles.col6}>
                          <Text style={styles.gray}>Close </Text>
                          <Text style={styles.black}>
                          Rate {parseFloat(selectedData.data[2]).toFixed(2)}$
                          
                          </Text>
                        </View> */}
                      </View>
                    </CardItem>
                    <CardItem>
                      <View style={styles.row}>
                        <View style={styles.col12}>
                          <Text style={styles.gray}>Todays Market Rate </Text>
                          <Text style={styles.black}>
                          {parseFloat(this.state.final.yahoo_current_price).toFixed(2)}

                          </Text>
                        </View>
                        {/* <View style={styles.col6}>
                          <Text style={styles.gray}>Purchased Price </Text>
                          <Text style={styles.black}>
                          Rate {parseFloat(selectedData.data[3]).toFixed(2)}$
                          {parseInt(this.state.final.current_close_price).toFixed(2)}
                          </Text>
                        </View> */}
                      </View>
                    </CardItem>
                    <CardItem>
                      {this.state.showRange && <RangeSlider
                        style={{
                          width: screenWidth - 200,
                          height: 50,
                        }}
                        gravity={"center"}
                        min={1}
                        max={parseInt(this.state.final.purchased_unit)}
                        step={1}
                        rangeEnabled={false}
                        selectionColor="#3df"
                        blankColor="#f618"
                        onValueChanged={(low, high, fromUser) => {
                          this.setState({quantity:low})
                        }}
                      />}
                    </CardItem>
                    <CardItem>
                     {this.state.showRange && <Text >Select Quantity</Text>}
                    </CardItem>
                    <CardItem>
                          <Text style={styles.gray}>Total: </Text>
                          <Text style={styles.black}>
                          {quantity} { 'X' }{' '}

                              { this.getPriceByQty(this.state.final.yahoo_current_price,quantity) } 

                              </Text>
                    </CardItem>

                    <CardItem>
                      <View style={styles.row}>
                        <View style={styles.col6}>
                          <Button full success onPress={() => {
                              this.setState({ modalStatus2: !modalStatus2 });
                            }}>
                            <Text
                            
                            >Close</Text>
                          </Button>
                        </View>
                        <View style={styles.col6}>
                          <Button full danger  onPress={() => {
                                this.sellShare()
                                this.setState({ modalStatus2: !modalStatus2 });  
                              }}>
                            <Text
                             
                            >
                              Sell
                            </Text>
                          </Button>
                        </View>
                      </View>
                    </CardItem>
                  </Card>
                </View>
              </Modal>

                              {/* buy share modal */}
              <Modal isVisible={modalStatus}>
                <View style={styles.modalView}>
                  <Card style={styles.cart_info}>
                    <CardItem>
                      <View style={styles.row}>
                        <View style={styles.col6}>
                          <Text style={styles.gray}>Open </Text>
                          <Text style={styles.black}>
                    Rate {parseFloat(selectedData.data[1]).toFixed(2)}$
                           
                          </Text>
                        </View>
                        <View style={styles.col6}>
                          <Text style={styles.gray}>Close </Text>
                          <Text style={styles.black}>
                          Rate {parseFloat(selectedData.data[2]).toFixed(2)}$

                          </Text>
                        </View>
                      </View>
                    </CardItem>
                    <CardItem>
                      <View style={styles.row}>
                        <View style={styles.col6}>
                          <Text style={styles.gray}>Highest </Text>
                          <Text style={styles.black}>
                          Rate {parseFloat(selectedData.data[4]).toFixed(2)}$

                          </Text>
                        </View>
                        <View style={styles.col6}>
                          <Text style={styles.gray}>Lowest </Text>
                          <Text style={styles.black}>
                          Rate {parseFloat(selectedData.data[3]).toFixed(2)}$

                          </Text>
                        </View>
                      </View>
                    </CardItem>
                    <CardItem>
                      <RangeSlider
                        style={{
                          width: screenWidth - 200,
                          height: 50,
                        }}
                        gravity={"center"}
                        min={1}
                        max={100}
                        step={1}
                        rangeEnabled={false}
                        selectionColor="#3df"
                        blankColor="#f618"
                        onValueChanged={(low, high, fromUser) => {
                          this.setState({quantity:low})
                        }}
                      />
                    </CardItem>
                    <CardItem>
                      <Text >Select Quantity</Text>
                    </CardItem>
                    <CardItem>
                          <Text style={styles.gray}>Total: </Text>
                          <Text style={styles.black}>
                          {quantity} { 'X' }{' '}

                              { this.getPriceByQty(selectedData.data[2],quantity) } 

                              </Text>
                    </CardItem>

                    <CardItem>
                      <View style={styles.row}>
                        <View style={styles.col6}>
                          <Button full success onPress={() => {
                              this.setState({ modalStatus: !modalStatus });
                            }}>
                            <Text
                            
                            >Close</Text>
                          </Button>
                        </View>
                        <View style={styles.col6}>
                          <Button full danger  onPress={() => {
                                this.buyShare(selectedData)
                                this.setState({ modalStatus: !modalStatus });
                              }}>
                            <Text
                             
                            >
                              Buy
                            </Text>
                          </Button>
                        </View>
                      </View>
                    </CardItem>
                  </Card>
                </View>
              </Modal>
            </View>
          </View>}
        {/* )} */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  socailLogin: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  floatLeft: {
    width: "10%",
    flex: 0.25,
    alignItems: "center",
    marginLeft: 5,
    textAlign: "center"
  },
  cart_info: {
    // marginTop: 25
  },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  col6: {
    width: "45%",
    flex: 0.5,
    alignItems: "center"
  },
  col12: {
    width: "100%",
    flex: 1,
    alignItems: "center"
  },
  gray: {
    color: "gray"
  },
  black: {
    color: "black"
  },
  modalView: {
    flex: 1,
    padding: 10
  },
  alignText:{
    textAlign:"center",
    paddingTop:4
  },
  btn_block:{
    display: "flex",
    // alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#ff0000",
    color: "#ffffff",
    borderRadius: 5,
    // padding: 5 10,
    
},
btn_icon:{
    // marginRight: 10,
    fontSize: 20
},
btn_text_1:{
    margin: 0,
    marginBottom: 2,
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "400"
},
btn_text_2:{
    margin: 0,
    marginBottom: 0,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500"
}
});
