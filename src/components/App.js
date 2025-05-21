import React, { Component } from "react";
import "../styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name1: "",
      name2: "",
      result: ""
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  getRelationship = (name1, name2) => {
    let a = name1.split("");
    let b = name2.split("");

    // Remove common characters (case-sensitive)
    for (let i = 0; i < a.length; i++) {
      const index = b.indexOf(a[i]);
      if (index !== -1) {
        a.splice(i, 1);
        b.splice(index, 1);
        i--; // recheck current index after removal
      }
    }

    const totalRemaining = a.length + b.length;
    const flamesIndex = totalRemaining % 6;

    const flamesMap = {
      1: "Friends",
      2: "Love",
      3: "Affection",
      4: "Marriage",
      5: "Enemy",
      0: "Siblings"
    };

    return flamesMap[flamesIndex];
  };

  handleClick = () => {
    const { name1, name2 } = this.state;

    if (name1.trim() === "" || name2.trim() === "") {
      this.setState({ result: "Please Enter valid input" });
    } else {
      const relationship = this.getRelationship(name1, name2);
      this.setState({ result: relationship });
    }
  };

  handleClear = () => {
    this.setState({
      name1: "",
      name2: "",
      result: ""
    });
  };

  render() {
    return (
      <div id="main">
        <input
          data-testid="input1"
          name="name1"
          placeholder="name 1"
          value={this.state.name1}
          onChange={this.handleInputChange}
        />
        <input
          data-testid="input2"
          name="name2"
          placeholder="name 2"
          value={this.state.name2}
          onChange={this.handleInputChange}
        />
        <button
          data-testid="calculate_relationship"
          name="calculate_relationship"
          onClick={this.handleClick}
        >
          Calculate Relationship Future
        </button>
        <button
          data-testid="clear"
          name="clear"
          onClick={this.handleClear}
        >
          Clear
        </button>
        <h3 data-testid="answer">{this.state.result}</h3>
      </div>
    );
  }
}

export default App;
