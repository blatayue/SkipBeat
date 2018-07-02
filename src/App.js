import React, { Component } from "react";
import logo from "./logo.svg";
import fs from 'fs'
import "./App.css";
// import chart from "chartjs";
// import * as heatmap from "chart.heatmap";
const saveToArtworkDirectory = name => 
  image => fs.writeFile(`./artwork/${name}`, image) 

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  downloadImage = imageUri => {
    const urlParts = imageUri.split('/')
    const name = urlParts[urlParts.lengeth-1]
    fetch(imageUri).then(saveToArtworkDirectory(name))
  }


  render() {
    return (
      <div className="App">
        <p className="App-intro">
          {this.downloadImage(this.image)}
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
