import { useSelector } from "react-redux";
import tagReducer from "redux/reducers/tagReducer";

const axios = require("axios");
const cheerio = require("cheerio");
const { useState, useEffect } = require("react");

export default function Crawling() {
  const [jobs, setJobs] = useState([]);
  const setTages = useSelector((state) => state.tag.selectedTag);
  let selectedTag = "";
  setTages.forEach((tag) => {
    if (tag.selected) selectedTag = tag.name;
  });
  console.log(selectedTag);
  const getHtml = async (keyword) => {
    try {
      return await axios.get(
        `https://www.jobkorea.co.kr/Search/?stext=${encodeURI(keyword)}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  const parsing = async (page) => {
    const $ = cheerio.load(page.data);
    const jobs = [];
    const $jobList = $(".post");
    $jobList.each((idx, node) => {
      const jobTitle = $(node).find(".title:eq(0)").text().trim();
      const company = $(node).find(".name:eq(0)").text().trim();
      const experience = $(node).find(".exp:eq(0)").text().trim();
      const education = $(node).find(".exp:eq(0)").text().trim();
      const regularYN = $(node).find(".option>span:eq(2)").text().trim();
      const region = $(node).find(".long:eq(0)").text().trim();
      const dueDate = $(node).find(".date:eq(0)").text().trim();
      const etc = $(node).find(".etc:eq(0)").text().trim();

      jobs.push({
        jobTitle,
        company,
        experience,
        education,
        regularYN,
        region,
        dueDate,
        etc,
      });
      setJobs(jobs);
    });
  };

  const getJob = async (keyword) => {
    const html = await getHtml(keyword);
    const jobs = await parsing(html);
  };

  useEffect(() => {
    getJob(selectedTag);
  }, []);

  return (
    <div>
      {jobs.map((job) => {
        return (
          <div style={{ width: "100vw", height: "", border: "solid" }}>
            <div style={{ fontWeight: "700", fontSize: "18px" }}>
              {job.jobTitle}
            </div>
            <div style={{ fontWeight: "700", fontSize: "16px" }}>
              {job.company}
            </div>
            <div>{job.experience}</div>
            <div>{job.education}</div>
            <div>{job.regularYN}</div>
            <div>{job.region}</div>
            <div>{job.dueDate}</div>
            <div>{job.etc}</div>
          </div>
        );
      })}
    </div>
  );
}
