import React, { useEffect, useState } from "react"; // Remove useParams from here
import { Link, useNavigate, useParams } from "react-router-dom"; // Import useParams here
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { services } from "../utils/Data";
import prodcompare from "../images/prodcompare.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import moment from "moment";
import { getAllProducts } from "../features/products/productSlilce";
import ReactStars from "react-rating-stars-component";
import { addToWishlist } from "../features/products/productSlilce";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import mainBanner from "../images/main-banner-1.jpg";
import { getuserProductWishlist } from "../features/user/userSlice";

const Home = () => {
  const [wishlist, setWishlist] = useState([]); // Initialize wishlist as an empty array
  const blogState = useSelector((state) => state?.blog?.blog);
  const productState = useSelector((state) => state?.product?.product || []);
  const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist);
  const { category } = useParams(); // URL-аас категори авна

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getWishlistFromDb();
    getblogs();
    getProducts();
  }, []);

  useEffect(() => {
    // Update local wishlist state when wishlistState changes
    if (wishlistState) {
      setWishlist(wishlistState.map((item) => item._id)); 
    }
  }, [wishlistState]);

  const getWishlistFromDb = () => {
    dispatch(getuserProductWishlist());
  };

  const getblogs = () => {
    dispatch(getAllBlogs());
  };

  const getProducts = () => {
    dispatch(getAllProducts());
  };

  const addToWish = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id)); // Remove from wishlist
    } else {
      setWishlist([...wishlist, id]); // Add to wishlist
      dispatch(addToWishlist(id)); // Dispatch action to update backend
    }
  };

  // Категори шүүлт
  const filteredProducts = category
    ? (productState?.filter((product) => product?.category === category) || [])
    : (productState || []);
  return (
    <>
      <Container class1="home-wrapper-1 py-5" >
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative">
              <img
                src={mainBanner}
                className="img-fluid rounded-3"
                alt="main-banner"
              />
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img
                  src="/images/catbanner-01.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Шинэ ирэлт</h4>
                  <h5>MacBook Pro.</h5>
                  <p>Үнэ : 1,290,900₮ <br /></p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src="/images/catbanner-02.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Шинэ ирэлт</h4>
                  <h5>But IPad Air</h5>
                  <p>Үнэ : 210,625₮ <br /></p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src="/images/catbanner-03.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Шинэ ирэлт</h4>
                  <h5>But IPad Air</h5>
                  <p>Үнэ : 410,900₮ <br /></p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src="/images/catbanner-04.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Шинэ ирэлт</h4>
                  <h5>But Headphone</h5>
                  <p>Үнэ : 41,000₮ <br /></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="servies d-flex align-items-center justify-content-between">
              {services?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.image} alt="services" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
     
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">
              Онцлох бараа
            </h3>
            <p className="sectio">
               {category ? `Ангилал : ${category}` : "Бүх бараа"}
            </p>
          </div>
          {filteredProducts &&
            filteredProducts.map((item, index) => {
              if (item.tags === "featured") {
                return (
                  <div key={index} className={"col-3"} style={{ marginBottom: "20px" }}>
                    <div className="product-card position-relative" style={{ border: "1px solid #14B6E7" }}>
                      <div className="wishlist-icon position-absolute">
                        <button
                          className="border-0 bg-transparent"
                          onClick={(e) => addToWish(item?._id)}
                        >
                          {wishlist.includes(item?._id) ? (
                            <AiFillHeart className="fs-5 me-1" />
                          ) : (
                            <AiOutlineHeart className="fs-5 me-1" />
                          )}
                        </button>
                      </div>
                      <div className="product-image">
                        <img
                          src={item?.images?.[0]?.url || "path/to/default/image.jpg"}
                          alt="product image"
                          height={"250px"}
                          width={"100%"}
                          onClick={() => navigate("/product/" + item?._id)}
                        />
                          <img
                          src={item?.images?.[0]?.url || "path/to/default/image.jpg"} // Fallback to a default image
                          alt="product image"
                          height={"250px"}
                          width={"100%"}
                          onClick={() => navigate("/product/" + item?._id)}
                        />
                      </div>
                      <div className="product-details">
                        <h6 className="brand">Brand : {item?.brand}</h6>
                        <h5 className="product-title">
                          Нэр : {item?.title?.substr(0, 70) + "..."}
                        </h5>
                        <ReactStars
                          count={5}
                          size={24}
                          value={item?.totalrating?.toString() || "0"}
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <p className="price">Үнэ : {item?.price}</p>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </Container>

    
    
      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Тусгай бараа</h3>
            <p className="sectio">
               {category ? `Ангилал : ${category}` : "Бүх бараа"}
            </p>
          </div>
        </div>
        <div className="row">
          {filteredProducts &&
            filteredProducts?.map((item, index) => {
              if (item.tags === "special") {
                return (
                  <SpecialProduct
                    key={index}
                    id={item?._id}
                    title={item?.title}
                    brand={item?.brand}
                    totalrating={item?.totalrating?.toString() || "0"}
                    price={item?.price}
                    img={item?.images?.[0]?.url || "path/to/default/image.jpg"} // Fallback image
                    sold={item?.sold}
                    quantity={item?.quantity}
                  />
                );
              }
            })}
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Эрэлттэй бараа</h3>
            <p className="sectio">
               {category ? `Ангилал : ${category}` : "Бүх бараа"}
            </p>
          </div>
        </div>
        <div className="row">
          {filteredProducts &&
            filteredProducts?.map((item, index) => {
              if (item.tags === "popular") {
                return (
                  <div key={index} className={"col-3"} >
                    <div className="product-card position-relative"   style={{ marginBottom: "20px" , border: "1px solid #14B6E7"  }} >
                      <div className="wishlist-icon position-absolute">
                      <button
                                          className="border-0 bg-transparent"
                                          onClick={(e) => addToWish(item?._id)}
                                        >
                                          {wishlist.includes(item?._id) ? (
                                            <AiFillHeart className="fs-5 me-1" />
                                          ) : (
                                            <AiOutlineHeart className="fs-5 me-1" />
                                          )}
                          </button>
                      </div>
                      <div className="product-image">
                        <img
                          src={item?.images?.[0]?.url || "path/to/default/image.jpg"} // Fallback to a default image
                          alt="product image"
                          height={"250px"}
                          width={"100%"}
                          onClick={() => navigate("/product/" + item?._id)}
                        />
                        <img
                          src={item?.images?.[0]?.url || "path/to/default/image.jpg"} // Fallback to a default image
                          alt="product image"
                          height={"250px"}
                          width={"100%"}
                          onClick={() => navigate("/product/" + item?._id)}
                        />
                      </div>
                      <div className="product-details">
                        <h6 className="brand">{item?.brand}</h6>
                        <h5 className="product-title">
                          {item?.title?.substr(0, 70) + "..."}
                        </h5>
                        <ReactStars
                          count={5}
                          size={24}
                          value={item?.totalrating.toString()}
                          edit={false}
                          activeColor="#ffd700"
                        />

                        <p className="price">Үнэ : {item?.price}₮</p>
                      </div>
                      <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                          {/* <button className="border-0 bg-transparent">
                            <img src={prodcompare} alt="compare" />
                          </button> */}
                          {/* <button className="border-0 bg-transparent">
                            <img
                              onClick={() => navigate("/product/" + item?._id)}
                              src={view}
                              alt="view"
                            />
                          </button> */}
                          {/* <button className="border-0 bg-transparent">
                            <img src={addcart} alt="addcart" />
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </Container>
      <Container class1="marque-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="/images/brand-01.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="/images/brand-02.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="/images/brand-03.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="/images/brand-04.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="/images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="/images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="/images/brand-07.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="/images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
