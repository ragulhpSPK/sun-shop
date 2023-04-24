import React, { useState } from "react";
import Sidenavbar from "../shared/Sidenavbar";
import {
  Modal,
  Table,
  Upload,
  Form,
  Input,
  Select,
  Button,
  Tooltip,
  Image,
} from "antd";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import {
  FileAddOutlined,
  InboxOutlined,
  PlusOutlined,
  RedoOutlined,
} from "@ant-design/icons";

function Banner() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [imagename, setImageName] = useState();

  const { Dragger } = Upload;
  const { Option } = Select;

  console.log(imagename);

  const handleFinish = (value) => {
    console.log(value);
  };

  const props = {
    name: "file",
    multiple: true,
    onChange(info) {
      const reader = new FileReader();
      reader.readAsDataURL(info.file.originFileObj);
      reader.onload = () => {
        setImageName(reader.result);
        // console.log(reader.result);
      };
    },
    showUploadList: true,

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const columns = [
    {
      title: "Product Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "IMAGE",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Banner",
      dataIndex: "banner",
      key: "banner",
    },
    {
      title: "Update",
      render: (value) => {
        return (
          <div className="flex gap-x-5">
            <EditNoteOutlinedIcon className="text-green-500 !cursor-pointer" />
          </div>
        );
      },
    },
    {
      title: "Delete",
      render: (value) => {
        return (
          <div className="flex gap-x-5">
            <DeleteOutlineOutlinedIcon className="text-red-500 !cursor-pointer" />
          </div>
        );
      },
    },
  ];
  return (
    <div className="flex pt-5">
      <div>
        <Sidenavbar />
      </div>
      <div className="w-[80vw] pl-5 relative  pt-20">
        <div onClick={() => setOpen(!open)}>
          <FileAddOutlined className="!text-[#943074] !bg-white !text-2xl float-right mr-[1vw]" />
        </div>

        <Table className="pt-4" columns={columns} />
      </div>

      <Modal open={open} footer={false}>
        <Form onFinish={handleFinish}>
          <Form.Item name="image" rules={[{ required: true }]}>
            <Select size="large" placeholder="Select Image here">
              <Option></Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Tooltip>
              {imagename ? (
                <div className="flex flex-row-reverse justify-start gap-x-10">
                  <Tooltip
                    onClick={() => setImageName("")}
                    title="change image"
                    className="!cursor-pointer !text-red-500"
                  >
                    <RedoOutlined />
                  </Tooltip>
                  <Image src={imagename} className=" w-[100%]" />
                </div>
              ) : (
                <Dragger {...props} multiple={true}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag category image to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single upload.
                  </p>
                </Dragger>
              )}
            </Tooltip>
          </Form.Item>

          <div className="flex gap-5 justify-end ">
            <Button
              type="Primary"
              className="bg-[--third-color] shadow-xl  !text-white"
              onClick={() => setOpen(!open)}
            >
              Cancel
            </Button>
            <Button
              type="Primary"
              className="bg-[--third-color] shadow-xl !text-white"
              htmlType="submit"
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default Banner;
