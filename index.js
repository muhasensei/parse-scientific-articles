"use strict";
const axios = require('axios');
const {stringToHTML, getArticleData} = require('./utils')
const FINAL_DATA = []
const ObjectsToCsv = require('objects-to-csv');
const searchDate = 'current';
const searchYear = 2022;

const parseLinks = async () => {
  const pages = new Array(3).fill(0);
  const linkPromises = pages.map(async (curr, key) => {
    await axios.get(`https://arxiv.org/list/cs.DC/${searchDate}?skip=${key * 25}&show=25`)
      .then((response) => {
        const docBody = stringToHTML(response.data)
        const {authors, titles, subjects} = getArticleData(docBody);
        for (let i = 0; i<10; i++) {
          FINAL_DATA.push({
            author: authors[i],
            titles: titles[i],
            subjects: subjects[i],
            years: searchYear,
          })
        }
      })
      .catch((error) => {
        console.log(error);
    });
  })

  Promise.all(linkPromises).then(() => {
    (async () => {
      const csv = new ObjectsToCsv(FINAL_DATA);
      await csv.toDisk(`./dataset-${searchDate}-${searchYear}.csv`);
      console.log(await csv.toString());
    })();
  })
}


parseLinks()

