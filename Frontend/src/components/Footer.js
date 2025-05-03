import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";
import newsletter from "../images/newsletter.png";
const Footer = () => {
  return (
    <>
      
      <footer className="py-4" style={{ backgroundColor: '#14B6E7' }} >
        <div className="container-xxl" >
        <div className="row justify-content-center gx-4" style={{ color: 'black' }}>
  <div className="col-3" style={{ color: 'black' }}>
    <h4 className="text-black mb-4">Сайт мэдээлэл</h4>
    <div className="footer-link d-flex flex-column">
      <p className="text-black py-2 mb-1">
        Бидний тухай
      </p>
      <p className="text-black py-2 mb-1">
        Хамтран ажиллах
      </p>
      <p className="text-black py-2 mb-1">
        Ажлын байр
      </p>
    </div>
  </div>
  <div className="col-3" style={{ color: 'black' }}>
    <h4 className="text-black mb-4">Тусламж</h4>
    <div className="footer-link d-flex flex-column">
      <p className="text-black py-2 mb-1">Төлбөр буцаах хүсэлт илгээх</p>
      <p className="text-black py-2 mb-1">Үйлчилгээний нөхцөл</p>
      <p className="text-black py-2 mb-1">Хүргэлтийн нөхцөл</p>
      <p className="text-black py-2 mb-1">Нууцлалын баталгаа</p>
      <p className="text-black py-2 mb-1">Баталгааны нөхцөл</p>
    </div>
  </div>
  <div className="col-2" style={{ color: 'black' }}>
    <h4 className="text-black mb-4">Холбоо барих</h4>
    <div className="footer-link d-flex flex-column">
      <p className="text-black py-2 mb-1">Санал хүсэлт</p>
      <p className="text-black py-2 mb-1">+976 75756677</p>
      <p className="text-black py-2 mb-1">eshop@belcomputers.mn</p>
    </div>
  </div>
  <div className="col-4" style={{ color: 'black' }}>
    <h4 className="text-black mb-4">Хаяг</h4>
    <div>
      <address className="text-black fs-6">
        Улаанбаатар хот,
      </address>
      <p className="mt-3 d-block mb-1 text-black">
        Чингэлтэй дүүрэг 2-р хороо Чойнболын гудамж,
      </p>
      <p className="mt-2 d-block mb-0 text-black">
        Best төв Компьютер ланд төвийн баруун талд
      </p>
      <div className="social_icons d-flex align-items-center gap-3 mt-4">
        <p className="text-black">
          <BsLinkedin className="fs-4" />
        </p>
        <p className="text-black">
          <BsInstagram className="fs-4" />
        </p>
        <p className="text-black">
          <BsGithub className="fs-4" />
        </p>
        <p className="text-black">
          <BsYoutube className="fs-4" />
        </p>
      </div>
    </div>
  </div>
</div>

          
        </div>
        
      </footer>
     
    </>
  );
};

export default Footer;
