import React, { useEffect } from "react";
import Header from "./Header/Header";
import Body from "./Body/Body";
import axios from "axios";
import { Cheerio } from "cheerio";
import { useSelector } from "react-redux";

function MainPage() {
  return (
    <div style={{ backgroundColor: "#fafafae1" }}>
      <Header />
      <Body />
    </div>
  );
}

export default MainPage;
