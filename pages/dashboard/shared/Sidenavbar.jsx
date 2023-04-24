import React, { useState } from "react";
import Link from "next/link";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import { Divider, Menu } from "antd";
import { items } from "./menu";
function Sidenavbar() {
  return (
    <div>
      {" "}
      <div className="shadow">
        <Menu mode="inline" className="!h-[91.5vh] !w-[10vw] " items={items} />
      </div>
    </div>
  );
}

export default Sidenavbar;
