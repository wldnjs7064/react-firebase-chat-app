import Header from "components/MainPage/Header/Header";
import { useSelector } from "react-redux";
import * as S from "../MainPage/style";
import styled from "styled-components";

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

  switch (selectedTag) {
    case "FE":
      selectedTag = "프론트엔드";
      break;
    case "BE":
      selectedTag = "백엔드";
      break;
    case "AI":
      selectedTag = "AI";
      break;
    case "GAME":
      selectedTag = "게임개발";
      break;
    case "PM":
      selectedTag = "기획자";
      break;

    default:
      selectedTag = "개발";
  }
  const getHtml = async (keyword) => {
    try {
      return await axios.get(
        `https://www.jobkorea.co.kr/Search/?stext=${encodeURI(
          keyword
        )}&tabType=recruit&Page_No=1`
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

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  return (
    <div>
      <Header />
      <S.Body>
        <JobInfoes>
          {jobs.map((job) => {
            return (
              <JobInfo>
                <Title style={{ fontSize: "13px" }}>{job.company}</Title>
                <Content>
                  <div style={{ fontWeight: "700", fontSize: "16px" }}>
                    {truncate(job.jobTitle, 90)}
                  </div>
                  <Detail>
                    <div>{job.education}</div>
                    <div>{job.regularYN}</div>
                    <div>{job.region}</div>
                    <div>{job.dueDate}</div>
                  </Detail>
                  <div
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {job.etc}
                  </div>
                </Content>
              </JobInfo>
            );
          })}
        </JobInfoes>
      </S.Body>
    </div>
  );
}
const Detail = styled.div`
  display: flex;
  flex-direction: row;
  width: 970px;
  align-items: center;
  gap: 10px;
`;
const Title = styled.div`
  width: 200px;
  justify-content: center;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 970px;
  padding: 0 10px;
`;
const JobInfoes = styled.div`
  width: 1170px;
  height: 100vh;
  justify-content: center;
  align-items: center;
  border-top: solid thin #cccccc;
  /* border-bottom: solid thin; */
  color: #343434;
`;

const JobInfo = styled.div`
  display: flex;
  flex-direction: row;
  height: 130px;
  justify-content: center;
  align-items: center;
  border-bottom: solid thin #cccccc;
`;