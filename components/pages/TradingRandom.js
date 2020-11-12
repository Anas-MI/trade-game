import React, { Component } from "react";
import {
  Container,
  Text,
  Body,
  Left,
  Icon,
  Button,
  Right,
  Header,
  Title,
  Tab,
  Tabs,
  ScrollableTab
} from "native-base";
import { Dimensions, StyleSheet } from "react-native";
import axios from 'axios'
import SingleSymbolPage from "../elements/SingleSymbolPageRandom";
import { getStockChart } from "../../controller/services/rapidApi";
export default class Trading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loder: true,
      symbol: "FB",
      symbolData: [],
      chartData: null,
      symbolPriceData: []
    };
    // this.searchSymbol = this.searchSymbol.bind(this);
  }
  componentDidMount() {
    
  }

  render() {
    const screenWidth = Dimensions.get("window").width + 100;
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" onPress={() => this.props.navigation.navigate('Dashboard')}/>
            </Button>
          </Left>
          <Body>
            <Title>Segments</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="search" onPress={() => this.props.navigation.navigate('Search')} />
            </Button>
          </Right>
        </Header>
        <Tabs locked={true} renderTabBar={() => <ScrollableTab />}>
          <Tab heading="FB">
            <SingleSymbolPage symbol="fb" />
          </Tab>
          <Tab heading="AAPL">
            <Tab heading="AAPL">
              <SingleSymbolPage symbol="AAPL" />
            </Tab>
          </Tab>
          <Tab heading="AMZN">
            <Tab heading="amzn">
              <SingleSymbolPage symbol="amzn" />
            </Tab>
          </Tab>
          <Tab heading="GOOGL">
            <Tab heading="GOOGL">
              <SingleSymbolPage symbol="GOOGL" />
            </Tab>
          </Tab>
          <Tab heading="MSFT">
            <Tab heading="MSFT">
              <SingleSymbolPage symbol="MSFT" />
            </Tab>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  socailLogin: {
    flex: 1,
    flexDirection: "row"
  },
  floatLeft: {
    width: "5%",
    flex: 0.2,
    alignItems: "center",
    marginLeft: 5,
    textAlign: "center"
  },
  cart_info: {
    marginTop: 50
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
  gray: {
    color: "gray"
  },
  black: {
    color: "black"
  }
});
