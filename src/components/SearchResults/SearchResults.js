import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList.js';

class SearchResults extends React.Component {

  render() {
    return(
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.tracks} action={this.props.addTrack} type='add'/>
      </div>
    );
  }
}

export default SearchResults;
