const axios = require("axios");
const cheerio = require("cheerio");

export const getHtml = async (keyword) => {
  try {
    return await axios.get(
      `https://www.jobkorea.co.kr/Search/?stext=${encodeURI(keyword)}`
    );
  } catch (error) {
    console.error(error);
  }
};

export const parsing = async (page) => {
  const $ = cheerio.load(page.data);
  const jobs = [];
  const $jobList = $(".post");
  $jobList.each((idx, node) => {
    const jobTitle = $(node).find(".title:eq(0)").text();
    console.log(jobTitle);
  });
};

export const getJob = async (keyword) => {
  const html = await getHtml(keyword);
  const jobs = await parsing(html);
  console.log(jobs);
};
