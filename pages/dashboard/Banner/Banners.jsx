import React, { useState, useEffect } from "react";
import {
  CloseCircleOutlined,
  EllipsisOutlined,
  SettingOutlined,
  InboxOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Input,
  Modal,
  Select,
  Form,
  Tooltip,
  Upload,
  notification,
  Image,
  Skeleton,
} from "antd";

import CloseIcon from "@mui/icons-material/Close";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import {
  getAllproducts,
  createBanner,
  getAllBanner,
  updateBanner,
  deleteBanner,
} from "@/helper/utilities/apiHelper";
import { get } from "lodash";
import Sidenavbar from "../shared/Sidenavbar";
import AdminNavbar from "../shared/AdminNavbar";

function Banner() {
  const { Dragger } = Upload;

  const [allProducts, setAllProducts] = useState([]);
  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagename, setImageName] = useState();
  const [productId, setProductId] = useState([]);
  const [updateid, setUpdateId] = useState("");
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;


  

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = [await getAllproducts(), await getAllBanner()];
      setAllProducts(get(result, "[0].data.data", []));
      setBanner(get(result, "[1].data.data", []));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFinish = async (value) => {
    if (updateid === "") {
      setLoading(true);
      try {
        const formData = {
          data: {
            image: imagename,
            name: value.name,
            productid: productId,
            productname: allProducts.filter((data) => {
              return data._id == productId;
              // if (data._id == productId) console.log(data.title);
            })[0].title,
          },
        };
        await createBanner(formData);
        setOpen(false);
        fetchData();
        setLoading(false);
        setImageName("");
        form.resetFields();
        notification.success({ message: "Banner created successfully" });
      } catch (err) {
        notification.error({ message: "something went wrong" });
      }
    } else {
      try {
        setLoading(true);
        const formData = {
          data: {
            image: imagename,
            name: value.name,
            productid: productId,
            productname: allProducts.filter((data) => {
              return data._id == productId;
              // if (data._id == productId) console.log(data.title);
            })[0].title,
          },
          id: updateid,
        };
        await updateBanner(formData);
        fetchData();
        setLoading(false);
        setImageName("");
        notification.success({ message: "Banner updated successfully" });
      } catch (err) {
        notification.error({ message: "something went wrong" });
      }
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

  const handleEdit = (data) => {
    setOpen(!open);
    form.setFieldsValue(data);
    console.log(data);
    setImageName(data.image);
  };

  const handleDelete = () => {
    try {
      deleteBanner(updateid);
      fetchData();
      setLoading(false);
      notification.success({ message: "Banner deleted successfully" });
    } catch (err) {
      notification.error({ message: "something went wrong" });
    }
  };

  return (
    <div className="flex flex-col gap-[5px]">
      <div>
        <AdminNavbar />
      </div>
      <div className="flex gap-[18px] items-start justify-start">
        <div>
          <Sidenavbar />
        </div>
        <div className="w-[80vw] flex flex-col pt-[5vh]">
          <div
            className=" bg-white shadow-lg p-2 float-right self-end"
            onClick={() => setOpen(!open)}
          >
            <AddOutlinedIcon className="text-[--third-color] mr-2" />
          </div>

          <div className="mt-5 grid grid-cols-5  gap-14 justify-start">
            {banner.map((data) => {
              return (
                <Skeleton
                  active
                  loading={loading ? true : false}
                  key={data._id}
                >
                  <Card className="w-[11vw] h-[25vh] relative shadow-lg">
                    <EditNoteOutlinedIcon
                      className="absolute right-8 top-[3px] text-[--third-color]"
                      onClick={() => {
                        setUpdateId(data._id);
                        handleEdit(data);
                      }}
                    />
                    <CloseIcon
                      className=" absolute right-0 top-0 pr-2 font-bold text-3xl text-[--third-color]"
                      onClick={() => {
                        setUpdateId(data._id);
                        handleDelete();
                      }}
                    />
                    <div className="text-center h-[10vh] pt-[8px] ">
                      <Image
                        src={data.image}
                        alt="not found"
                        className=" !w-[5vw]"
                      />
                    </div>

                    <div>
                      <h1 className="text-center">{data.name}</h1>
                    </div>
                    <div className="flex justify-between h-[3vh]">
                      <p className="text-[12px]">{data.productname}</p>
                      <p className="text-[12px] pl-3">{data.productid}</p>
                    </div>
                    <div className="m-auto w-[11vw] pl-8 pt-5">
                      <Button type="link" className="bg-[--third-color] hover:bg-[#780c78] !hover:text-[#000] hover:scale-95 duration-1000">
                        View More
                      </Button>
                    </div>
                  </Card>
                </Skeleton>
              );
            })}
          </div>
        </div>
        <Modal open={open} footer={false} destroyOnClose>
          <Form form={form} onFinish={handleFinish}>
            <Form.Item name="name" rules={[{ required: true }]}>
              <Input size="large" placeholder="Enter Banner Name" />
            </Form.Item>
            <Form.Item name="productname" rules={[{ required: true }]}>
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
                    <Image
                      src={imagename}
                      className="!w-[5vw]"
                      alt="not found"
                    />
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
                onClick={() => {
                  form.resetFields();
                  setOpen(!open);
                  setUpdateId("");
                }}
              >
                Cancel
              </Button>
              <Button
                type="Primary"
                className="bg-[--third-color] shadow-xl !text-white"
                htmlType="submit"
                onClick={() => setOpen(!open)}
              >
                {updateid === "" ? "Save" : "Update"}
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default Banner;
