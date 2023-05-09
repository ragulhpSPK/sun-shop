import React, { useEffect, useState } from "react";
import AdminNavbar from "../shared/AdminNavbar";
import Sidenavbar from "../shared/Sidenavbar";
import { Select, Table, notification } from "antd";
import { getAllOrder, updateOrder } from "../../../helper/utilities/apiHelper";
import { get } from "lodash";

function Order() {
  const [order, setOrder] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [status, setStatus] = useState("");

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

  const handleChangeStatus = async (e) => {
    console.log(e);
    console.log(
      order.filter((data) => {
        return data._id === e;
      })[0]
    );
    console.log(status);
    try {
      const formData = {
        data: {
          status: status,
        },
        id: e,
      };
      await updateOrder(formData);
      notification.success({ message: "status updated successfully" });
    } catch (err) {
      notification.error({ message: "Something went wrong" });
    }
  };

  const columns = [
    {
      title: "CustomerId",
      dataindex: "CustomerId",
      key: "CustomerId",
      render: (name) => {
        return <p>{name.customerId}</p>;
      },
    },
    {
      title: "Customer Name",
      dataindex: "customer",
      key: "customer",
      render: (name) => {
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
          <Select
            placeholder="Select order status"
            className="w-[8vw]"
            onChange={handleChangeStatus}
          >
            <Select.Option value={name._id}>
              {name.status === "pending"
                ? setStatus("shipped") || "shipped"
                : ""}
            </Select.Option>
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
