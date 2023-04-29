import React from "react";
import AdminNavbar from "../shared/AdminNavbar";
import Sidenavbar from "../shared/Sidenavbar";
import { Table } from "antd";

function order() {
  const columns = [
    {
      title: "OrderId",
      dataindex: "order",
      key: "order",
    },
    {
      title: "Customer Name",
      dataindex: "customer",
      key: "customer",
    },
    {
      title: "Address",
      dataindex: "address",
      key: "address",
    },
    {
      title: "Total Price",
      dataindex: "price",
      key: "price",
    },
    {
      title: "Order Status",
      dataindex: "status",
      key: "status",
    },
  ];
  return (
    <div className="flex flex-col">
      <div>
        <AdminNavbar />
      </div>
      <div className="flex">
        <div>
          <Sidenavbar />
        </div>

        <div className="w-[90vw]">
          <Table className="m-auto w-[90vw]" columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default order;
