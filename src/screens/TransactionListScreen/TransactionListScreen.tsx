import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Animated, Easing } from "react-native";
import { AppContainer, AppHeader } from "../../components";
import { transactionList } from "../../utils/Data";
import { Color, Images, Responsive, Screen } from "../../utils";

interface TransactionListScreenProps {
  navigation: any;
}

const TransactionListScreen: React.FC<TransactionListScreenProps> = ({ navigation }) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);

  const onPressItem = (item: any) => {
    navigation.navigate(Screen.TransactionDetailScreen, { item });
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-50 * index, 1],
    });

    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => onPressItem(item)}>
        <Animated.View style={[styles.itemContent, { transform: [{ translateY }] }]}>
          <Text style={styles.titleText}>{item?.title}</Text>
          <Text style={styles.amountText}>{`$${item?.amount}`}</Text>
        </Animated.View>
        <Image source={Images.right} style={styles.rightImg} resizeMode="contain" />
      </TouchableOpacity>
    );
  };

  return (
    <AppContainer>
      <AppHeader />
      <FlatList
        data={transactionList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
      />
    </AppContainer>
  );
};

export default TransactionListScreen;

const styles = StyleSheet.create({
  flatListContainer: {
    marginVertical: Responsive.verticalScale(5),
    marginHorizontal: Responsive.scale(5),
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Responsive.scale(5),
    paddingVertical: Responsive.verticalScale(15),
    backgroundColor: Color.themeYellow,
    marginBottom: Responsive.verticalScale(10),
    borderRadius: 10,
    elevation: 3,
    shadowColor: Color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  titleText: {
    fontSize: Responsive.font(5),
    color: Color.black,
    fontWeight: "800",
    marginRight: Responsive.scale(10),
  },
  amountText: {
    fontSize: Responsive.font(5),
    color: Color.white,
    fontWeight: "900",
  },
  rightImg: {
    height: Responsive.verticalScale(20),
    width: Responsive.scale(20),
    tintColor: Color.white,
  },
});
