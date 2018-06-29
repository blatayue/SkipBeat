import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import chart from "chartjs";
// import * as heatmap from "chart.heatmap";
import ColorThief from "colorThief";
class App extends Component {
  colorThief = new ColorThief();
  image = new Image();

  // "http://ws.audioscrobbler.com/2.0/?method=track.search&track=Believe&api_key=b5aeea3eb0f3897a70f357622d3ba9ca&format=json";
  getImg = image => console.log(this.colorThief.getColor(image));

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          {
            (this.image.src =
              "https://lastfm-img2.akamaized.net/i/u/300x300/40d2b5d7c8dd4307c3e9eb1e87240cfc.png")
          }
          {this.getImg(this.image)}
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
