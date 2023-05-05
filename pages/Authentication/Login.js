import React, { useState } from "react";
import { Form, Input, Button, Image } from "antd";
import Register from "./Register";

function Login() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  return (
    <div>
      {!open ? (
        <div className="pt-[5vh]">
          <div className="w-[50vw] h-[40vh] m-auto shadow-lg ">
            <div className="flex ">
              <div className="w-[22vw] h-[40vh] backdrop-blur-sm rounded-md bg-[--third-color] flex flex-col items-center justify-center">
                <h1 className="text-white text-xl w-[60%] ">
                  Login With Your Mobile Number Via OTP...
                </h1>
                <Image
                  src="/assets/login2.png"
                  alt="logo"
                  width={200}
                  height={200}
                />
              </div>
              <div className="w-[30vw] h-[40vh] flex  flex-col rounded-md  justify-between pl-[2vw] pt-[8vh]">
                <Form
                  style={{ maxWidth: 500 }}
                  form={form}
                  name="control-hooks"
                >
                  <Form.Item
                    name="number"
                    label="Phone Number"
                    rules={[
                      { required: true, message: "Please Enter Your Number" },
                    ]}
                    style={{ fontSize: "30px", color: "red" }}
                  >
                    <Input
                      size="large"
                      placeholder="+91 9839288383"
                      className="!w-[15vw]"
                    />
                  </Form.Item>
                  <p className="text-md !w-[25vw] text-base font-medium">
                    Secure access to our e-commerce platform by
                    {/* <a className="text-blue-600">Terms of Use</a> and &nbsp; */}
                    &nbsp;
                    <a className="text-blue-600">Our Privacy Policy</a>
                    &nbsp; before Register in.
                  </p>
                  <Form.Item>
                    <Button
                      className="bg-[--third-color] !w-[22vw] h-[5vh] !mt-[15px] text-xl -tracking-tighter !text-white hover:!border-none hover:!scale-105 duration-1000"
                      htmlType="submit"
                    >
                      Request Otp
                    </Button>
                  </Form.Item>
                </Form>
                <div className="pb-[10px] m-auto w-[24vw]">
                  <a
                    className="text-blue-600 font-medium"
                    onClick={() => {
                      setOpen(!open);
                    }}
                  >
                    New to Sun? Create new account
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Register />
        </div>
      )}
    </div>
  );
}

export default Login;
