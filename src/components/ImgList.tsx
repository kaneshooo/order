import React from "react";
import styled from "styled-components";


import ann from "./img/ann.jpg";
import ball from "./img/ball.jpeg";
import koin from "./img/koin.jpeg";
import syateki from "./img/syateki.jpg";
import takoyaki from "./img/takoyaki.jpg";
import watagashi from "./img/watagashi.png";
import yakisoba from "./img/yakisoba.jpg";
import yoyo from "./img/yoyo.jpg";


const itemData = [
  {
    img: ann,
    product_name: "お面",
    price: 300,
  },
  {
    img: ball,
    product_name: "ぼーるすくい",
    price: 200,
  },
  {
    img: koin,
    product_name: "コイン落とし",
    price: 200,
  },
  {
    img: syateki,
    product_name: "射的",
    price: 200,
  },
  {
    img: takoyaki,
    product_name: "たこ焼き",
    price: 500,
  },
  {
    img: watagashi,
    product_name: "わたがし",
    price: 400,
  },
  {
    img: yakisoba,
    product_name: "やきそば",
    price: 500,
  },
  {
    img: yoyo,
    product_name: "ヨーヨーすくい",
    price: 200,
  },
];

const ImgList = (props) => {
  const { totalAmount, setTotalAmount, item_list, setItemList } = props;

  const checkArray = (product_name) => {
    let exist;
    item_list.find((item, index) => {
      if (item.productName === product_name) {
        let tmp = item_list.slice();
        tmp[index].num += 1;
        setItemList(tmp);
        exist = true;
      }
    });

    return exist;
  };

  const setOrderInfo = (product_name, price) => {
    if (!checkArray(product_name)) {
      console.log("実行2");
      setItemList([...item_list, { productName: product_name, num: 1 }]);
    }
    setTotalAmount(totalAmount + price);
  };
  return (
    // <Wrapper>
    //   <ImageList2 rowHeight={180}>
    //     {itemData.map((item) => (
    //       <ImageListItem
    //         key={item.img}
    //         onClick={() => setOrderInfo(item.product_name, item.price)}
    //       >
    //         <img src={item.img} alt={item.product_name} />
    //         <ImageListItemBar
    //           title={item.product_name}
    //           subtitle={<span>{item.price}円</span>}
    //         />
    //       </ImageListItem>
    //     ))}
    //   </ImageList2>
    // </Wrapper>
  );
};
const ImageList2 = styled.div`
  width: 300px;
  height: 480px;
`;
const Wrapper = styled.div`
  display: "flex";
  flex-wrap: "wrap";
  justify-content: "space-around";
  overflow: "hidden";
`;

export default ImgList;
