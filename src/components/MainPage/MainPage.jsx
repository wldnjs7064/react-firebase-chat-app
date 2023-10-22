import React from "react";
import Header from "./Header/Header";
import Body from "./Body/Body";
import axios from "axios";
import { Cheerio } from "cheerio";
import { getJob } from "crawling";

function MainPage() {
  getJob("개발");

  return (
    <div style={{ backgroundColor: "#fafafae1" }}>
      <Header />
      <Body />
    </div>
  );
}

export default MainPage;
