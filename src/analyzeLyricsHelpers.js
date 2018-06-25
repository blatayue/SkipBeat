// Take lyrics
// Reduce to get count,
// Sort to assign colors
// map over lyrics to generate x, y, z (color)

import R from "ramda";
import { apiSeeds, lastFM } from "./apiHelpers.js";
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
    {} //accumulator init - formatting here is strange
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
  lastFM
    .trackQuery(track) // full response
    .then(R.path([results, track, 0])); // first track

/**
 * @typedef {String} lyrics
 * @param {apiSeedsFormat} track
 * @returns {lyrics}
 */
const getLyrics = async track =>
  apiSeeds.lyricQuery(track).then(R.path(["result", "track", "text"]));

// replaces newlines and parentheses with spaces and nothing respectively
const parseLyrics = lyrics => lyrics.replace("\n", " ").replace(/[\(\)]/g, "");
