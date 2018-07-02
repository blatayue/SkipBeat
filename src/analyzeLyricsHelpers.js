// Take lyrics
// Reduce to get count,
// Sort to assign colors
// map over lyrics to generate x, y, z (color)
const R = require('ramda');
const helpers = require('./apiHelpers.js');

const lyricsToArr = countedLyrics =>
  R.mapObjIndexed(count, word => [count, word])(countedLyrics);

const assignColors = countedLyrics => {
  const sortedLyrics = countedLyrics.sort();
};
/**
 * @typedef {Object} apiSeedsFormat
 * @prop {String} artist
 * @prop {String} name
 */
/**
 * @param {String} track
 * @returns {apiSeedsFormat}
 */
const getLastFM = async track =>
  helpers.lastFM
    .trackQuery(track)
    .then(R.path(['data', 'results', 'trackmatches', 'track', 0])); // first track

/**
 * @typedef {String} lyrics
 * @param {apiSeedsFormat} track
 * @returns {lyrics}
 */
const getLyrics = async track =>
  helpers.apiSeeds.lyricQuery(track)
  .then(R.path(['data', 'result', 'track', 'text']))

const parseLyrics = lyrics => 
  lyrics
    .replace(/\\n/g, '')
    .replace(/\n/g, '')
    .replace(/[!"#$%&()*+,\-./:;<=>?@[\]\^_`{|}~]/g, '') // remove all punctuation except single quotes for contractions
    // Don't forget to parse on graph making
    .split(' ')

const makeFrequency = lyrics => 
  lyrics.reduce((freq, word) => 
    freq.hasOwnProperty(word) 
      ? {...freq, [word]: freq[word]+= 1} 
      : {...freq, [word]: 1}, 
    {})

/** @typedef {String} word */
/** @typedef {Object} frequency
 *  @prop {Number} word 
 */
const analyze = query => 
  getLastFM(query)
  .then(getLyrics) 
  .then(parseLyrics) /** @type {word[]}*/
  .then(makeFrequency) /** @type {frequency} */
  .then(console.log)

analyze('Chelsea Dagger').catch(console.log)