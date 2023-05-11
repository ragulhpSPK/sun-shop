import React, { useState, useEffect, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { InboxOutlined, PlusOutlined, RedoOutlined } from "@ant-design/icons";
import FileAddOutlined from "@mui/icons-material/NoteAdd";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Button,
  Divider,
  Input,
  Modal,
  Select,
  Space,
  Form,
  Table,
  notification,
  message,
  Upload,
  Tooltip,
  Drawer,
  Checkbox,
  Radio,
  Switch,
} from "antd";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";

import Sidenavbar from "../shared/Sidenavbar";
import {
  createProducts,
  getAllCatagory,
  getAllSubCatagory,
  getAllproducts,
  updateProducts,
  deleteProducts,
  addOrRemoveFlash,
  addOrRemoveTopProducts,
  addOrRemoveBest
} from "../../../helper/utilities/apiHelper";
import { get, isEmpty } from "lodash";
import dynamic from "next/dynamic";
import AdminNavbar from "../shared/AdminNavbar";
import "suneditor/dist/css/suneditor.min.css";
import { ContactSupportOutlined } from "@mui/icons-material";

function Products({ content }) {
  const [edit, setEdit] = useState(false);
  const [dlt, setDlt] = useState(false);
  const [add, setAdd] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const { Option } = Select;
  const [updateId, setUpdateId] = useState([]);
  const [values, setValue] = useState("");
  const [imagename, setImageName] = useState([]);
  const [data, setData] = useState([]);
  const [offer, setOffer] = useState(false);
  const [catFilter, setCatFilter] = useState([]);
  const [catFil, setCategoryFil] = useState([]);
  const [highlight, setHighlights] = useState([]);
  const [subCatFilter, setSubCatFilter] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const ref = useRef;
  const [images, setImages] = useState([]);
  const [offerId, setOfferId] = useState([]);
  const [offerPercent, setOfferPercet] = useState("");
  const [offerValue, setOfferValue] = useState("");
  const [checked, setChecked] = useState();
  const [tablechecked, setTablechecked] = useState(false);
  const [status, setStatus] = useState(false);
  const [best, setBest] = useState(false);
  const [bestPercent, setbestPercent] = useState([])
  const [bestId,setBestId] = useState("")

  const [loading, setLoading] = useState(false);

  const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
  });

  const [form] = Form.useForm();

  const editProducts = (value) => {
    setUpdateId(value._id);
    setOpen(!open);
    setImages(images);
    setValue(value.highlight);
    form.setFieldsValue(value);
    setHighlights(value.highlight);
    setImageName(images);
    setChecked(checked);
    setStatus(value.status);
    setImages(
      products.filter((data) => {
        return data._id === value._id;
      })[0].image
    );
    setSubCatFilter(value.SubCategoryId);
    setCategoryFil(value.categoryId);
  };

  const handleCancel = () => {
    setAdd(false);
    setEdit(false);
    setOpen(!open);
    setUpdateId([]);
    setImageName([]);
    setValue();
    form.resetFields();
    setImages([]);
    setHighlights("");
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = [
        await getAllCatagory(),
        await getAllSubCatagory(),
        await getAllproducts(),
      ];

      setCategory(get(result, "[0].data.data", []));
      setSubCategory(get(result, "[1].data.data", []));
      setCatFilter(get(result, "[1].data.data", []));
      setProducts(get(result, "[2].data.data", []));

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    //  setValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let result = products.filter((res) => {
    return (
      res.title
        .toString()
        .toLowerCase()
        .includes(data.toString().toLowerCase()) ||
      res.categoryname.toLowerCase().includes(data) ||
      res.subcategoryname.toLowerCase().includes(data)
    );
  });

  const handleFinish = async (value) => {
    if (updateId == "") {
      setLoading(true);

      try {
        const formdata = {
          title: value.title,
          categoryname: category.filter((data) => {
            return data._id === catFil;
          })[0].name,
          subcategoryname: subCategory.filter((data) => {
            return data._id === subCatFilter;
          })[0].subcategoryname,
          price: value.price,
          categoryId: value.categoryId,
          SubCategoryId: value.SubCategoryId,
          image: images,
          highlight: ref.current.toString().replace(/<[^>]+>/g, ""),
          status: tablechecked,
        };

        await createProducts(formdata);
        notification.success({ message: "products added successfully" });
        form.resetFields();
        fetchData();
        setLoading(false);
        setOpen(false);
        setImages("");
        setHighlights("");
      } catch (err) {
        setOpen(false);

        notification.success({ message: "Something went wrong" });
      }
    } else {
      try {
        const formData = {
          data: {
            ...value,
            image: images,
            categoryname: category.filter((data) => {
              return data._id === catFil;
            })[0].name,
            subcategoryname: subCategory.filter((data) => {
              return data._id === subCatFilter;
            })[0].subcategoryname,
            highlight: highlight,
            _id: updateId,
            status: status,
          },
        };
        await updateProducts(formData);
        notification.success({ message: "products updated successfully" });
        setOpen(false);
        setUpdateId("");
        fetchData();
        setImageName([]);
        form.resetFields();
      } catch (err) {
        console.log(err);
        setOpen(false);
        notification.error({ message: "Something went wrong" });
      }
    }
  };

  const deleteHandler = async (value) => {
    setLoading(true);

    try {
      const result = await deleteProducts(value._id);

      if (get(result, "data.message", "") === "Product mapped with Banner") {
        Modal.warning({
          title: "this product is mapped with Banner",
          content:
            "If you sure delete this product.First delete this product in Banner",
        });
      } else {
        notification.success({ message: "products deleted successfully" });
      }
      fetchData();
      setLoading(false);
    } catch (err) {
      notification.error({ message: "Something went wrong" });
    }
  };

  const handleEditorChange = (value) => {
    ref.current = value;
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    const allImages = [];
    if (files.length <= 5) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onloadend = () => {
          const dataURL = reader.result;
          allImages.push(dataURL);
          setImages(allImages);
        };

        reader.readAsDataURL(file);
      }
    } else {
      notification.error({ message: "you can't upload more than 5 images" });
    }
  };

  const toggleSwitch = async (response, id) => {
    setLoading(true);
    try {
      const formData = {
        id: id._id,
        status: response,
      };
      await addOrRemoveTopProducts(formData);
      fetchData();
      setLoading(false);
    } catch (err) {
      setLoading(false);

      console.log(err);
    }
  };

  const toggleFlashDeals = async (res, id) => {
    setOffer(res);
    setOfferId(id._id);
    console.log(id._id);
    console.log(offer);

    if (offer == false) {
      try {
        const formData = {
          id: id._id,
          flashStatus: offer,
          offer: offerPercent,
        };
        await addOrRemoveFlash(formData);
        fetchData();
       
      } catch (error) {
        notification.error({ message: "something went wrong" });
      }
    }
  };

  const toggleFlashValues = async (id) => {
    if (offer == true) {
      try {
        const formData = {
          id: id._id,
          flashStatus: offer,
          offer: offerPercent,
        };
        await addOrRemoveFlash(formData);
        setOffer(false)
        fetchData();
        
        notification.success({ message: "flash products added successfully" });
      } catch (error) {
        notification.error({ message: "something went wrong" });
      }
    }
  };




    const toggleBestDeals = async (res, id) => {
    setBest(res);
    setBestId(id._id);
    console.log(id._id);
    console.log(best,"best");

    // if (best == false) {
    //   try {
    //     const formData = {
    //       id: id._id,
    //       bestStatus: best,
    //       bestOffer: bestPercent,
    //     };
    //     await addOrRemoveBest(formData);
    //     fetchData();
       
    //   } catch (error) {
    //     console.log(error)
    //     notification.error({ message: "something went wrong" });
    //   }
    // }
  };


   const toggleBestValues = async (id) => {
    // if (best == true) {
    //   try {
    //     const formData = {
    //       id: id._id,
    //       flashStatus: best,
    //       offer: bestPercent,
    //     };
    //     await addOrRemoveBest(formData);
    //     setBest(false)
    //     fetchData();
        
    //     notification.success({ message: "flash products added successfully" });
    //   } catch (error) {
    //     console.log(error);
    //     notification.error({ message: "something went wrong" });
    //   }
    // }
  };

  const columns = [
    {
      title: <h1 className="!text-sm">Image</h1>,
      dataIndex: "image",
      key: "image",
      render: (name) => {
        return (
          <Image
            width={100}
            height={100}
            src={name[0]}
            className="!w-[50px] !h-[50px] rounded-box"
            alt="not found"
          ></Image>
        );
      },
    },
    {
      title: <h1 className="text-sm">Title</h1>,
      dataIndex: "title",
      key: "title",
      render: (name) => {
        return <h1>{name}</h1>;
      },
    },
    {
      title: <h1 className="text-sm">Price</h1>,
      dataIndex: "price",
      key: "price",
      render: (name) => {
        return <p>{name}</p>;
      },
    },
    {
      title: <h1 className="text-sm">Category Name</h1>,
      dataIndex: "categoryname",
      key: "categoryname",
      render: (name) => {
        return <p>{name}</p>;
      },
    },
    {
      title: <h1 className="text-sm">SubCategory Name</h1>,
      dataIndex: "subcategoryname",
      key: "subcategoryname",
      render: (name) => {
        return <p>{name}</p>;
      },
    },

    {
      title: <h1 className="text-sm">Highlights</h1>,
      dataIndex: "highlight",
      key: "highlight",
      // render: (name) => {
      //   return (
      //     // <p className="w-[20vw]">{name.toString().replace(/<[^>]+>/g, "")}</p>
      //   );
      // },
    },
    {
      title: <h1 className="!text-sm">Add top products</h1>,
      dataIndex: "status",
      key: "status",
      render: (value, id) => {
        return (
          <Switch
            size="small"
            onChange={(e) => toggleSwitch(e, id)}
            checked={value}
          />
        );
      },
    },

    {
      title: <h1 className="!text-sm">Add Flash Deals</h1>,
      dataIndex: "flashStatus",
      key: "flashStatus",
      render: (value, id) => {
        return (
          <div className="flex flex-col items-center justify-center">
            <Switch
              size="small"
              onChange={(e) => toggleFlashDeals(e, id)}
              checked={value}
              className="mt-[5px]"
            />
            <div
              className={`${
                offer === true && offerId === id._id ? "visible" : "invisible"
              } flex items-center justify-center gap-1`}
            >
              <Input
                placeholder="Offers"
                key={id._id}
                onChange={(e) => {
                  setOfferPercet(e.target.value);
                }}
                className="!h-[3vh] !w-[3vw]"
              />

              <Button
                className="bg-[--third-color] !h-[3vh] !w-[3vw]"
                onClick={(e) => {
                  toggleFlashValues(id);
                }}
              >
                Add
              </Button>
            </div>
          </div>
        );
      },
    },


     {
      title: <h1 className="!text-sm">Add Best Deals</h1>,
      dataIndex: "bestStatus",
      key: "bestStatus",
      render: (value, id) => {
        return (
          <div className="flex flex-col items-center justify-center">
            <Switch
              size="small"
              onChange={(e) => toggleBestDeals(e, id)}
              checked={value}
              className="mt-[5px]"
            />
            <div
              className={`${
                best === true && bestId === id._id ? "visible" : "invisible"
              } flex items-center justify-center gap-1`}
            >
              <Input
                placeholder="Offers"
                key={id._id}
                onChange={(e) => {
                  setbestPercent(e.target.value);
                }}
                className="!h-[3vh] !w-[3vw]"
              />

              <Button
                className="bg-[--third-color] !h-[3vh] !w-[3vw]"
                onClick={(e) => {
                  toggleBestValues(id);
                }}
              >
                Add
              </Button>
            </div>
          </div>
        );
      },
    },

    {
      title: <h1 className="text-sm">Update</h1>,
      render: (value) => {
        return (
          <div className="flex gap-x-5">
            <EditNoteOutlinedIcon
              className="text-green-500 !cursor-pointer "
              onClick={() => {
                editProducts(value);
              }}
            />
          </div>
        );
      },
    },
    {
      title: <h1 className="text-sm">Delete</h1>,
      render: (value) => {
        return (
          <div>
            <DeleteOutlineOutlinedIcon
              className="text-red-500 !cursor-pointer"
              onClick={() => deleteHandler(value)}
            />
          </div>
        );
      },
    },
  ];

  const handleChange = (value) => {
    setCategoryFil(value);
    form.setFieldsValue({ subcategoryname: "" });
    let temp = subCategory;
    setCatFilter(
      temp.filter((result) => {
        return result.categoryId === value;
      })
    );
  };

  const deleteFile = (image) => {
    const filterImages = images.filter((data) => {
      return data !== image;
    });
    setImages(filterImages);
  };

  return (
    <div className="flex flex-col">
      <div>
        <AdminNavbar />
      </div>
      <div className="flex">
        <div>
          <Sidenavbar />
        </div>
        <div className="flex flex-col">
          <div className="relative w-[60vw] h-[10vh] pl-[20vw] mt-10">
            <input
              type="search"
              placeholder="Type here"
              className="input input-bordered  !w-[100%] "
              onChange={(e) => setData(e.target.value)}
            />
            <SearchIcon className="absolute top-[8px] right-1 text-3xl" />
          </div>
          <div className="relative flex flex-col gap-[2px]">
            <div className="w-[82vw] !bg-white" onClick={() => setOpen(!open)}>
              <FileAddOutlined className="!text-[#943074] !bg-white !text-2xl float-right mr-[1vw]" />
            </div>
            <div className="pl-10">
              <div className="overflow-x-auto ">
                <Table
                  className="w-[85vw] "
                  columns={columns}
                  dataSource={result}
                  loading={loading}
                  // rowSelection={rowSelection}
                />
              </div>
            </div>
            <Drawer width={600} open={open} destroyOnClose placement="right">
              <Form
                className="flex flex-col relative"
                form={form}
                onFinish={handleFinish}
                // style={{
                //   maxWidth: 600,
                // }}
              >
                <Form.Item
                  name="title"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Enter product Name"
                    className="w-[35vw]"
                  />
                </Form.Item>
                <Form.Item
                  name="price"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Enter product Price"
                    className="w-[35vw]"
                  />
                </Form.Item>
                <Form.Item
                  name="categoryId"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Category"
                    size="large"
                    onChange={(e) => {
                      handleChange(e);
                      setCategoryFil(e);
                    }}
                    className="!w-[35vw]"
                  >
                    {category.map((res) => {
                      return (
                        <Option value={res._id} key={res._id}>
                          {res.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="SubCategoryId"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder="Select SubCategory"
                    size="large"
                    onChange={(e) => setSubCatFilter(e)}
                    className="!w-[35vw]"
                  >
                    {catFilter.map((res) => {
                      return (
                        <Option value={res._id} key={res._id}>
                          {res.subcategoryname}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item className="h-[5px] pb-8 relative" name="status">
                  <label className="text-4xl font-bold">
                    Switch to top Products
                  </label>

                  <Switch
                    className="ml-3 bg-slate-400 shadow-lg"
                    checked={updateId == "" ? tablechecked : status}
                    onChange={(check) => setTablechecked(check)}
                  />
                </Form.Item>

                <Form.Item name="highlight">
                  <SunEditor
                    onChange={handleEditorChange}
                    setOptions={{
                      buttonList: [
                        [
                          "bold",
                          "underline",
                          "italic",
                          "strike",
                          "list",
                          "align",
                          "fontSize",
                          "formatBlock",
                          "table",
                          "image",
                        ],
                      ],
                      formats: ["h1", "h2", "h3", "h4", "h5", "h6"],
                    }}
                    defaultValue={highlight}
                  />
                </Form.Item>
                <Form.Item>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileInputChange}
                    draggable
                  />
                  <div className="grid grid-cols-5 h-[7vh]  !ml-3 relative !w-[30vw]">
                    {images &&
                      images.map((image, index) => (
                        <>
                          <div>
                            <div className="bg-slate-200 !w-[5vw]  h-[8vh] flex items-center justify-center">
                              <Image
                                key={index}
                                src={image}
                                width={100}
                                height={100}
                                alt={`image-${index}`}
                                className="self-center  pt-5 !h-[5vh]"
                              />
                            </div>

                            <DeleteIcon
                              onClick={() => deleteFile(image)}
                              style={{ color: "var(--third-color)" }}
                              className="absolute top-0 grid grid-cols-4 "
                            />
                          </div>
                        </>
                      ))}
                  </div>
                </Form.Item>

                <div className="flex gap-5 justify-end ">
                  <Button
                    type="Primary"
                    className="bg-[--third-color] shadow-xl  !text-black"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="Primary"
                    className="bg-[--third-color] shadow-xl !text-black"
                    htmlType="submit"
                  >
                    {updateId == "" ? "Save" : "Update"}
                  </Button>
                </div>
              </Form>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
