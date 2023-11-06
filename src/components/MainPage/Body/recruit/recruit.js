const axios = require("axios");
const cheerio = require("cheerio");

const getHTML = async (keyword) => {
  try {
    const encodedKeyword = encodeURIComponent(keyword);
    const html = await axios.get(
      `https://www.saramin.co.kr/zf_user/search/recruit?searchType=search&searchword=${encodedKeyword}&company_cd=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C9%2C10&panel_type=&search_optional_item=y&search_done=y&panel_count=y&preview=y&recruitPage=1&recruitSort=relation&recruitPageCount=40&inner_com_type=&show_applied=&quick_apply=&except_read=&ai_head_hunting=`
    );
    return html.data;
  } catch (e) {
    console.log(e);
  }
};
const parsing = async (page) => {
  const $ = cheerio.load(page);
  const jobs = [];

  $(".area_job").each((idx, element) => {
    const jobTitle = $(element).find(".job_tit a").text();
    const jobConditions = $(element).find(".job_condition");

    const address = jobConditions
      .find("a")
      .map((idx, el) => $(el).text().trim())
      .get();

    const experience = jobConditions
      .find("span")
      .filter((idx, el) => $(el).text().includes("경력"))
      .text();
    const graduate = jobConditions
      .find("span")
      .filter(
        (idx, el) =>
          $(el).text().includes("대졸↑") || $(el).text().includes("초대졸↑")
      )
      .text();
    const employmentType = jobConditions
      .find("span")
      .filter(
        (idx, el) =>
          $(el).text().includes("정규직") || $(el).text().includes("계약직")
      )
      .text();

    const companyName = $(element)
      .next(".area_corp")
      .find(".corp_name a")
      .text()
      .trim();

    jobs.push({
      companyName,
      jobTitle,
      experience,
      graduate,
      employmentType,
      address,
    });
  });

  return jobs;
};

const getJob = async (keyword) => {
  const html = await getHTML(keyword);
  const jobs = await parsing(html);

  console.log(jobs);
};

getJob("개발");
