import React from 'react';
import './Track.css';


class Track extends React.Component {
  constructor(props) {
    super(props);

    this.action = this.action.bind(this);
    this.moveTrackUp = this.moveTrackUp.bind(this);
    this.moveTrackDown = this.moveTrackDown.bind(this);
  }

  action(event) {
    var track = this.props.track;
    this.props.action(track);
  }

  moveTrackUp(event) {
    var track = this.props.track;
    this.props.moveTrack(track, 'up');
  }

  moveTrackDown(event) {
    var track = this.props.track;
    this.props.moveTrack(track, 'down');
  }

  render() {
    let link;
    if(this.props.type === 'add') {
      link = <a className={"Track-action"} onClick={this.action}>+</a>;
    }
    else
    {
      link = (
      <div className="Modify-Links">
        <a className={"Move-up"} onClick={this.moveTrackUp}>^</a>
        <a className={"Track-action"} onClick={this.action}>-</a>
        <a className={"Move-down"} onClick={this.moveTrackDown}>v</a>
      </div>
      );
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
