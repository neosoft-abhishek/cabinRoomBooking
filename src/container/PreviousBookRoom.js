import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { colors } from "../utils/Colors";
const data = [
  {
    roomName: "Meeting Room 1",
    id: 0,
    capacity: 3,
    startTiming: "01:15 pm",
    duration:'15 min',
    endTime: "01:30 pm"
  },
  {
    roomName: "Conference Room 1",
    capacity: 12,
    id: 1,
    duration:'75 min',
    startTiming: "03:15 pm",
    endTime: "04:30 pm"
  }
];

class PreviousBookRoom extends Component {
  static navigationOptions = {
    title: "Dashboard",
    headerLeft: null
  };

  constructor(props) {
    super(props);
    this.state = {};
  }
  _keyExtractor = (item, index) => item.id;

  renderDetails = ({item}) => {
    return (
      <TouchableOpacity style={styles.cardView}
      onPress={
        ()=> this.props.navigation.navigate("BookingRoomDetails",{
          roomCapacity: item.capacity,
          roomName:  item.roomName,
          startTime: item.startTiming,
          endTime: item.endTime,
          duration: item.duration,
          onCancel: true
         })}
    >
        <View style={styles.rowView}>
          <View>
            <Text style={styles.cardTitleText}>{item.roomName}</Text>
            <Text style={styles.cardSubTitleText}>room capacity {item.capacity}</Text>
          </View>
          <Image
            style={styles.iconStyle}
            source={require("../assert/reserved.jpg")}
          />
        </View>

        <View style={styles.rowView}>
          <Text>{item.startTiming}</Text>
          <Text style = {{color:colors.THEME_COLOR}}>{item.duration}</Text>
          <Text>{item.endTime}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.bookingStyle}>
            If you want to book a room then {''}
            <Text onPress = {()=> this.props.navigation.navigate('LocationList',{
                backKey:''
            })}
            style = {{color:colors.THEME_COLOR, textDecorationLine:'underline'}}>Click here</Text>
            </Text>
        <FlatList
          data={data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderDetails}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7"
  },
  bookingStyle:{
      textAlign:'center',
      fontSize:14,
      margin:10
  },
  cardTitleText: {
    fontSize: 14,
    color: colors.THEME_COLOR
  },
  iconStyle: {
    width: 70,
    height: 50,
    resizeMode: "contain"
  },
  cardSubTitleText: {
    fontSize: 12,
    color: colors.GRAY
  },
  rowView: {
    justifyContent: "space-between",
    flexDirection: "row"
  },
  cardView: {
    padding: 10,
    backgroundColor: colors.WHITE,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderBottomWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
    // borderColor: "red"
  }
};

export default PreviousBookRoom;
