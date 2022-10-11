"use strict";
const axios = require('axios');
const {stringToHTML, getArticleData} = require('./utils')


const parseLinks = async () => {
  // const pages = new Array(1).fill(0);
  // const linkPromises = pages.map(async (curr, key) => {
    await axios.get(`https://scholar.google.com/scholar?start=10&q=fault+tolerance+in+distributed+systems&hl=en&as_sdt=0,5`)
      .then((response) => {
        const docBody = stringToHTML(response.data)
        const data = getArticleData(docBody);
        console.log('data: ', data)
      })
      .catch((error) => {
        console.log(error);
    });
  // })
/*
  Promise.all(linkPromises).then((res) => {
    console.log('DATA: ', res)
  })*/
}


parseLinks()

