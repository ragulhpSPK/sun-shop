/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Modal, Form, Input, Button, Image, notification } from "antd";
// import Login from "./Login";
import { useState } from "react";
import { createMessage, getAllMessage } from "../../helper/utilities/apiHelper";
import OtpInput from "react-otp-input";
import styles from "../../styles/Home.module.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentication } from "../../components/firebase/firebase";
import { useEffect } from "react";
import { get } from "lodash";
import Cookies from "js-cookie";
import { excrypt } from "@/helper/shared";
import { useRouter } from "next/router";
import { Label } from "@mui/icons-material";
// import TextArea from "antd/es/input/TextArea";

function Login() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState();
  const [expandForm, setExpandForm] = useState(false);
  const [numbers, setNumbers] = useState();
  const [profile, setProfile] = useState(false);
  const router = useRouter();

  const generateRecaptchaVerifier = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptacha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentication
    );
  };

  const fetchData = async () => {
    try {
      const result = await getAllMessage();

      setNumbers(get(result, "data.message"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(phoneNumber);

  const requestOTP = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 12) {
      setExpandForm(true);
      generateRecaptchaVerifier();
      let appVerfier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, phoneNumber, appVerfier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // const verifyOtp = async () => {
  //   try {
  //     if (otp.length === 6) {
  //       let confirmationResult = window.confirmationResult;
  //       const result = await confirmationResult.confirm(otp);
  //       await createMessage({ number: get(result, "user.phoneNumber", "") });
  //       // Cookies.set(
  //       //   "profie",
  //       //   JSON.stringify(excrypt(get(result, "user.phoneNumber", "")))
  //       // );
  //       notification.success({ message: "data added successfully" });
  //     }
  //   } catch (err) {
  //     router.push("/");
  //     console.log(err);
  //     notification.error({ message: "Something went wrong" });
  //   }
  // };
  const verifyOtp = async () => {
    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      const result = await confirmationResult.confirm(otp);
      if (get(result, "user.phoneNumber", "") === phoneNumber) {
        setProfile(true);
        setExpandForm(false);
        setPhoneNumber(get(result, "user.phoneNumber", ""));
      }
    }
  };

  useEffect(() => {
    verifyOtp();
  }, [otp]);

  const handleFinish = (value) => {
    console.log(value);
  };

  return (
    <div>
      <div className={`${profile === true ? "hidden" : "block"} `}>
        <div className="pt-[5vh]">
          <div className="h-[40vh]">
            <div className="flex justify-around">
              <div className=" h-[40vh] backdrop-blur-sm bg-[--third-color] rounded-md flex flex-col items-center justify-center">
                <h1 className="text-white text-xl w-[60%] ">
                  Register With Your Mobile Number Via OTP...
                </h1>
                <Image
                  src="/assets/login2.png"
                  alt="logo"
                  width={200}
                  height={200}
                  preview={false}
                />
              </div>
              <div className=" flex rounded-md  flex-col  gap-y-20">
                <Form form={form} name="control-hooks" layout="vertical">
                  <Form.Item
                    name="number"
                    label="Phone Number"
                    rules={[
                      { required: true, message: "Please Enter Your Number" },
                    ]}
                    style={{
                      fontSize: "30px",
                      color: "red",
                    }}
                  >
                    <Input
                      size="large"
                      placeholder="+91 9839288383"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </Form.Item>

                  <Button
                    className={`w-[100%] bg-[--third-color]  h-[5vh] text-xl -tracking-tighter !text-white hover:!border-none hover:!scale-105 duration-1000`}
                    htmlType="submit"
                    style={{ color: "white" }}
                    onClick={requestOTP}
                  >
                    Request Otp
                  </Button>
                </Form>
                <p className="text-md  text-base font-medium">
                  Secure access to our e-commerce platform by
                  {/* <a className="text-blue-600">Terms of Use</a> and &nbsp; */}
                  &nbsp;
                  <a className="text-blue-600">Our Privacy Policy</a>
                  &nbsp; before Register in.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Modal
          open={expandForm}
          footer={false}
          header={false}
          className="!w-[24vw] absolute top-[22vh] right-[30vw]"
        >
          <div
            className={`
           
          w-[20vw] h-[15vw] bg-white rounded-md flex flex-col justify-around items-center`}
          >
            <label
              htmlFor="otp"
              className="font-bold text-xl text-black text-center "
            >
              Enter your OTP
            </label>
            <OtpInput
              value={otp}
              onChange={(value) => {
                setOtp(value);
              }}
              numInputs={6}
              otpType="number"
              disabled={false}
              autoFocus
              renderInput={(props) => (
                <input {...props} className="border-2 h-10 !w-8 ml-2" />
              )}
            ></OtpInput>
            {/* <button
            className="bg-[--third-color] w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
            // onClick={handleFinish}
          >
            <span>Verify OTP</span>
          </button> */}
          </div>
        </Modal>
        <div id="recaptacha-container"></div>
      </div>

      <div className={`${profile === true ? "block" : "hidden"}`}>
        <Form
          className="w-[30vw] m-auto flex flex-col"
          layout="vertical"
          form={form}
          onFinish={handleFinish}
        >
          <Form.Item label="First Name" className="!text-2xl" name="firstName">
            <Input placeholder="Enter First Name" />
          </Form.Item>
          <Form.Item label="Last  Name" name="lastName">
            <Input placeholder="Enter Last Name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Enter Your Email" />
          </Form.Item>
          <Form.Item label="Number" name="number1">
            <Input placeholder="Enter Your Number" />
          </Form.Item>
          <Form.Item label="Alternate Number" name="number2">
            <Input placeholder="Enter Your Alternate Number" />
          </Form.Item>
          <Form.Item label="Address">
            <Input.TextArea placeholder="Write Your Address here"></Input.TextArea>
          </Form.Item>
          <div className="flex justify-between">
            <Button className=" !bg-[--second-color] !h-[4vh]">
              May Be Later
            </Button>
            <Button className=" !bg-[--second-color] !h-[4vh] !w-[6vw]">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
