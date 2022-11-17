import React, { Component } from "react";

export class Card extends Component {
  render() {
    const handleUrlLink = (url) => {
      if (url) {
        return url;
      } else {
        return `https://news.ycombinator.com/item?id=${this.props.id}`;
      }
    };

    return (
      <a
        href={handleUrlLink(this.props.link)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="card">
          <div className="card-title">{this.props.title}</div>
          <div className="card-body">{this.props.body}</div>
          <div className="card-footer">
            <p>{this.props.date}</p>
          </div>
        </div>
      </a>
    );
  }
}
