import { Avatar } from "@mui/material";
import React from "react";

const AdminNavbar = () => {
  return (
    <div className="flex items-center justify-between h-[8vh] p-10 shadow">
      <img src="/assets/sunn.png" alt="logo" className="w-[60px]" />
      <div className="cursor-pointer">
        <Avatar
          sx={{ width: 24, height: 24 }}
          src="https://www.diethelmtravel.com/wp-content/uploads/2016/04/bill-gates-wealthiest-person.jpg"
        ></Avatar>
      </div>
    </div>
  );
};

export default AdminNavbar;
