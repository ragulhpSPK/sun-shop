import { EditOutlined } from "@ant-design/icons";
import { Drawer, Form, Input, Button, Avatar, Descriptions } from "antd";
import React from "react";
import { useState } from "react";

function Profile() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const [form] = Form.useForm();
  const { TextArea } = Input;

  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className="w-[50vw]">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setOpenDrawer(true);
          }}
          type="primary"
          className="flex flex-row gap-x-1 items-center"
        >
          <EditOutlined />
          <div> Edit</div>
        </Button>
      </div>
      <Descriptions title={<div className="!text-2xl">Profile</div>}>
        <Descriptions.Item label="Name">Zhou Maomao</Descriptions.Item>
        <Descriptions.Item label="Mobile Number">9876543210</Descriptions.Item>
        <Descriptions.Item label="Email">Hangzhou, Zhejiang</Descriptions.Item>
        <Descriptions.Item label="Address">
          No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item>
      </Descriptions>
      <Drawer
        open={openDrawer}
        width={500}
        onClose={() => setOpenDrawer(false)}
      >
        <Form
          form={form}
          size="small"
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="firstName"
            label="Name"
            rules={[{ required: true, message: "Please Enter Your Name" }]}
          >
            <Input placeholder="Enter Your Name" />
          </Form.Item>
          <Form.Item
            name="number"
            label="Mobile Number"
            rules={[
              { required: true, message: "Please Enter Your Mobile Number" },
            ]}
          >
            <Input placeholder="Enter Your  Mobile number" />
          </Form.Item>
          <Form.Item
            name="alternateNumber"
            label={
              <span>
                Alternate Mobile number{" "}
                <span className="text-slate-400">(optional)</span>
              </span>
            }
            rules={[{ message: "Please Enter Your Alternate Mobile number" }]}
          >
            <Input placeholder="Enter Your Alternate Mobile number" />
          </Form.Item>
          <Form.Item
            name="email"
            label={
              <span>
                Email Address <span className="text-slate-400">(optional)</span>
              </span>
            }
            rules={[{ message: "Please Enter Your Email Address" }]}
          >
            <Input placeholder="Enter Your Alternate Mobile number" />
          </Form.Item>
          <Form.Item
            name="address"
            label={<span>Address</span>}
            rules={[{ required: true, message: "Please Enter Your Address" }]}
          >
            <TextArea placeholder="Enter Your Address" />
          </Form.Item>
          <Button
            htmlType="submit"
            className="w-[100%] m-auto !h-[5vh] !bg-[--second-color] hover:scale-95 hover:bg-[--fifth-color] hover:duration-1000"
          >
            <span className="text-white text-lg tracking-wider">Save</span>
          </Button>
        </Form>
      </Drawer>
    </div>
    // <div className="w-[85vw]  h-[90vh]">
    //   <div className="w-[50vw] p-[5vw]">
    //     <div>
    //       <div className="text-2xl">
    //         <h1> Customer Name </h1>
    //       </div>
    //       <div className="text-2xl">
    //         <h1>Email Addrss</h1>
    //       </div>
    //       <div className="text-2xl">
    //         <h1>Mobile Number</h1>
    //       </div>
    //       <div className="text-xl">
    //         <p>Address</p>
    //         <p>abcdefgh</p>
    //         <p>abcdefgh</p>
    //         <p>abcdefgh</p>
    //       </div>
    //     </div>
    //     <div className="flex items-center">
    //       <p className="text-xl">Edit Address</p>
    //       <EditOutlined
    //         style={{ fontSize: "20px" }}
    //         onClick={() => {
    //           setOpenDrawer(true);
    //         }}
    //       />
    //     </div>

    //   </div>
    // </div>
  );
}

export default Profile;
