import React from "react";
import Sidenavbar from "./shared/Sidenavbar";

const Home = () => {
  return (
    <div className="flex flex-row">
      <div>
        <Sidenavbar />
      </div>
      <div>home</div>
    </div>
  );
};

export default Home;
