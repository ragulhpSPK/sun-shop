import React from "react";
import AdminNavbar from "../shared/AdminNavbar";
import Sidenavbar from "../shared/Sidenavbar";

function Topproducts() {
  return (
    <div>
      <div className="flex flex-col">
        <div>
          <AdminNavbar />
        </div>
        <div className="flex">
          <Sidenavbar />
          <div>top</div>
        </div>
      </div>
    </div>
  );
}

export default Topproducts;
