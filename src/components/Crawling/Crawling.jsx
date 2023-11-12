import Header from 'components/MainPage/Header/Header';
import * as S from '../MainPage/style';
import styled from 'styled-components';
import qs from 'qs';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Crawling() {
  const { keyword } = qs.parse(window.location.search.slice(1));
  const [jobs, setJobs] = useState([]);

  const getJob = async (keyword) => {
    const jobs = await axios.get(`https://chibbo.hislogs.com/crawl?keyword=${keyword}`);
    setJobs(jobs.data);
    Promise.resolve();
  };

  useEffect(() => {
    toast.promise(getJob(keyword || '개발'), {
      loading: '검색중...',
      success: '검색 완료!',
      error: '검색 실패!',
    });
  }, [keyword]);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <div>
      <Header />
      <S.Body>
        <JobInfoes>
          {jobs.map((job, i) => {
            return (
              <JobInfo key={i}>
                <Title style={{ fontSize: '13px' }}>{job.company}</Title>
                <Content>
                  <div style={{ fontWeight: '700', fontSize: '16px' }}>
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
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
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
