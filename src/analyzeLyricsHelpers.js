// Take lyrics
// Reduce to get count,
// Sort to assign colors
// map over lyrics to generate x, y, z (color)

const R = require("ramda");
const helpers = require("./apiHelpers.js");
const layoutOptss = ({ title, id }) => ({
  showlegend: false,
  fileopt: "overwrite",
  title,
  filename: `${title}-${id}`
});

/**
 * @typedef
 */

const reduceLyrics = lyrics =>
  /**
   * @param {String} word
   * @typedef countedLyrics
   * @type {object}
   * @prop {String}
   */
  lyrics.reduce(
    (countedLyrics, word) =>
      countedLyrics[word]
        ? { ...countedLyrics, word: countedLyrics[word]++ }
        : { ...countedLyrics, word: 1 },
    {}
  );

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
    .trackQuery(track).then(track => track.json())
    // .then(R.path(["results", "track", 0])); // first track

/**
 * @typedef {String} lyrics
 * @param {apiSeedsFormat} track
 * @returns {lyrics}
 */
const getLyrics = async track =>
  helpers.apiSeeds.lyricQuery(track).then(R.path(["result", "track", "text"]))

const splitLyrics = lyrics => lyrics.split(" ")
// replaces newlines and parentheses with spaces and nothing respectively
const parseLyrics = lyrics => 
lyrics
.replace("\n", " ") // newlines aren't actually parsed for you, not needed though
.replace(/\(.*\)/g, ""); // same with artists parts, nbd yet

const analyze = query => 
  getLastFM(query)
  .then(console.log)
  // .then(getLastFM)
  // .then(splitLyrics)
  // .then(reduceLyrics)
  // .then(lyricsToArr)
  // .then(console.log)

analyze('Chelsea Dagger')