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
import axios from "axios";
import SingleSymbolPage from "../elements/SingleSymbolPage";
import { getStockChart } from "../../controller/services/rapidApi";
export default class SingleSymbol extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const symbol = navigation.getParam("symbol", "NO-ID");
    this.state = {
      open: false,
      loder: true,
      symbol: symbol ? symbol : "FB",
      symbolData: [],
      chartData: null,
      symbolPriceData: []
    };
    // this.searchSymbol = this.searchSymbol.bind(this);
  }
  componentDidMount() {}

  render() {
    const screenWidth = Dimensions.get("window").width + 100;
    const { symbol } = this.state;
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" onClick={() => {console.log("lalala")}} />
            </Button>
          </Left>
          <Body>
            <Title>{symbol}</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon
                name="search"
                onPress={() => this.props.navigation.navigate("Search")}
              />
            </Button>
          </Right>
        </Header>
        <Body>
            <SingleSymbolPage symbol={symbol} />
        </Body>
        
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
