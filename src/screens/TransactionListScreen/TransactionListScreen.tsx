// Library Imports
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
// Relative Imports
import { AppContainer, AppHeader } from "../../components";
import { Color, Images, Responsive, Screen } from "../../utils";
import _ from "lodash";

const TRANSACTION_LIST = "transactions";
const SUMMARY_COLLECTION = "summary";
const FirestoreSummary2024 = firestore()
  .collection(SUMMARY_COLLECTION)
  .doc("2024");
const FirestoreTransactions = firestore().collection(TRANSACTION_LIST);

interface TransactionListScreenProps {
  navigation: any;
}

const TransactionListScreen: React.FC<TransactionListScreenProps> = (props) => {
  const [transactionList, setTransactionList] = useState([]);
  const onPressItem = (item: any) => {
    const { navigation } = props;
    navigation.navigate(Screen.TransactionDetailScreen, { item });
  };

  const onPressAdd = () => {
    const { navigation } = props;
    navigation.navigate(Screen.AddTransactionScreen);
  };

  useEffect(() => {
    getTransactionList();
    const subscriber = FirestoreTransactions.onSnapshot(setReceivedData);
    return () => subscriber();
  }, []);

  const getTransactionList = async () => {
    FirestoreTransactions.get().then(setReceivedData);
  };

  const saveSummary = (summary: any) => {
    FirestoreSummary2024.set(summary);
  };

  const calculateSummary = (list) => {
    const totalTransactions = list?.length.toString();
    const totalAmount = _.sumBy(list, (item) => Number(item?.amount))
      .toFixed(2)
      .toString();
    const maxTransaction = _.maxBy(list, (item) => Number(item?.amount));
    const minTransaction = _.minBy(list, (item) => Number(item?.amount));
    saveSummary({
      totalTransactions,
      totalAmount,
      maxTransaction,
      minTransaction,
    });
  };

  const setReceivedData = (transactions: any) => {
    const tempList: any[] | ((prevState: never[]) => never[]) = [];
    transactions.docs.map((doc: any) => tempList.push(doc.data()));
    calculateSummary(tempList);
    setTransactionList(tempList);
  };

  return (
    <AppContainer>
      <AppHeader isAddButton onPressAdd={onPressAdd} />
      <View style={styles.flatListContainer}>
        <FlatList
          data={transactionList}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemContent}>
                <View style={styles.itemContent}>
                  <Text style={styles.titleText}>{item?.title}</Text>
                </View>
                <TouchableOpacity
                  style={styles.rightTouch}
                  onPress={() => onPressItem(item)}
                >
                  <Text style={styles.amountText}>{`$${item?.amount}`}</Text>
                  <Image
                    source={Images.right}
                    style={styles.rightImg}
                    resizeMode={"contain"}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
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
    backgroundColor: Color.themeGrey
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
    height: '70%',
    width: Responsive.scale(20),
    tintColor: Color.white,
    marginLeft: Responsive.scale(10)
  },
  rightTouch: {
    flexDirection: 'row',
    height: Responsive.verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center'
  }
});
