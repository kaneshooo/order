import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { Divider, IconButton } from "react-native-paper";

const Data = [
  {
    id: "1",
    name: "お面"
  },
  {
    id: "2",
    name: "水鉄砲"
  },

  {
    id: "3",
    name: "焼きそば"
  }
];

function LogScreen({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.headerItem}>
          <IconButton
            icon="arrow-left"
            size={30}
            onPress={() => navigation.popToTop()}
          />
        </View>
        <Text style={styles.headerText}>販売履歴</Text>
      </View>
      <View style={styles.salesHistory}>
        <FlatList
          data={Data}
          renderItem={({ item }) => (
            <View style={styles.salesHistoryContainer}>
              <View style={styles.salesHistoryItem}>
                <Text style={styles.salesHistoryText}>{item.name}</Text>
              </View>
              <Divider style={styles.divider} />
            </View>
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  header: {
    height: "10%",
    marginBottom: 20,
    backgroundColor: "#99ff66",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10
  },
  headerItem: { width: "40%" },
  headerText: {
    fontSize: 25,
    textAlign: "center"
  },
  salesHistory: {
    height: "90%"
  },
  salesHistoryContainer: {
    height: 100
  },
  divider: {
    margin: 5,
    borderWidth: 0.5
  },
  salesHistoryItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 30
  },
  salesHistoryText: {
    fontSize: 30
  }
});
export default LogScreen;
