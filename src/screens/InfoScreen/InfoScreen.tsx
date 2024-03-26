import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import _ from "lodash";
import { AppContainer, AppHeader } from "../../components";
import { Color, Responsive } from "../../utils";
import { transactionList } from "../../utils/Data";

const InfoScreen = () => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderItem = (title: string, answer: string) => (
    <Animated.View style={[styles.itemContainer, styles.smallItemView, { opacity: animation }]}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.ansText}>{answer}</Text>
    </Animated.View>
  );

  const renderBigItem = (title: string, item: any) => (
    <Animated.View style={[styles.itemContainer, styles.itemView, { opacity: animation }]}>
      <Text style={styles.itemTitleText}>{title}</Text>
      <View style={styles.itemBottom}>
        <Text style={styles.titleText}>{item?.title}</Text>
        <Text style={styles.ansText}>{`$${item?.amount}`}</Text>
      </View>
    </Animated.View>
  );

  const calculateBalance = () => _.sumBy(transactionList, (item) => Number(item?.amount));
  const findExtremeTransaction = (selector: any) => _.maxBy(transactionList, selector);

  const balance = calculateBalance();
  const high = findExtremeTransaction((item: any) => Number(item?.amount));
  const low = findExtremeTransaction((item: any) => -Number(item?.amount));

  return (
    <AppContainer>
      <AppHeader titleText="Summary" />
      <View style={styles.mainContainer}>
        {renderItem("Total Transactions", transactionList.length.toString())}
        {renderItem("Balance", `$${balance}`)}
        {renderBigItem("Highest Spent Amount", high)}
        {renderBigItem("Lowest Spent Amount", low)}
      </View>
    </AppContainer>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Responsive.scale(20),
  },
  itemContainer: {
    width: "100%",
    marginBottom: Responsive.verticalScale(10),
    borderRadius: 10,
    backgroundColor: Color.themeYellow,
    padding: Responsive.verticalScale(20),
  },
  smallItemView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemView: {
    alignItems: "center",
  },
  titleText: {
    fontSize: Responsive.font(4),
    color: Color.black,
  },
  ansText: {
    fontSize: Responsive.font(4),
    color: Color.white,
    fontWeight: "700",
  },
  itemBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Responsive.verticalScale(10),
  },
  itemTitleText: {
    fontSize: Responsive.font(4.5),
    color: Color.themeGrey,
    fontWeight: "600",
  },
});
