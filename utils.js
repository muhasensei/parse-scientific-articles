const jsdom = require("jsdom");
const stringToHTML = function (str) {
  const dom = new jsdom.JSDOM(str);
	return dom.window.document.body;
};



const getArticleData = (page) => {
  const authorsQueries = page.querySelectorAll(".gs_a");
  const authors = []
  const publications = []
  const years = []
  const sources = []
  for (let i=0; i<authorsQueries.length; i++){
    const tags = authorsQueries[i].textContent.split('-');
    publications.push(tags[1].split(',')[0]);
    authors.push(tags[0]);
    years.push(tags[1].split(',')[1]);
    sources.push(tags[2]);
  }

  const citeQueries = page.querySelectorAll(".gs_fl")
  const citedNumber = [];
  for (let i = 0; i < citeQueries.length; i++) {
    citedNumber.push(Number(citeQueries[i].textContent.split('by')[1]?.split('Related')[0]))
  }

  const titlesQueries = page.querySelectorAll(".gs_rt");
  const titles = []
  for (let i=0; i<titlesQueries.length; i++){
    titles.push(titlesQueries[i].textContent);
  }

  return {authors, titles, publications, years, sources, citedNumber};
}

module.exports = {
  stringToHTML,
  getArticleData
};