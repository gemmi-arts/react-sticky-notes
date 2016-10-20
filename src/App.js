import React, { Component } from "react";
import Board from "./components/Board";
import "./style.scss";

export default class App extends Component {
  render() {
    return (
      <div className="appRoot">
        <Board/>
      </div>
    );
  }
}
