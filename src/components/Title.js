import React, { Component } from "react";

export class Title extends Component {
  render() {
    return (
      <div className="title">
        <h1>{this.props.name}</h1>
      </div>
    );
  }
}
