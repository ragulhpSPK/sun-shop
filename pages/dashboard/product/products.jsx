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
  deleteProducts,createTopProducts, getAllTopProducts,
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
  const [uploadError, setUploadError] = useState(false);
  const [catFilter, setCatFilter] = useState([]);
  const [catFil, setCategoryFil] = useState([]);
  const [highlight, setHighlights] = useState([]);
  const [subCatFilter, setSubCatFilter] = useState([]);
  const [addtop, setAddTop] = useState();
  const ref = useRef;
  const [images, setImages] = useState([]);
  const [allTopProducts,setAllTopProducts]=useState([])
  const [allTopProductsId,setAllTopProductsId]=useState([])

  const [loading, setLoading] = useState(false);

  const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
  });

  const plugins = dynamic(() => import("suneditor/src/plugins"), {
    ssr: false,
  });

  const { Dragger } = Upload;

  const [form] = Form.useForm();

  const editProducts = (value) => {
    setUpdateId(value._id);
    setOpen(!open);
    setImageName(value.image);
    setValue(value.highlight);
    form.setFieldsValue(value);
    // setCategoryFil(catFil[0].name)
    // console.log
    // setHighlights(ref.current.toString().replace(/<[^>]+>/g, ""))
  };

  const handleCancel = () => {
    setAdd(false);
    setEdit(false);
    setOpen(!open);
    setUpdateId([]);
    setImageName([]);
    setValue();
    form.resetFields();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = [
        await getAllCatagory(),
        await getAllSubCatagory(),
        await getAllproducts(),
        await getAllTopProducts()
      ];
console.log(result)
      setCategory(get(result, "[0].data.data", []));
      setSubCategory(get(result, "[1].data.data", []));
      setCatFilter(get(result, "[1].data.data", []));
      setProducts(get(result, "[2].data.data", []));
      setAllTopProducts(get(result, "[3].data.message", []))
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    //  setValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
        };

        await createProducts(formdata);
        notification.success({ message: "products added successfully" });
        form.resetFields();
        fetchData();
        setLoading(false);
        setOpen(false);
        setImageName("");
      } catch (err) {
        setOpen(false);

        notification.success({ message: "Something went wrong" });
      }
    } else {
      try {
        const formData = {
          data: {
            ...value,
            image: imagename,
            categoryname: category.filter((data) => {
              return data._id === catFil;
            })[0].name,
          },
          subcategoryname: subCategory.filter((data) => {
            return data._id === subCatFilter;
          })[0].subcategoryname,
          id: updateId,
        };
        await updateProducts(formData);
        notification.success({ message: "products updated successfully" });
        setOpen(false);
        setUpdateId("");
        fetchData();
        setImageName([]);
        form.resetFields();
      } catch (err) {
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
    // setHighlights(ref.current.toString().replace(/<[^>]+>/g, ""))
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    const allImages = [];

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
  };




  console.log(addtop, "eruheur");
  const changeAddTop = async(checked) => {
    if (checked === true) {
      try {
        const formData = {
       
            image:products.filter(data => {
              return data._id===addtop
             })[0].image[0],
              productId:products.filter(data => {
                return data._id===addtop
               })[0]._id,
             ProductTitle:products.filter(data => {
              return data._id===addtop
             })[0].title,
       
         
        }
        await createTopProducts(formData)
        notification.success({message:"Top ADDed"})
      } catch (err) {
        console.log(err)
        notification.error({message:"Something went wrong"})
     }
   }
  }

  // console.log(products&&products.filter(data => {
  //   return data._id===addtop
  //  })[0].image[0],"ewjnjkn")


  const columns = [
    {
      title: <h1 className="!text-sm">Add top products</h1>,
      key: "add",
      render: (name) => {
        setAddTop(name._id)
        console.log(name._id,"name")
        return (
          <p>
            <Switch
             
              // onChange={
              //   () => {
              //     setAddTop(name._id);
              //   changeAddTop()
              // }}
            
              // checked={datasid==name._id?true:false}
              onChange={changeAddTop} 
              onClick={() => {
                    setAddTop(name._id);
                  
                }}
            />
          </p>
        );
      },
    },
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
          <div className="relative flex flex-col gap-[8px]">
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
                className="flex flex-col gap-8 relative"
                form={form}
                onFinish={handleFinish}
                style={{
                  maxWidth: 600,
                }}
              >
                <Form.Item
                  name="title"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input size="large" placeholder="Enter product Name" />
                </Form.Item>
                <Form.Item
                  name="price"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input size="large" placeholder="Enter product Price" />
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
                    }}
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

                <Form.Item name="highlight">
                  <SunEditor onChange={handleEditorChange} />
                </Form.Item>
                <Form.Item>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileInputChange}
                  />
                  {images.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      width={400}
                      height={400}
                      alt={`image-${index}`}
                    />
                  ))}
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
        {/* <Modal open={imagename.length > 5} footer={false}>
          <Image.PreviewGroup>
            <div className="flex w-[100%]  flex-wrap gap-x-2 gap-y-2">
              {imagename &&
                imagename.map((res, index) => {
                  return (
                    <div
                      className="border group w-[100px] h-[100px] relative"
                      key={index}
                    >
                      <Image
                        src={res}
                        width={100}
                        height={100}
                        alt="not found"
                      />
                      <DeleteIcon
                        onClick={() => {
                          setImageName(
                            imagename.filter((result) => {
                              return result !== res;
                            })
                          );
                        }}
                        className="!text-md hidden group-hover:block absolute bottom-1 right-1 !text-white !cursor-pointer"
                      />
                    </div>
                  );
                })}
            </div>
          </Image.PreviewGroup>
        </Modal> */}
      </div>
    </div>
  );
}

export default Products;
