import React from "react";
import { Modal, Form, Input, Button, Image, notification } from "antd";
import Login from "./Login";
import { useState } from "react";
// import { createMessage } from "../../helper/utilities/apiHelper";
import OtpInput from "react-otp-input";
import styles from "../../styles/Home.module.css";
import  auth  from "../firebaseConfig"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


function Register() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [otp, setOtp] = useState(false);
  const [otpId, setOtpId] = useState(636363);
  const [values, setvalues] = useState("");

  console.log(auth.currentUser)

  const handleFinish = async () => {
    // try {
    //   await createMessage(value);
    //   notification.success({ message: "data added successfully" });
    // } catch (err) {
    //   notification.error({ message: "Something went wrong" });
    // }

    try {
      const recaptchaVerifier = new  RecaptchaVerifier("recaptcha", {}, auth.config)
      console.log(recaptchaVerifier)
      const confirmation = await signInWithPhoneNumber(auth.config, values, recaptchaVerifier)
      console.log(confirmation,"erhu")
    } catch (err) {
      console.log(err)
    }
   
  };

 

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
              <div className="w-[30vw] h-[40vh] flex rounded-md  flex-col items-center justify-between  pt-[8vh] pl-[2vw] pr-[2vw]">
                <Form
                  style={{ maxWidth: 500 }}
                  form={form}
                  name="control-hooks"
                  onFinish={handleFinish}
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
                      onChange={(e) => {
                        setvalues(e.target.value);
                      }}
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
                      onClick={() => {
                        values.length === 0 ? setOtp(false) : setOtp(true);
                      }}
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
        open={otp}
        footer={false}
        header={false}
        onCancel={() => setOtp(!otp)}
        className="!w-[24vw] position top-[25vh] left-[10vw]"
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
            value={otpId}
            onChange={setOtp}
            numInputs={6}
            otpType="number"
            disabled={false}
            autoFocus
            className={styles.opt_container}
            // renderSeparator={<span className="relative ">_ </span>}
            renderInput={(props) => (
              <input {...props} className="border-2 px-4 py-2 mr-[8px]" />
            )}
          ></OtpInput>
          <button className="bg-[--third-color] w-full flex gap-1 items-center justify-center py-2.5 text-white rounded">
            <span>Verify OTP</span>
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Register;
