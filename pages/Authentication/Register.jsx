/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Modal, Form, Input, Button, Image, notification } from "antd";

import { useState } from "react";
import { authHandler, createMessage, getOneUer } from "../../helper/utilities/apiHelper";
import OtpInput from "react-otp-input";
import styles from "../../styles/Home.module.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentication } from "../../components/firebase/firebase";
import { useEffect } from "react";
import { get, isEmpty } from "lodash";
import Cookies from "js-cookie";
import { excrypt } from "@/helper/shared";
import { useRouter } from "next/router";



function Register({ setLogin }) {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState();
  const [expandForm, setExpandForm] = useState(false);
  const [numbers, setNumbers] = useState();
  const router = useRouter();
  const [formModal, setFormModal] = useState(false);

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
      const result = await getOneUer();
      console.log(result);
      setNumbers(get(result, "data.message"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // fetchData();
  }, []);

  console.log(phoneNumber);

  const requestOTP = async (e) => {
    setLogin(false);
    setExpandForm(true);
    
    // e.preventDefault();
    // if (phoneNumber.length >= 12) {
    //   setExpandForm(true);
    //   generateRecaptchaVerifier();
    //   let appVerfier = window.recaptchaVerifier;
    //   signInWithPhoneNumber(authentication, phoneNumber, appVerfier)
    //     .then((confirmationResult) => {
    //       window.confirmationResult = confirmationResult;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
  };

  const verifyOtp = async () => {
    if (otp.length === 6) {
      const result = await getOneUer(phoneNumber);
      console.log(result,"jehrlekh")
    if (isEmpty(result.data.message)) { 
      setFormModal(true);
    } else {
      await authHandler({number:phoneNumber});
      notification.success({message:"Continue to shop"})
    }
      setExpandForm(false);
      
    }
    // try {
    //   if (otp.length === 6) {
    //     let confirmationResult = window.confirmationResult;
    //     const result = await confirmationResult.confirm(otp);
    //     await createMessage({ number: get(result, "user.phoneNumber", "") });
    //     Cookies.set(
    //       "profie",
    //       JSON.stringify(excrypt(get(result, "user.phoneNumber", "")))
    //     );
    //     notification.success({ message: "data added successfully" });
    //   }
    // } catch (err) {
    //   router.push("/");
    //   console.log(err);
    //   notification.error({ message: "Something went wrong" });
    // }
  };

  useEffect(() => {
    verifyOtp();
  }, [otp]);
  const handleSubmit = async (values) => {
    try {
      await authHandler(values);
      setFormModal(false);
      notification.success({message:"Continue to shop"})
    } catch (err) {
      notification.error({message: "something went wrong"});
  }
}
  return (
    <div>
      <div className="pt-[5vh]">
        <div className="w-[50vw] h-[40vh] m-auto shadow-lg">
          <div className="flex ">
            <div className="w-[25vw] h-[40vh] backdrop-blur-sm bg-[--third-color] rounded-md flex flex-col items-center justify-center">
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
            <div className="w-[40vw] h-[40vh] flex rounded-md  flex-col items-center justify-between   pl-[2vw] pr-[2vw]">
              <Form style={{ maxWidth: 500 }} form={form} name="control-hooks">
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
                  className="ml-[-225px]"
                >
                  <Input
                    size="large"
                    placeholder="+91 9839288383"
                    className="!w-[15vw]"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                    className={` bg-[--third-color] !w-[22vw] h-[5vh] !mt-[15px] text-xl -tracking-tighter !text-white hover:!border-none hover:!scale-105 duration-1000`}
                    htmlType="submit"
                    style={{ color: "white" }}
                    onClick={requestOTP}
                  >
                    Request Otp
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={expandForm}
        footer={false}
        header={false}
        onCancel={() => setExpandForm(!expandForm)}
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
      <Modal open={formModal} footer={false}>
        <div className="flex flex-col justify-center">
          <Form form={form} size="small" layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="firstName" label="Name" rules={[
                  { required: true, message: "Please Enter Your Name" },
                  ]}>
              <Input placeholder="Enter Your Name" />
            </Form.Item            >
             <Form.Item name="number" label="Mobile Number" rules={[
                  { required: true, message: "Please Enter Your Mobile Number" },
                  ]}>
              <Input placeholder="Enter Your  Mobile number" value={phoneNumber}/>
            </Form.Item>
            <Form.Item name="alternateNumber" label={<span>Alternate Mobile number <span className="text-slate-400">(optional)</span></span>} rules={[
                  { message: "Please Enter Your Alternate Mobile number" },
                  ]}>
              <Input placeholder="Enter Your Alternate Mobile number" />
            </Form.Item>
            <Form.Item name="email" label={<span>Email Address <span className="text-slate-400">(optional)</span></span>} rules={[
                  { message: "Please Enter Your Email Address" },
                  ]}>
              <Input placeholder="Enter Your Alternate Mobile number" />
            </Form.Item>
            <Form.Item name="address" label={<span>Address</span>} rules={[
                  { required:true, message: "Please Enter Your Address" },
                  ]}>
              <TextArea placeholder="Enter Your Address" />
            </Form.Item>
            <Button htmlType="submit"  className="w-[100%] !h-[4vh]"><span className="text-black">Continue to Shop now</span></Button>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default Register;
