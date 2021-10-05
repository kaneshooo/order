import React from "react";
import { useState , useContext} from "react"
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Animated,
    Button,
    Image,
    Dimensions,
    FlatList
  } from "react-native";
import {Calendar} from 'react-native-calendars';
import {createCarender} from '../Screens/EarningScreen'

function pad(d) {
  return (d < 10) ? '0' + d.toString() : d.toString();
}

function CarenderView(){
   
  const {date_item,getdate}=useContext(createCarender);
  let today=date_item.date
  let reday=today.split('-')
  let retoday=reday[0]+'-'+reday[1]+'-'+pad(reday[2])
  const [marker,setmarker]=useState(retoday)

  return(
      <View>
          <Calendar
              // 最初に表示される月。 デフォルト値 = Date()
              current={marker}
              // カレンダーで選択できる範囲の最初の日。この日以前の日付はグレーアウトします。 デフォルト値 = undefined
              minDate={'2000-01-01'}
              // カレンダーで選択できる範囲の最後の日。この日以前の日付はグレーアウトします。 デフォルト値 = undefined
              maxDate={'2030-12-31'}
              // 日付を選択したときの挙動。
              onDayPress={day => {
                console.log(day.dateString)
                setmarker(day.dateString)
                day.dateString=String(day.year+'-'+day.month+'-'+Number(day.day))
                  date_item.setdate(day.dateString)
                  today=day.dateString
              }}
              // 年月の表示フォーマット。
              monthFormat={'yyyy年 MM月'}
              // 年月を変更したときの挙動。
              onMonthChange={month => {
              console.log('month changed', month);
              }}
              // 初めの曜日設定。例えば、月曜日なら１、日曜日なら７
              firstDay={2}
              // スワイプでの年月変更の可否。 デフォルト値 = false
              enableSwipeMonths={true}
              markedDates={{
                  [marker]: {selected: true, marked: true, selectedColor: '#053050'}
              }}
              onPressArrowLeft={subtractMonth => subtractMonth() }
              // Handler which gets executed when press arrow icon right. It receive a callback can go next month
              onPressArrowRight={addMonth => addMonth()}
          />
          <Text style={styles.totalamount}>{today}</Text>
      </View>
  )
}

const styles=StyleSheet.create({
  datechange:{
    flexDirection: 'row',
    justifyContent: 'center',
  },
  Button:{
    flex: 1,
    position: 'relative',
    top: -1
  },
  totalamount:{
    fontSize:30,
    color:'black',
    alignSelf: 'center',
    }
})
export default CarenderView;