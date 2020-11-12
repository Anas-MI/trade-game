import React from "react";
import { StyleSheet, View } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryCandlestick,
  VictoryAxis
} from "victory-native";
import { Dimensions } from "react-native";

// const data = [
//     { x: new Date(2016, 6, 1), open: 9, close: 30, high: 56, low: 7 },
//     { x: new Date(2016, 6, 2), open: 80, close: 40, high: 120, low: 10 },
//     { x: new Date(2016, 6, 3), open: 50, close: 80, high: 90, low: 20 },
//     { x: new Date(2016, 6, 4), open: 70, close: 22, high: 70, low: 5 },
//     { x: new Date(2016, 6, 5), open: 9, close: 30, high: 56, low: 7 },
//     { x: new Date(2016, 6, 6), open: 80, close: 40, high: 120, low: 10 },
//     { x: new Date(2016, 6, 7), open: 50, close: 80, high: 90, low: 20 },
//     { x: new Date(2016, 6, 8), open: 70, close: 22, high: 70, low: 5 },
//     { x: new Date(2016, 6, 9), open: 9, close: 30, high: 56, low: 7 },
//     { x: new Date(2016, 6, 10), open: 80, close: 40, high: 120, low: 10 },
//     { x: new Date(2016, 6, 11), open: 50, close: 80, high: 90, low: 20 },
//     { x: new Date(2016, 6, 12), open: 70, close: 22, high: 70, low: 5 },
//   ];
export default class ShareChart extends React.Component {
    
  render() {
    const {data}=this.props;
    return (
      <View style={styles.container}>
        {/* <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart> */}
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 25 }}
          scale={{ x: "time" }}
          height={320}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
          defaultAxes={{
            independent: <VictoryAxis offsetX={Dimensions.get("window").width - 10}/>,
            dependent: <VictoryAxis offsetX={Dimensions.get("window").width - 10} dependentAxis/>
          }}
          // offsetX={200}
        >
          <VictoryCandlestick
            candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
            data={data}
            animate={{
              duration: 2000,
            }}
          />
        </VictoryChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#f5fcff"
  }
});
