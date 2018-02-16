import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends React.Component {
  render() {
      return (
        <div className="TrackList">
          {
            this.props.tracks.map(track => {
              return <Track action={this.props.action} moveTrack={this.props.moveTrack} track={track} type={this.props.type}/>;
            })
          }
        </div>
      );
  }
}

export default TrackList;
