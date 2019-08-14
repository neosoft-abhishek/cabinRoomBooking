import React, { Component } from "react";
import {
  View,
  ImageBackground,
  Button,
  TouchableOpacity,
  Text,
  FlatList
} from "react-native";
import { constants } from "../utils/Constants";
import DateTimePicker from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../utils/Colors";
import moment, { min } from "moment";

const timeSlot = [
  { id: 0, time: 15 },
  { id: 1, time: 30 },
  { id: 2, time: 45 },
  { id: 3, time: 60 },
  { id: 4, time: 75 },
  { id: 5, time: 90 }
];

export default class SelectSlot extends Component {
  static navigationOptions = {
    title: constants.TIMING
  };

  constructor(props) {
    super(props);
    var params = this.props.navigation.state.params;
    this.state = {
      isDateTimePickerVisible: false,
      bufferText: "00",
      startTime: "Start Time",
      startTimeValue: new Date(),
      endTime: "End Time",
      showStartText: false,
      showEndText: false,
      displayBuffer: false,
      bookingTime: params ? params.bookingTime : [],
      roomName: params ? params.roomName : "Room",
      roomCapacity: params ? params.roomCapacity : 0
    };
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    //var hoursC = date.getHours(); //Current Hours
    //var minC = date.getMinutes(); //Current Minutes
    const newStartTime = moment(date).format("hh:mm a");
    // const oldTime =new Date()
    // var now = "04/09/2013 15:00:00";
    // var then = "04/09/2013 14:20:30";

    // const differ = moment
    //   .utc(
    //     moment(date, "DD/MM/YYYY HH:mm a").diff(
    //       moment(oldTime, "DD/MM/YYYY HH:mm a")
    //     )
    //   )
    //   .format("HH:mm a");

    //   console.log('Differ',differ)

    this.setState({
      startTimeValue: date,
      startTime: newStartTime,
      showStartText: true
    });

    this.hideDateTimePicker();
    //this.checkAvailableTime(date);
  };

  checkAvailableTime = value => {
    const { startTime, bookingTime } = this.state;
    const compareTime = moment(value, "DD/MM/YYYY HH:mm");
    if (bookingTime) {
      bookingTime.map((data, index) => {
        const start = moment(data.startTime, "DD/MM/YYYY HH:mm");
        const end = moment(data.endTime, "DD/MM/YYYY HH:mm");

        if (moment(start).isAfter(compareTime)) {
          console.log(
            "Is Same" +
              moment.utc(moment(compareTime).diff(start)).format("mm"),
            +(moment.utc(moment(compareTime).diff(start)).format("mm") / 15)
          );
        } else if (moment(compareTime).isBetween(start, end)) {
          return console.log("IS Between");
        } else {
          console.log("IS None");
        }
      });
    }
  };

  _keyExtractor = (item, index) => item.id;

  bufferCall = value => {
    var endDate = moment(this.state.startTimeValue)
      .add(value, "m")
      .toDate();

    var lastDate = moment(endDate).format("hh:mm a");

    this.setState({
      bufferText: value,
      endTime: lastDate,
      showEndText: true
    });
  };

  renderTiming = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this.bufferCall(item.time)}
        style={styles.slotTouchable}
      >
        <Text style={styles.bufferText}>{item.time}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {roomCapacity, roomName,bufferText, startTime, endTime, showEndText, showStartText} = this.state
    return (
      <ImageBackground
        source={{
          uri:
            "https://images.neosofttech.com/sites/all/themes/neosoft2017/images/banner.jpg"
        }}
        style={styles.imageBackground}
      >
        <Text style={styles.titleStyle}>{ roomName}</Text>
        <Text style={styles.bufferText}>
          {constants.ROOM_CAPACITY}
          { roomCapacity}
        </Text>
        <Icon name="calendar-clock" size={150} color={colors.THEME_COLOR} />
        <Button title={constants.SELECT_DATE_TIME} onPress={null} />

        <View style={styles.slotView}>
          <View>
            <TouchableOpacity
              onPress={this.showDateTimePicker}
              style={[
                styles.timeView,
                {
                  backgroundColor:  showStartText
                    ? colors.THEME_COLOR
                    : colors.WHITE
                }
              ]}
            >
              <Text
                style={[
                  styles.timeText,
                  {
                    color:  showStartText
                      ? colors.WHITE
                      : colors.THEME_COLOR
                  }
                ]}
              >
                { startTime}
              </Text>
            </TouchableOpacity>
            { showStartText && (
              <Text style={{ textAlign: "center" }}>
                {constants.START_TIME}
              </Text>
            )}
          </View>
          <Text style={styles.bufferText}>{ bufferText} min</Text>
          <View>
            <TouchableOpacity
              onPress={() => this.setState({ displayBuffer: true })}
              style={[
                styles.timeView,
                {
                  backgroundColor:  showEndText
                    ? colors.THEME_COLOR
                    : colors.WHITE
                }
              ]}
            >
              <Text
                style={[
                  styles.timeText,
                  {
                    color:  showEndText
                      ? colors.WHITE
                      : colors.THEME_COLOR
                  }
                ]}
              >
                { endTime}{" "}
              </Text>
            </TouchableOpacity>
            { showEndText && (
              <Text style={{ textAlign: "center" }}>{constants.END_TIME}</Text>
            )}
          </View>
        </View>

        { showStartText && (
          <>
            <Text style={{ marginTop: 10 }}>{constants.SLOT_TIME}</Text>
            <FlatList
              data={timeSlot}
              horizontal={false}
              numColumns={3}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this.renderTiming}
            />
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={
                ()=> this.props.navigation.navigate("BookingRoomDetails",{
                  roomCapacity: roomCapacity,
                  roomName:  roomName,
                  startTime: startTime,
                  endTime: endTime,
                  duration: bufferText,
                  onCancel:false
                 })}
            >
              <Text>{constants.DONE}</Text>
            </TouchableOpacity>
          </>
        )}
        <DateTimePicker
          mode={"time"}
          minimumDate={new Date()}
          minuteInterval={15}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </ImageBackground>
    );
  }
}
const styles = {
  imageBackground: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    padding: "5%"
  },
  bufferText: {
    color: colors.BLACK,
    marginBottom: 5,
    fontSize: 16
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.BLACK,
    margin: 2
  },
  slotTouchable: {
    borderWidth: 1,
    padding: 15,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderColor: colors.THEME_COLOR,
    borderRadius: 15
  },
  timeText: {
    color: colors.THEME_COLOR,
    fontWeight: "700",
    fontSize: 16
  },
  timeView: {
    borderWidth: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderColor: "gray",
    borderRadius: 15
  },
  slotView: {
    width: "100%",
    height: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  buttonStyle: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.THEME_COLOR,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  }
};
