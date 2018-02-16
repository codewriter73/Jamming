import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import Spotify from '../../util/Spotify.js';
import SearchResults from '../SearchResults/SearchResults.js';
import PlayList from '../PlayList/PlayList.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: [],
      playlist: []
    };

    this.searchSpotify = this.searchSpotify.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.saveToSpotify = this.saveToSpotify.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.moveTrack = this.moveTrack.bind(this);
  }

  searchSpotify(term) {
    Spotify.search(term).then(tracks => {
      this.setState({tracks:tracks});
    });
  }

  saveToSpotify(name, tracks) {
    Spotify.saveToSpotify(name, tracks);
    this.setState({playlist: []});
  }

  addTrack(track) {
    const notInList = !(this.state.playlist.some(trackInPlaylist => trackInPlaylist === track));

    if(notInList)
      this.setState({playlist: [...this.state.playlist, track]});
  }

  removeTrack(track) {
      const index = this.state.playlist.indexOf(track);
      this.state.playlist.splice(index, 1);
      this.forceUpdate();
  }

  moveTrack(track, func) {
    if(func === 'up'){
      const index = this.state.playlist.indexOf(track);
      if(index !== 0) {
        const temp = this.state.playlist[index - 1];
        this.state.playlist[index - 1] = this.state.playlist[index];
        this.state.playlist[index] = temp;
        this.setState({playlist: this.state.playlist});
      }
    }
    if(func === 'down'){
      const index = this.state.playlist.indexOf(track);
      if(index !== this.state.playlist.length - 1) {
        const temp = this.state.playlist[index + 1];
        this.state.playlist[index + 1] = this.state.playlist[index];
        this.state.playlist[index] = temp;
        this.setState({playlist: this.state.playlist});
      }
    }
    return;
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar searchSpotify={this.searchSpotify} />
          <div className="Appplaylist">
            <SearchResults tracks={this.state.tracks} addTrack={this.addTrack}/>
            <PlayList tracks={this.state.playlist} moveTrack={this.moveTrack} saveToSpotify={this.saveToSpotify} removeTrack={this.removeTrack}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
