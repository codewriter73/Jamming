import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList.js';

class PlayList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'New Playlist'
    }

    this.handleTermChange = this.handleTermChange.bind(this);
    this.saveToSpotify = this.saveToSpotify.bind(this);
  }

  handleTermChange(event) {
    this.setState({name: event.target.value});
  }

  saveToSpotify() {
    this.props.saveToSpotify(this.state.name, this.props.tracks);
    this.setState({name: 'New Playlist'});
  }

  render() {
    return (
      <div className="Playlist">
        <input onChange={this.handleTermChange} defaultValue='New Playlist' />
        <TrackList action={this.props.removeTrack} moveTrack={this.props.moveTrack} tracks={this.props.tracks} type='remove'/>
        <a className="Playlist-save" onClick={this.saveToSpotify}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default PlayList;
