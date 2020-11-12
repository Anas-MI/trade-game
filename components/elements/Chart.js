import React, { Component } from "react";
import {
    Dimensions,
    StyleSheet,
    View, Text, WebView,
    PixelRatio
} from "react-native";
import { Container, Content, Picker } from 'native-base';

import { Svg, G, Rect } from 'react-native-svg'
import * as d3 from 'd3'
const GRAPH_MARGIN = 20
const GRAPH_BAR_WIDTH = 5
const colors = {
    axis: '#E4E4E4',
    bars: '#15AD13'
}

const Item = Picker.Item;
export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: undefined,
            selected1: '1mo',
            results: {
                items: []
            }
        }
    }
    onValueChange(value) {
        this.setState({
            selected1: value
        });
    }
    onMessage = (m) => {
        console.log({ m })
        const {
            data
        } = m.nativeEvent
        console.log({ data })
        const {
            onCandleSelect
        } = this.props
        const currentData = JSON.parse(data)
        console.log({
            currentData,
            ratio: PixelRatio.getPixelSizeForLayoutSize(200)
        })
        if (typeof onCandleSelect === "function")
            onCandleSelect(currentData)
    }
    render() {
        const SVGHeight = 150
        const SVGWidth = 300
        const graphHeight = SVGHeight - 2 * GRAPH_MARGIN
        const graphWidth = SVGWidth - 2 * GRAPH_MARGIN
        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height;
        const chartHeight = width * 1.2
        // return (
        //     <View>
        //         <Svg width={SVGWidth} height={SVGHeight}>
        //             <G>

        //             </G>
        //         </Svg>
        //     </View>
        // )
        return (
            <View>



                        <Picker
                            iosHeader="Select Range"
                            mode="dropdown"
                            selectedValue={this.state.selected1}
                            onValueChange={this.onValueChange.bind(this)}>
                            <Item label="1 Day" value="1d" />
                            <Item label="1 Week" value="5d" />
                            <Item label="1 Month" value="1mo" />
                            <Item label="3 Months" value="3mo" />
                            <Item label="6 Months" value="6mo"/>
                            <Item label="1 Year" value="1y"/>
                            
                        </Picker>
                    


                <View style={{
                    width: width,
                    height: chartHeight,
                    borderColor: "black",
                    borderWidth: 2,
                    marign: 10
                }}>





                    <WebView
                        onMessage={m => this.onMessage(m)}
                        // source={{uri: 'https://relentless.doitsindia.com/tradeapi-Old/index.php?symbol=FB&range=1mo'}}
                        source={{ uri: `https://relentless.doitsindia.com/tradeapi/index.php?symbol=${this.props.symbol}&range=${this.state.selected1}` }}
                        style={{
                            flex: 1
                        }}
                    />
                </View>
            </View>
        )
    }
}