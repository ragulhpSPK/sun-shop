import React, { useEffect, useState } from "react";
import AdminNavbar from "../shared/AdminNavbar";
import Sidenavbar from "../shared/Sidenavbar";
import { Select, Table } from "antd";
import { getAllOrder } from "../../../helper/utilities/apiHelper";
import { get } from "lodash";

function Order() {
  const [order, setOrder] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  const fetchData = async () => {
    try {
      const result = await getAllOrder();
      setOrder(get(result, "data.data", []));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "OrderId",
      dataindex: "orderId",
      key: "orderId",
      render: (name) => {
        return <p>{name.orderId}</p>;
      },
    },
    {
      title: "Customer Name",
      dataindex: "customer",
      key: "customer",
      render: (name) => {
        console.log(name);
        return <p>{name.customer}</p>;
      },
    },
    {
      title: "Address",
      dataindex: "address",
      key: "address",
      render: (name) => {
        return <p>{name.address}</p>;
      },
    },
    {
      title: "Total Price",
      dataindex: "total",
      key: "total",
      render: (name) => {
        return <p>{name.total}</p>;
      },
    },
    {
      title: "Order Status",
      dataindex: "status",
      key: "status",
      render: (name) => {
        return (
          <Select placeholder="Select order status" className="w-[8vw]">
            <Select.Option>Shipped</Select.Option>
          </Select>
        );
      },
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

        <div className="w-[80vw]">
          <Table
            className="m-auto w-[80vw]"
            columns={columns}
            dataSource={order}
          />
        </div>
      </div>
    </div>
  );
}

export default Order;
