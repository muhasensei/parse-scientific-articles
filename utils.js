const jsdom = require("jsdom");
const stringToHTML = function (str) {
  const dom = new jsdom.JSDOM(str);
	return dom.window.document.body;
};



const getArticleData = (page) => {
  const authorsQueries = page.querySelectorAll("#dlpage .list-authors");
  const authors = []
  const find = ',';
  const re = new RegExp(find, 'g');
  for (let i=0; i<authorsQueries.length; i++){
    authors.push(authorsQueries[i].textContent.trim().replace('Authors:', '').replace(re, '|'));
  }

  const titlesQueries = page.querySelectorAll("#dlpage .list-title");
  const titles = []
  for (let i=0; i<titlesQueries.length; i++){
    titles.push(titlesQueries[i].textContent.trim().replace('Title:', ''));
  }

  const subjectsQueries = page.querySelectorAll("#dlpage .list-subjects");
  const subjects = []
  for (let i=0; i<subjectsQueries.length; i++){
    subjects.push(subjectsQueries[i].textContent.trim().replace('Subjects:', ''));
  }


  return {authors, titles, subjects};
}

module.exports = {
  stringToHTML,
  getArticleData
};