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

const timeFormat = "YYYY-MM-DDTHH:mm:ss";
const timeSlot_1 = [{ id: 0, time: 15 }];

const timeSlot_2 = [{ id: 0, time: 15 }, { id: 1, time: 30 }];

const timeSlot_3 = [
  { id: 0, time: 15 },
  { id: 1, time: 30 },
  { id: 2, time: 45 }
];

const timeSlot_4 = [
  { id: 0, time: 15 },
  { id: 1, time: 30 },
  { id: 2, time: 45 },
  { id: 3, time: 60 }
];

const timeSlot_5 = [
  { id: 0, time: 15 },
  { id: 1, time: 30 },
  { id: 2, time: 45 },
  { id: 3, time: 60 },
  { id: 4, time: 75 }
];

const timeSlot_6 = [
  { id: 0, time: 15 },
  { id: 1, time: 30 },
  { id: 2, time: 45 },
  { id: 3, time: 60 },
  { id: 4, time: 75 },
  { id: 5, time: 90 }
];

export default class SelectSlot extends Component {
  static navigationOptions = {
    title: constants.TIMING,
    headerStyle: {
      backgroundColor: "#fff"
    },
    headerTintColor: "#000"
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
      roomCapacity: params ? params.roomCapacity : 0,
      noSlot: "",
      bufferArray: ""
    };
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    const newStartTime = moment(date).format("hh:mm a");

    this.setState({
      startTimeValue: date,
      startTime: newStartTime,
      showStartText: true,
      bufferText: "00",
      endTime:'End Time'
    });

    this.hideDateTimePicker();
    this.checkAvailableTime(date);
  };

  compareDiff = (start, userStart) => {
    diff = moment(start).diff(userStart);
    const min = moment.duration(diff).minutes();
    const hour = moment.duration(diff).hours();
    const getTotalInMin = (hour * 60 + min) / 15;

    switch (getTotalInMin) {
      case 1:
        return this.setState({
          bufferArray: timeSlot_1,
          noSlot: constants.SLOT_TIME
        });
      case 2:
        return this.setState({
          bufferArray: timeSlot_2,
          noSlot: constants.SLOT_TIME
        });
      case 3:
        return this.setState({
          bufferArray: timeSlot_3,
          noSlot: constants.SLOT_TIME
        });
      case 4:
        return this.setState({
          bufferArray: timeSlot_4,
          noSlot: constants.SLOT_TIME
        });
      case 5:
        return this.setState({
          bufferArray: timeSlot_5,
          noSlot: constants.SLOT_TIME
        });
      default:
        return this.setState({
          bufferArray: timeSlot_6,
          noSlot: constants.SLOT_TIME
        });
    }
  };

  checkAvailableTime = value => {
    const { startTime, bookingTime } = this.state;
    const compareTime = moment(value, timeFormat);
    if (bookingTime && bookingTime.length > 0) {
      bookingTime.some((data, index) => {
        const start = moment(data.startTime, timeFormat);
        const end = moment(data.endTime, timeFormat);

        if (moment(start).isSame(compareTime)) {
          this.setState({ noSlot: constants.NO_SLOT, bufferArray:[] });
          return true;
        } else if (moment(compareTime).isBetween(start, end)) {
          this.setState({ noSlot: constants.NO_SLOT });
          return true;
        } else if (moment(start).isAfter(compareTime)) {
          this.compareDiff(start, compareTime);
          return true;
        }else{
          return this.setState({ bufferArray: timeSlot_6,
            noSlot: constants.SLOT_TIME,
          });
        }
      });
    }else{
      return this.setState({
        bufferArray: timeSlot_6,
        noSlot: constants.SLOT_TIME
      });
    }
  };

  _keyExtractor = (item, index) => item.id;
 
 addMinutesToDate = (date, minutes) => {
    return new Date(date.getTime() + minutes*60000);
}

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
    const {
      roomCapacity,
      roomName,
      bufferText,
      startTime,
      endTime,
      showEndText,
      showStartText
    } = this.state;
    return (
      <ImageBackground
        source={{
          uri:
            "https://images.neosofttech.com/sites/all/themes/neosoft2017/images/banner.jpg"
        }}
        style={styles.imageBackground}
      >
        <Text style={styles.titleStyle}>{roomName}</Text>
        <Text style={styles.bufferText}>
          {constants.ROOM_CAPACITY}
          {roomCapacity}
        </Text>
        <Icon name="calendar-clock" size={120} color={colors.THEME_COLOR} />
        <Button title={constants.SELECT_DATE_TIME} onPress={null} />

        <View style={styles.slotView}>
          <View>
            <TouchableOpacity
              onPress={this.showDateTimePicker}
              style={[
                styles.timeView,
                {
                  backgroundColor: showStartText
                    ? colors.THEME_COLOR
                    : colors.WHITE
                }
              ]}
            >
              <Text
                style={[
                  styles.timeText,
                  {
                    color: showStartText ? colors.WHITE : colors.THEME_COLOR
                  }
                ]}
              >
                {startTime}
              </Text>
            </TouchableOpacity>
            {showStartText && (
              <Text style={{ textAlign: "center" }}>
                {constants.START_TIME}
              </Text>
            )}
          </View>
          <Text style={styles.bufferText}>{bufferText} min</Text>
          <View>
            <TouchableOpacity
              onPress={() => this.setState({ displayBuffer: true })}
              style={[
                styles.timeView,
                {
                  backgroundColor: showEndText
                    ? colors.THEME_COLOR
                    : colors.WHITE
                }
              ]}
            >
              <Text
                style={[
                  styles.timeText,
                  {
                    color: showEndText ? colors.WHITE : colors.THEME_COLOR
                  }
                ]}
              >
                {endTime}{" "}
              </Text>
            </TouchableOpacity>
            {showEndText && (
              <Text style={{ textAlign: "center" }}>{constants.END_TIME}</Text>
            )}
          </View>
        </View>

        {showStartText && (
          <>
            <Text style={{ marginTop: 5, textAlign: "center" }}>
              {this.state.noSlot}
            </Text>
            <FlatList
              data={this.state.bufferArray}
              horizontal={false}
              numColumns={3}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this.renderTiming}
            />
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() =>
                this.props.navigation.navigate("BookingRoomDetails", {
                  roomCapacity: roomCapacity,
                  roomName: roomName,
                  startTime: startTime,
                  endTime: endTime,
                  duration: bufferText,
                  onCancel: false
                })
              }
            >
              <Text style = {styles.buttonText}>{constants.DONE}</Text>
            </TouchableOpacity>
          </>
        )}
        <DateTimePicker
          mode={"time"}
          minimumDate={this.addMinutesToDate(new Date(), 15)}
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700"
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
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  buttonStyle: {
    backgroundColor: colors.THEME_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.THEME_COLOR,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  }
};
