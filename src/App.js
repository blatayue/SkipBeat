import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import chart from "chartjs";
import * as heatmap from "chart.heatmap";
import ColorThief from "colorThief";
const colorThief = new ColorThief();
const image = new Image();
image.src =
  "http://ws.audioscrobbler.com/2.0/?method=track.search&track=Believe&api_key=b5aeea3eb0f3897a70f357622d3ba9ca&format=json";
const getImg = image => console.log(colorThief.getColor(image));
class App extends Component {
  render() {
    return (
      <div className="App">
        {getImage(image)}
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
