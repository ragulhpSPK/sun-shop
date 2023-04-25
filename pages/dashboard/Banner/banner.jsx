import React, { useEffect, useState } from "react";
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
  notification,
  message,
} from "antd";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import {
  FileAddOutlined,
  InboxOutlined,
  PlusOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { getAllproducts, createBanner } from "@/helper/utilities/apiHelper";
import { get } from "lodash";

function Banner() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [imagename, setImageName] = useState();
  const [allProducts, setAllProducts] = useState([]);
  const [productId, setProductId] = useState([]);

  const { Dragger } = Upload;
  const { Option } = Select;

  const fetchData = async () => {
    try {
      const result = await getAllproducts();

      setAllProducts(get(result, "data.data", []));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFinish = async (value) => {
    console.log(value);
    try {
      const formData = {
        data: {
          image: imagename,
          name: value.name,
          productid: value.productid,
        },
      };
      await createBanner(formData);
      notification.success({ message: "Banner created successfully" });
    } catch (err) {
      notification.error({ message: "something went wrong" });
    }
  };

  const props = {
    name: "file",
    multiple: true,
    onChange(info) {
      const reader = new FileReader();
      reader.readAsDataURL(info.file.originFileObj);
      reader.onload = () => {
        setImageName(reader.result);
      };
    },
    showUploadList: true,

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const columns = [
    {
      title: "IMAGE",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Banner Name",
      dataIndex: "banner",
      key: "banner",
    },
    // {
    //   title: "Product name",
    //   dataIndex: "product",
    //   key: "product",
    // },
    {
      title: "Product Id",
      dataIndex: "productid",
      key: "productid",
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

  // const handlevalue = (value) => {
  //   console.log("pro", value);
  // };
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
          <Form.Item name="name" rules={[{ required: true }]}>
            <Input size="large" placeholder="Enter Banner Name" />
          </Form.Item>
          <Form.Item name="productid" rules={[{ required: true }]}>
            <Select
              size="large"
              placeholder="Select product name here"
              onChange={(e) => setProductId(e)}
            >
              {allProducts.map((data) => {
                return (
                  <Option value={data._id} key={data._id}>
                    {data.title}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          {/* <Form.Item name="Product Id" rules={[{ required: true }]}>
            {/* <Input
              size="large"
              value={productId}
              placeholder="Enter product Id"
            /> */}

          {/* <Select size="large">
              <Option value={productId}>{productId}</Option>
            </Select>
          </Form.Item>  */}
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
