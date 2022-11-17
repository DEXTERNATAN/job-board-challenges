import React, { Component } from "react";

export class Lists extends Component {
  render() {
    return <div className="list">{this.props.children}</div>;
  }
}
