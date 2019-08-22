import React, { Component } from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { constants } from "../utils/Constants";
import { colors } from "../utils/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/Feather";
import { bindActionCreators } from "redux";
import { callAllCabins } from "../action/index";
import { connect } from "react-redux";
import Loader from "../commonComponent/Loader";

const arrayOfMeetingRoom = [
  {
    id: 0,
    room: "Meeting Room 1",
    available: true,
    capacity: 3,
    bookingTime: [
      {
        startTime: "2019-08-22T16:00:00.898Z",
        endTime: "2019-08-22T16:15:00.898Z"
      },
      {
        startTime: "2019-08-22T16:15:00.898Z",
        endTime: "2019-08-22T16:30:00.898Z"
      },
      {
        startTime: "2019-08-22T18:00:00.898Z",
        endTime: "2019-08-22T18:45:00.898Z"
      },
      {
        startTime: "2019-08-22T20:00:00.898Z",
        endTime: "2019-08-22T20:45:00.898Z"
      }
    ]
  },
  {
    id: 1,
    room: "Meeting Room 2",
    available: false,
    capacity: 3,
    bookingTime: [
      {
        startTime: "2019-08-19T16:00:00",
        endTime: "2019-08-19T16:15:00"
      },
      {
        startTime: "2019-08-19T17:15:00",
        endTime: "2019-08-19T17:30:00"
      },
      {
        startTime: "2019-08-19T15:00:00",
        endTime: "2019-08-19T15:45:00"
      },
      {
        startTime: "2019-08-19T19:00:00",
        endTime: "2019-08-19T19:45:00"
      }
    ]
  },
  {
    id: 2,
    room: "Meeting Room 3",
    capacity: 3,
    available: true,
    bookingTime: []
  },
  {
    id: 3,
    room: "Meeting Room 4",
    capacity: 4,
    available: false,
    bookingTime: []
  },
  {
    id: 4,
    room: "Meeting Room 5",
    capacity: 4,
    available: true,
    bookingTime: []
  },
  {
    id: 5,
    room: "Conference Room 1",
    capacity: 8,
    available: true,
    bookingTime: []
  },
  {
    id: 6,
    room: "Conference Room 2",
    capacity: 10,
    available: false,
    bookingTime: []
  },
  {
    id: 7,
    room: "Conference Room 3",
    capacity: 12,
    available: false,
    bookingTime: []
  }
];

class MeetingRoom extends Component {
  static navigationOptions = {
    title: constants.MEETING_ROOM,
    headerStyle: {
      backgroundColor: "#fff"
    },
    headerTintColor: "#000"
  };

  constructor(props) {
    super(props);
    var getParams = this.props.navigation.state.params;
    this.state = {
      locationArea: getParams.locationArea,
      locationId: getParams.locationId,
      getAllCabins: []
    };
  }

  componentDidMount() {
    this.props.callAllCabins(this.state.locationId);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.getAllCabins && props.getAllCabins !== state.getAllCabins) {
      return {
        getAllCabins: props.getAllCabins
      };
    }
    return null;
  }

  _keyExtractor = (item, index) => item.id;

  renderItems = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("SelectSlot", {
            bookingTime: item.bookings,
            roomName: item.name,
            roomCapacity: item.capacity
          })
        }
        style={[
          styles.slotTouchable
          // { borderColor: item.available ? colors.GREEN : colors.YELLOW }
        ]}
      >
        <Text style={styles.topText}>
          <Icons name={"users"} size={16} color={colors.THEME_COLOR} /> {""}
          {item.capacity}{" "}
        </Text>
        <Icon
          name={item.available ? "home-city-outline" : "home-alert"}
          size={50}
          color={item.bookings.length < 5 ? colors.GREEN : colors.THEME_COLOR}
        />
        <Text style={[styles.bufferText, { fontWeight: "400" }]}>
          {item.name}
        </Text>
        <Text style={[styles.bufferText, { color: colors.GRAY }]}>
          {item.bookings.length < 5
            ? constants.BOOK_ROOM
            : constants.SOME_ROOM_AVAILABLE}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleStyle}>{this.state.locationArea}</Text>
        <Loader loading={this.props.isLoading} />
        <FlatList
          contentContainerStyle={{ alignItems: "center" }}
          data={this.state.getAllCabins}
          extraData={this.state}
          horizontal={false}
          numColumns={2}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderItems}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    padding: "1%",
    backgroundColor: "#f7f7f7"
  },
  titleStyle: {
    margin: 5,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: colors.THEME_COLOR
  },
  topText: {
    position: "absolute",
    top: 5,
    right: 5,
    color: colors.GRAY
  },
  bufferText: {
    color: colors.BLACK,
    fontSize: 14,
    textAlign: "center"
  },
  slotTouchable: {
    borderWidth: 1,
    width: 150,
    height: 150,
    backgroundColor: "#fff",
    padding: 10,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderColor: colors.GRAY,
    borderRadius: 15,
    elevation: 5,
    //borderWidth: 1,
    //borderColor: "#ddd",
    borderBottomWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  }
};

mapStateToProps = state => {
  return {
    getAllCabins: state.GetAllCabins.payload.data,
    isLoading: state.GetAllCabins.isLoading,
    failureAPI: state.GetAllCabins.onFailureData
  };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      callAllCabins
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MeetingRoom);
