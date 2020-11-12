import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Icon,
  Text,
  Item,
  Content,
  Body,
  Input,
  List,
  ListItem,
  Left,
  Right
} from "native-base";
import MainHeader from "../elements/Header";
import axios from "axios";
import { getMarketQuery } from "../../controller/services/rapidApi";
export default class Search extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      searchKey: "",
      membershipData: "",
      courseData: "",
      open: false,
      loder: true,
      searchResult: [],
      symbolList: "",
      symbolQuery: []
    };
    this.searchSymbol = this.searchSymbol.bind(this);
    this.getQueryData = this.getQueryData.bind(this);
    this.getWithColor = this.getWithColor.bind(this);
  }

  toggleOpen() {
    this.setState({
      open: !this.state.open
    });
  }
  searchSymbol(symbol) {
    this.setState({
      searchKey: symbol
    });

    symbol.length >= 2 &&
      axios
        .get(
          "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" +
            symbol +
            "&apikey=G9MSYKB15GVXJJOW",
          { headers: { Accept: "application/json" } }
        )
        .then(response => {
          console.log(response);
          if (
            response.data &&
            response.data.bestMatches &&
            response.data.bestMatches.length > 0
          ) {
            const bestMatches = response.data.bestMatches;
            var bestMatchesSymbol = [];
            const bestSymbol = bestMatches.map(item => {
              bestMatchesSymbol.push(item["1. symbol"]);
            });
            this.getQueryData(bestMatchesSymbol.toString());
            this.setState({
              searchResult: response.data.bestMatches,
              symbolList: bestMatchesSymbol.toString()
            });
          }
          // return response.data
        })
        .catch(error => {
          console.log(error);
          // return false
        });
  }

  getWithColor = data => {
    if (data > 0) {
      return <Text style={{ color: "green" }}>{data.toFixed(2)}</Text>;
    } else {
      return <Text style={{ color: "red" }}>{data.toFixed(2)}</Text>;
    }
  };
  getWithColorPar = data =>{
    if (data > 0) {
      return <Text style={{ color: "green" }}>{data.toFixed(2)}%</Text>;
    } else {
      return <Text style={{ color: "red" }}>{data.toFixed(1)}%</Text>;
    }
  }

  getQueryData = sybl => {
    return getMarketQuery(sybl)
      .then(res => {
        const resArray = res.data.quoteResponse.result;
        console.log({ resArray });
        this.setState({
          symbolQuery: resArray
        });
      })
      .catch(err => {
        console.log({ err });
      });
  };
  render() {
    const { searchKey, searchResult, symbolQuery } = this.state;
    return (
      <Container>
        <MainHeader navigation={this.props.navigation} title="Search Symbol" />
        <Content>
          <List>
            <ListItem itemHeader first>
              <Item regular>
                <Input
                  placeholder="Search"
                  onChangeText={searchKey => this.searchSymbol(searchKey)}
                  value={searchKey}
                  name="search"
                />
                <Icon active name="ios-search" />
              </Item>
            </ListItem>

            {symbolQuery && symbolQuery.length > 0 ? (
              symbolQuery.map((key, index) => (
                <ListItem 
                key={index}
                 onPress={() => this.props.navigation.navigate('SingleSymbol',{symbol:key.symbol})} 
                >
                  <Left>
                      <Text>{key.longName}</Text>
                  </Left>
                  <Body>
                      <Text>{key.symbol} </Text>
                  </Body>
                  <Right>
                    <Text note>{key.regularMarketPrice}</Text>
                    {this.getWithColor(key.regularMarketChange)}{this.getWithColorPar(key.regularMarketChangePercent)}
                  </Right>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <Text>No Result Found.</Text>
              </ListItem>
            )}
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#8D8D8D",
    padding: 20
  },
  heading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    fontSize: 20,
    marginBottom: 5,
    marginTop: 20
  },
  list: {
    flex: 1,
    width: "100%"
  },
  fullWidht: {
    width: "100%"
  }
});
