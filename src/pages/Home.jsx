import React from "react";
import HomeMap from "../components/map/HomeMap"; // 여러 좌표 표시
import HomeHeader from "../components/header/HomeHeader";
import RandomModal from "../components/modal/RandomModal";

const Home = () => {
  return (
    <div>
      <HomeHeader />
      <HomeMap />
      {/* <RandomModal /> */}
    </div>
  );
};

export default Home;
