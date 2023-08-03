import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, Button } from 'react-native';
import stores from './data/data.json';

const {width: SCREEN_WIDTH} = Dimensions.get("window")

export default function SeatScreen({ route, navigation }) {
    const { storeId } = route.params;
    var store = stores[storeId];
    const [tableNum, setTableNum] = useState(0);

    const getSeat = (storeId) => {
        var store = stores[storeId];
        var seats = store["seat"];
  
        return(
          seats.map((seatRow, row) => (
            <View key={row} style={{flexDirection: 'row'}}>
              {
                seatRow.map((seat, col) => (
                  seat ? 
                  seatsStatus[seat] ?
                  <Pressable key={row * 100 + col} style={styles.availableSeat} onPress={() =>
                    {setModalVisible(!modalVisible), setTableNum(seat)}}>
                    <Text style={styles.seatName}>좌석{seat}</Text>
                  </Pressable>
                  :
                  <Pressable key={row * 100 + col} style={styles.reservedSeat} onPress={() =>
                    {setTableNum(seat)}}>
                    <Text style={styles.seatName}>좌석{seat}</Text>
                  </Pressable>
                  :
                  <View key={row * 100 + col} style={styles.notSeat}></View>
                ))
              }
            </View>
          ))
        );
      };

    return (
        <View style={styles.container}>
          <View style={styles.storeCell}>
            <View style={styles.storeDescription}>
              {/* <Image source={{uri: store.image}} style={styles.storeImage}></Image> */}
              <View>
                <Text style={styles.storeName}>{store.name}</Text>
                <Text style={styles.storeTag}>{store.tag}</Text>
                <Text style={styles.storeLocation}>{store.location}</Text>
              </View>
            </View>
          </View>
          <View style={styles.seats}>
          <View style={{alignItems: 'center'}}>
            {getSeat(storeId)}
            <Button title="예약하기" onPress={() => ws.send(JSON.stringify({'storeId': storeId, 'tableNum': tableNum, 'command': 'reserve'}))}/>
            <Button title="취소하기" onPress={() => ws.send(JSON.stringify({'storeId': storeId, 'tableNum': tableNum, 'command': 'cancel'}))}/>
          </View>
          </View>
        </View>
      );
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e6e6fa',
    },
    title: {
      height: "7%",
      padding: 10,
      justifyContent: "center",
      alignItems: "flex-start",
    },
    titleName: {
      fontSize: 30,
      fontWeight: "500",
    },
    row: {
      flexDirection: 'row',
      width: SCREEN_WIDTH,
      justifyContent: "center",
    },
    availableSeat: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      borderStyle: 'solid',
      borderWidth: 1,
      margin: 10,
      padding: 5,
      borderRadius: 7,
      height: 50,
      width: 50,
    },
    reservedSeat: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#616161",
      borderStyle: 'solid',
      borderWidth: 1,
      margin: 10,
      padding: 5,
      borderRadius: 7,
      height: 50,
      width: 50,
    },
    seatName: {
      fontSize: 13,
      fontWeight: "500",
    },
    notSeat: {
      justifyContent: "center",
      backgroundColor: "#fff",
      margin: 10,
      padding: 5,
      borderRadius: 7,
      height: 50,
      width: 50,
    },
    storeName: {
      fontSize: 22,
      fontWeight: "500",
    },
    storeImage: {
      width: 60,
      height: 60,
      margin: 5,
      borderRadius: 7,
    },
    storeTag: {
  
    },
    storeCell: {
      flex: 1,
      backgroundColor: "white",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 7,
      margin: 5,
      
      // Shadow properties for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      shadowColor: 'black',
      // Elevation for Android (comment this out if you're using iOS shadow properties)
      elevation: 3,
    },
    storeDescription: {
      flexDirection: "row",
      alignItems: "center",
    },
    seats: {
      flex: 8,
      backgroundColor: "white",
      borderRadius: 7,
      margin: 5,
    }
  });