// rapidApi.js
import axios from "axios";

export const getStockChart = ({
    interval, symbol, range
}) => {
    return axios({
        "method": "GET",
        "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart",
        "headers": {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          "x-rapidapi-key": "192881900fmsh83b21139b9eda59p108ca9jsnefb28bb236fa"
        }, "params": {
          "interval": interval ? interval : "60m",
          "region":"US",
          "symbol": symbol ? symbol : "AMZN",
          "lang":"en",
          "range": range ? range : "1d"
        }
    })
}


export const getMarketQuery= (
  symbol
) => {
  console.log('symbol',{symbol});
  return axios({
      "method": "GET",
      "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes",
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": "192881900fmsh83b21139b9eda59p108ca9jsnefb28bb236fa"
      }, "params": {
        "region":"US",
        "symbols": symbol ? symbol : "AMZN",
        "lang":"en",
      }
  })
}


export const getSearchSymbols= ({
  symbol
}) => {
  return axios({
      "method": "GET",
      "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/auto-complete",
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": "192881900fmsh83b21139b9eda59p108ca9jsnefb28bb236fa"
      }, "params": {
        "region":"US",
        "query": "FB",
        "lang":"en",
      }
  })
}