import React from "react";
import { FaRegSmileBeam } from "react-icons/fa";

function Favorited() {
  return (
    <div>
      <span style={{ display: "flex", alignItems: "center" }}>
        <FaRegSmileBeam style={{ marginRight: "3px" }} />
        FVORITED (1)
      </span>
      <ul style={{ listStyleType: "none", padding: "0" }}></ul>
    </div>
  );
}

export default Favorited;
