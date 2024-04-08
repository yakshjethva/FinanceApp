// Library Imports
import { StyleSheet, Text, View } from "react-native";
import React from "react";
// Relative Imports
import { AppContainer, AppHeader } from "../../components";
import { Color, Responsive } from "../../utils";

interface TransactionDetailScreenProps {
  navigation: any;
  route: any;
}

const TransactionDetailScreen: React.FC<TransactionDetailScreenProps> = (
  props
) => {
  const { navigation, route } = props;
  const { item } = route?.params;
  const onPressBack = () => {
    navigation.goBack();
  };
  return (
    <AppContainer>
      <AppHeader
        titleText={"Transaction Detail"}
        isBackButton
        onPressBack={onPressBack}
      />
      <View style={styles.container}>
        <View style={styles.topView}>
          <Text style={styles.amountText}>{`$${item?.amount}`}</Text>
          <Text style={styles.labelText}>{item?.title}</Text>
          <Text style={styles.labelText}>{item?.location}</Text>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.titleText}>{"Transaction Date"}</Text>
          <Text style={styles.dateText}>{item?.date}</Text>
        </View>
      </View>
    </AppContainer>
  );
};

export default TransactionDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    backgroundColor: Color.themeYellow,
    paddingVertical: Responsive.verticalScale(20),
    paddingHorizontal: Responsive.scale(20),
    alignItems: "center",
  },
  amountText: {
    fontSize: Responsive.font(8),
    color: Color.black,
    fontWeight: "bold",
    marginBottom: Responsive.verticalScale(10),
  },
  titleText: {
    fontSize: Responsive.font(6),
    color: Color.black,
    fontWeight: "700",
    marginBottom: Responsive.verticalScale(4),
  },
  locationText: {
    fontSize: Responsive.font(5),
    color: Color.black,
    fontWeight: "600",
  },
  bottomView: {
    flexDirection: "row",
    paddingHorizontal: Responsive.scale(20),
    paddingVertical: Responsive.verticalScale(10),
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: Color.themeGrey,
  },
  labelText: {
    fontSize: Responsive.font(4),
    color: Color.black,
    fontWeight: "700",
  },
  dateText: {
    fontSize: Responsive.font(4),
    color: Color.black,
  },
});
