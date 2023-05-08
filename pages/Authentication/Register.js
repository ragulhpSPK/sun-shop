/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Modal, Form, Input, Button, Image, notification } from "antd";
import Login from "./Login";
import { useState } from "react";
import { createMessage } from "../../helper/utilities/apiHelper";
import OtpInput from "react-otp-input";
import styles from "../../styles/Home.module.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentication } from "../../components/firebase/firebase";
import { useEffect } from "react";

function Register() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [otp, setOtp] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState();
  const [expandForm, setExpandForm] = useState(false);
  const [number, setNumber] = useState("");

  const handleFinish = async () => {
    console.log("clicked");
    if (number.length >= 12) {
      try {
        await createMessage(number);
        notification.success({ message: "data added successfully" });
      } catch (err) {
        console.log(err);
        notification.error({ message: "Something went wrong" });
      }
    }
  };

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

  const verifyOtp = () => {
    if (otp.length === 6) {
      console.log("trigger");
      let confirmationResult = window.confirmationResult;
      confirmationResult.confirm(otp).then((result) => {
        const user = result.user;
        console.log(user.phoneNumber, "288");
        setNumber(user.phoneNumber);
      });
    }
  };

  useEffect(() => {
    verifyOtp();
  }, [otp]);
  console.log(otp.length);
  return (
    <div>
      {!open ? (
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
                <div className="pb-[10px] m-auto w-[22vw]">
                  <a
                    className="text-blue-600 font-medium "
                    onClick={() => {
                      setOpen(!open);
                    }}
                  >
                    Already a registered user? Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}

      <Modal
        open={expandForm}
        footer={false}
        header={false}
        onCancel={() => setExpandForm(!expandForm)}
        className="!w-[24vw] absolute top-[25vh] left-[10vw]"
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
            className={styles.opt_container}
            // renderSeparator={<span className="relative ">_ </span>}
            renderInput={(props) => (
              <input {...props} className="border-2 h-10 !w-8 ml-2" />
            )}
          ></OtpInput>
          <button
            className="bg-[--third-color] w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
            onClick={handleFinish}
          >
            <span>Verify OTP</span>
          </button>
        </div>
      </Modal>
      <div id="recaptacha-container"></div>
    </div>
  );
}

export default Register;
