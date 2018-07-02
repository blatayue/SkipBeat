// import request from "request";
const axios = require('axios')
const qs = require('querystring');
const dotenv = require('dotenv')
dotenv.config('../.env')
const createTrackQueryConfig = {
  uri: "https://ws.audioscrobbler.com/2.0/?",
  qs: track => ({
    method: "track.search",
    track,
    api_key: "b5aeea3eb0f3897a70f357622d3ba9ca",
    format: "json"
  })
};

const apiSeeds =  {
  uri: ({ name, artist }) => `https://orion.apiseeds.com/api/music/lyric/${artist}/${name}?`,
  qs: {
    apikey: 'VMsi9IvuTmCuHg21QJV7NCeEO9ptLQSXwTiOqDlbfvSdVaK02BNIv4oFmfUSz4MR'
  }
};

exports.apiSeeds = {
  lyricQuery: async ({ name, artist }) =>
    axios.get(apiSeeds.uri({name, artist}) + qs.stringify(apiSeeds.qs))
};

exports.lastFM = {
  trackQuery: async track => 
    axios.get(createTrackQueryConfig.uri + qs.stringify(createTrackQueryConfig.qs(track)))
};
