import React, { Component } from 'react'
// import { Text, View } from 'react-native'
import { WebView } from "react-native-webview";

export default class WebChart extends Component {
    constructor(props){
        super(props)
    }
    renderHtml = () => {
        
        `<style>
            #timeToRender {
                display: none;
                position:absolute; 
                top: 10px; 
                font-size: 20px; 
                font-weight: bold; 
                background-color: #d85757;
                padding: 0px 4px;
                color: #ffffff;
            }
        </style>
        <div id="chartContainer" style="height: 300px; width: 100%;"></div>
        <span id="timeToRender"></span>
        <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
        <script>
            window.onload = function () {
            var limit = 50000;
            var y = 100;    
            var data = [];
            var dataSeries = { type: "line" };
            var dataPoints = [];
            for (var i = 0; i < limit; i += 1) {
                y += Math.round(Math.random() * 10 - 5);
                dataPoints.push({
                    x: i,
                    y: y
                });
            }
            dataSeries.dataPoints = dataPoints;
            data.push(dataSeries);
            
            //Better to construct options first and then pass it as a parameter
            var options = {
                zoomEnabled: true,
                animationEnabled: true,
                title: {
                    text: "Try Zooming - Panning"
                },
                axisY: {
                    includeZero: false,
                    lineThickness: 1
                },
                data: data  // random data
            };
            
            var chart = new CanvasJS.Chart("chartContainer", options);
            var startTime = new Date();
            chart.render();
            var endTime = new Date();
            document.getElementById("timeToRender").innerHTML = "Time to Render: " + (endTime - startTime) + "ms";
            
            }
        </script>`
    }
    render() {
        return (
            <WebView
                scrollEnabled={true}
                originWhitelist={['*']}
            />
        )
    }
}