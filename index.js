"use strict";
const axios = require('axios');
const {stringToHTML, getArticleData} = require('./utils')
const FINAL_DATA = []
const ObjectsToCsv = require('objects-to-csv');
const searchTopic = 'fault+tolerance+in+distributed+systems';

const parseLinks = async () => {
  const pages = new Array(100).fill(0);
  const linkPromises = pages.map(async (curr, key) => {
    await axios.get(`https://scholar.google.com/scholar?start=${key * 10}&q=${searchTopic}&hl=en&as_sdt=0,5`)
      .then((response) => {
        const docBody = stringToHTML(response.data)
        const {authors, titles, publications, years, sources, citedNumber} = getArticleData(docBody);
        for (let i = 0; i<10; i++) {
          FINAL_DATA.push({
            authors: authors[i],
            titles: titles[i],
            publications: publications[i],
            years: years[i],
            sources: sources[i],
            citedNumber: citedNumber[i],
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
      await csv.toDisk(`./dataset-${searchTopic}.csv`);
      console.log(await csv.toString());
    })();
  })
}


parseLinks()

