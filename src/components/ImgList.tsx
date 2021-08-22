import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
  Button,
  Image
} from "react-native";
import ann from "../img/ann.jpg";
import ball from "../img/ball.jpeg";
import koin from "../img/koin.jpeg";
import syateki from "../img/syateki.jpg";
import takoyaki from "../img/takoyaki.jpg";
import watagashi from "../img/watagashi.png";
import yakisoba from "../img/yakisoba.jpg";
import yoyo from "../img/yoyo.jpg";

const itemData = [
  {
    img: ann,
    product_name: "お面",
    price: 300
  },
  {
    img: ball,
    product_name: "ぼーるすくい",
    price: 200
  },
  {
    img: koin,
    product_name: "コイン落とし",
    price: 200
  },
  {
    img: syateki,
    product_name: "射的",
    price: 200
  },
  {
    img: takoyaki,
    product_name: "たこ焼き",
    price: 500
  },
  {
    img: watagashi,
    product_name: "わたがし",
    price: 400
  },
  {
    img: yakisoba,
    product_name: "やきそば",
    price: 500
  },
  {
    img: yoyo,
    product_name: "ヨーヨーすくい",
    price: 200
  }
];

const ImgList = props => {
  const { totalAmount, setTotalAmount, item_list, setItemList } = props;

  const checkArray = product_name => {
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
    <View>
      <FlatList
        style={styles.orderMenu}
        data={itemData}
        numColumns={2}
        keyExtractor={item => item.product_name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => setOrderInfo(item.product_name, item.price)}
          >
            <Image style={styles.img} source={item.img} />
            <Text>
              {item.product_name} {item.price}円
            </Text>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
};
const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 100
  },
  item: {
    width: "50%",
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    padding: 5
  }
});
export default ImgList;
