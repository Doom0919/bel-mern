import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { delImg } from "../features/upload/uploadSlice";
import CustomModal from "../components/CustomModal";
const columns = [
  {
    title: "№",
    dataIndex: "key",
  },
  {
    title: "Бараа бүтээгдэхүүний нэр",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Брэнд",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Ангилал",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },

  {
    title: "Тоо ширхэг",
    dataIndex: "quantity",
  },
  {
    title: "Үнэ",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Үйлдэл",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const [open, setOpen] = useState(false);
  const [productId, setproductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setproductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state?.product?.products);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      color: productState[i].color,
      quantity: productState[i].quantity,
      price: `${productState[i].price}`,
      action: (
        <>
          <Link
            to={`/admin/product/${productState[i]._id}`}
            className=" fs-3 text-success"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(productState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));
    dispatch(delImg(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };
  console.log(data1);
  return (
    <div>
      <h3 className="mb-4 title">Бараа бүтээгдэхүүний жагсаалт</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProduct(productId);
        }}
        title="Та энэ бараа бүртээгдэхүүнийг устгахдаа итгэлтэй байна уу?"
      />
    </div>
  );
};

export default Productlist;
