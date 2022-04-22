const puppeteer = require('puppeteer');

/* eslint-disable no-unused-vars */
exports.Search = class Search {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    const { url } = params.query;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    let finalResult = await page.evaluate(() => {
      let result = [];
      let review = document.querySelectorAll('div.review > .rightCol > blockquote > h6');
      let reviewDate = document.querySelectorAll('div.review > .leftCol > .reviewer > :nth-child(4)');
      let reviewerName = document.querySelectorAll('div.review > .leftCol > .reviewer > :nth-child(2)');
      let rating = document.querySelectorAll('div.review > .leftCol > .itemReview > :nth-child(2) > .itemRating > :nth-child(2)');

      review.forEach((item) => {
        result.push({
          review: item.innerText
        });
      });

      reviewDate.forEach((item, index) => {
        result.map((eitem, rindex) => {
          if (index == rindex) {
            result[rindex].reviewDate = item.innerText;
          }
        })
      });

      reviewerName.forEach((item, index) => {
        result.map((eitem, rindex) => {
          if (index == rindex) {
            result[rindex].reviewerName = item.innerText;
          }
        })
      });
      
      rating.forEach((item, index) => {
        result.map((eitem, rindex) => {
          if (index == rindex) {
            result[rindex].rating = item.innerText;
          }
        })
      });
      
      return result;
    });
    await browser.close();
    return finalResult;
  }
};

