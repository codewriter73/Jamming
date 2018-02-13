import React from 'react';
import './Track.css';


class Track extends React.Component {
  constructor(props) {
    super(props);

    this.action = this.action.bind(this);
  }

  action(event) {
    var track = this.props.track;
    this.props.action(track);
  }

  render() {
    let link;
    if(this.props.type === 'add') {
      link = <a className={"Track-action"} onClick={this.action}>+</a>;
    }
    else
    {
       link = <a className={"Track-action"} onClick={this.action}>-</a>;
    }

    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
      {link}
      </div>
    );
  }
}

export default Track;
