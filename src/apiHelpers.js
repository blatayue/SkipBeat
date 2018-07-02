// import request from "request";
const request = require('request')
const dotenv = require('dotenv').config()
const createTrackQueryConfig = track => ({
  uri: "https://ws.audioscrobbler.com/2.0/",
  qs: {
    method: "track.search",
    track,
    api_key: process.env.lastFM_API_key,
    format: 'json'
  }
});

const createapiSeedsQueryConfig = ({ name, artist }) => ({
  uri: `https://orion.apiseeds.com/api/music/lyric/${artist}/${name}`,
  qs: {
    apikey: process.env.apiseeds_key
  }
});

exports.apiSeeds = {
  lyricQuery: async ({ name, artist }) =>
    request(createapiSeedsQueryConfig({ name, artist }))
};

exports.lastFM = {
  trackQuery: async track => request(createTrackQueryConfig(track))
};
