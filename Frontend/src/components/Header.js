import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wish.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAProduct } from "../features/products/productSlilce";
import { getUserCart } from "../features/user/userSlice";
import logo from './image.png';
import './Header.css' ;
const Header = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const authState = useSelector((state) => state?.auth);
  const [total, setTotal] = useState(null);
  const [paginate, setPaginate] = useState(true);
  const productState = useSelector((state) => state?.product?.product);
  const navigate = useNavigate();

  const getTokenFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  };

  useEffect(() => {
    dispatch(getUserCart(config2));
  }, []);

  const [productOpt, setProductOpt] = useState([]);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
      setTotal(sum);
    }
  }, [cartState]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [productState]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
       <div
  className="header"
  style={{
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '0',
    width: '100%',
    margin: '0',
    backgroundColor: '#14B6E7',
    position: 'fixed',
    zIndex: '9999',
  }}
>
  <Link className="text-white" to="/">
    <img
      src={logo}
      alt="logo"
      className="img-fluid"
      style={{ width: '180px' , alignItems: "center" , marginTop : '15px'}}
    />
  </Link>

  <div className="header-upper">
    <header className="header-upper py-3" style={{ backgroundColor: '#14B6E7' ,  width: '1400px', color: 'black' }}>
      <div className="container-xxl">
        <div className="row align-items-center" >
          <div className="col-5" style={{ width: '700px' }}>
            <div className="input-group" style={{
              width: '700px',
              marginRight: '100px',
             
            }}>
              <Typeahead style={{ width: '500px '}}
                id="pagination-example"
                onPaginate={() => console.log('Results paginated')}
                onChange={(selected) => {
                  navigate(`/product/${selected[0]?.prod}`);
                  dispatch(getAProduct(selected[0]?.prod));
                }}
                options={productOpt}
                paginate={paginate}
                labelKey={'name'}
                placeholder="Search for Products here"
              />
              <span className="input-group-text p-3" id="basic-addon2" style={{ backgroundColor: 'white' }}>
                <BsSearch className="fs-6" />
              </span>
            </div>
          </div>

          <div className="col-5">
            <div className="header-upper-links d-flex align-items-center justify-content-between gap-3">
              <div>
                {/* Compare хэсэг идэвхгүй */}
              </div>

              <div>
                <Link to="/cart" className="d-flex align-items-center gap-2 text-black"  style={{color : 'black'}} >
                  <img src={cart} alt="cart" style={{width : '50px'}}/>
                  <div className="d-flex flex-column gap-1">
                    <span className="badge bg-white text-dark">
                      {cartState?.length ? cartState.length : 0}
                    </span>
                    <p className="mb-0"></p>
                  </div>
                </Link>
              </div>

              <div>
                <Link to="/wishlist" className="d-flex align-items-center gap-2 text-black"style={{color : 'black'}}  >
                  <img src={wishlist} alt="wishlist" style={{ width : '40px'}} />
                  <p className="mb-0">Favourite</p>
                </Link>
              </div>

              <div>
                <Link
                  to={authState?.user === null ? '/login' : 'my-profile'}
                  className="d-flex align-items-center gap-2 text-white"
                >
                  <img src={user} alt="user" style={{width :'40px'}}/>
                  {authState?.user === null ? (
                    <p className="mb-0" style={{color : 'black'}} >Log in</p>
                  ) : (
                    <p className="mb-0" style={{color : 'black'}} >Welcome {authState?.user?.firstname}</p>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <header className="header-bottom py-3" style={{ backgroundColor: '#14B6E7'  }}>
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <div className="menu-bottom d-flex align-items-center gap-3">
              <div className="menu-links" style={{ marginLeft: '50px' }}>
                <div className="d-flex align-items-center gap-3">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `text-black px-3 py-2 rounded text-uppercase ${isActive ? 'active-link' : ''}`
                    }
                    style={{ color: 'black' }}
                  >
                    Home
                  </NavLink>
                  {productState &&
                    [...new Set(productState.map((item) => item?.category).filter(Boolean))]
                      .reverse()
                      .map((category, index) => (
                        <NavLink
                          key={index}
                          to={`/category/${category}`}
                          className={({ isActive }) =>
                            `text-black text-uppercase ${isActive ? 'active-link' : ''}`
                          }
                          style={{ color: 'black',
                           }}
                        >
                          {category}
                        </NavLink>
                      ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</div>

    </>
  );
};

export default Header;
