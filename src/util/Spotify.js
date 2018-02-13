let access_token;
const client_id = '13282f2147084c308e5a70c68a5ae5f6';
const response_type = 'token';
const scope = 'playlist-modify-private';
const redirect_uri = 'http:%2F%2Flocalhost:3000';

let userID;
let playlistID;
let tokenType;

const Spotify = {
  getAccessToken: function() {
    if(access_token) {
      return access_token;
    }
    else {
      if(window.location.href.match(/access_token=([^&]*)/)){
        let num1 = window.location.href.indexOf('=');
        let num2 = window.location.href.indexOf('&');
        access_token = window.location.href.substring(num1 + 1, num2);

        let newString = window.location.href.substring(num2 + 1, window.location.href.length);
        num1 = newString.indexOf('=');
        num2 = newString.indexOf('&');
        tokenType = newString.substring(num1 + 1, num2);

        let newNewString = newString.substring(num2 + 1, newString.length);
        num1 = newNewString.indexOf('=');
        num2 = newNewString.indexOf('&');
        let timeToExpire = newNewString.substring(num1 + 1, num2);

        setTimeout(function(){
          access_token = null;
          }, 10 * 1000);
          window.history.pushState('Access Token', null, '/');
      }
      else {
         window.location = 'https://accounts.spotify.com/authorize?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&scope=' + scope + '&response_type=' + response_type + '&state=123';
      }
    }
  },

  search(track) {
    Spotify.getAccessToken();

    //access_token = 'BQCrgadjSzKEAZluzUJUzk4zigwyx4wJlbnbETxKj6jnqrBAxXi0RRl2CtdAYRomeCoEepD_9ravB480k00thH2FFanKucpUIXKSH5nr1LZUf0Dhx1WSCWO2TbGSetmN5l9y33PJIfbsBjiPuhFCpdnR0nxXSn4AZA4diWOGyZQtcfoYsClzO27b8Xkx';
    const formattedTrack = track.replace(' ', '%20');
    const url =  'https://api.spotify.com/v1/search?q=' + formattedTrack + '&type=track';
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(response => {
        return response.json();
    }).then(jsonResponse => {
      if(jsonResponse.tracks){
        return jsonResponse.tracks.items.map(track => {
          return {
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            type: 'add',
            id: track.id,
            uri: track.uri
          };
        });
      }
    });
  },

  async getUserID() {
    if(userID) {
      return userID;
    }
    else {
    await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${access_token}`,

      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      userID = jsonResponse.id;
    });
    }
  },

  saveToSpotify(playlistName, tracks) {
    let uriArray = [];
    tracks.map(track => {
      uriArray.push(track.uri);
    });
    console.log(uriArray);

    Spotify.getUserID().then(function() {
      let url = 'https://api.spotify.com/v1/users/' + userID + '/playlists';
      let data = {
        name: playlistName,
        public: false
      }

      fetch(url, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'content-type': `application/json`
        },
        method: 'POST',
        body: JSON.stringify(data)
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        playlistID = jsonResponse.id;
        url = 'https://api.spotify.com/v1/users/' + userID + '/playlists/' + playlistID + '/tracks';
        data = {
          uris: uriArray
        }

        fetch(url, {
          headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(data)
        });
      });
    });
  }
};

export default Spotify;
