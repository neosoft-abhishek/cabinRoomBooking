import React, { Component } from "react";
import { View,StatusBar, Text, TouchableOpacity, FlatList, Image, ImageBackground } from "react-native";
import { colors } from "../utils/Colors";
import { constants } from "../utils/Constants";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNavigation } from "react-navigation";

const data = [
  {
    roomName: "Meeting Room 1",
    id: 0,
    capacity: 3,
    startTiming: "01:15 pm",
    duration: "15 min",
    endTime: "01:30 pm"
  },
  {
    roomName: "Conference Room 1",
    capacity: 12,
    id: 1,
    duration: "75 min",
    startTiming: "03:15 pm",
    endTime: "04:30 pm"
  }
];

class PreviousBookRoom extends Component {
  static navigationOptions = {
    title: "Home",
    headerLeft: null
  };

  constructor(props) {
    super(props);
    this.state = {
      bookingList: []
    };

   // this.updateRender = this.updateRender.bind(this);
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("didFocus", data => {
      var that = this;
      that.updateRender();
      // this.setState({ bookingList: this.props.arrayList })
    });
  }
  updateRender = () => {
    this.setState({ bookingList: this.props.arrayList });
  };

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  componentDidUpdate(prevProps, nextState) {
    // Typical usage (don't forget to compare props):
    if (this.props.arrayList !== prevProps.arrayList) {
      this.setState({ bookingList: this.props.arrayList });
      //return true
    }
  }
  _keyExtractor = (item, index) => item.startTime;

  renderDetails = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.cardView}
        onPress={() =>
          this.props.navigation.navigate("BookingRoomDetails", {
            roomCapacity: item.roomCapacity,
            roomName: item.roomName,
            startTime: item.startTime,
            endTime: item.endTime,
            duration: item.duration,
            onCancel: true,
            reason: item.reason,
            email_1 : item.email_1,
            email_2: item.email_2

          })
        }
      >
        <View style={styles.rowView}>
          <View>
            <Text style={styles.cardTitleText}>{item.roomName}</Text>
            <Text style={styles.cardSubTitleText}>
              {constants.ROOM_CAPACITY} {item.roomCapacity}
            </Text>
          </View>

          <Image
            style={styles.iconStyle}
            source={require("../assert/reserved.jpg")}
          />
        </View>

        <View style={styles.rowView}>
          <Text>
            <Text style={{ color: colors.THEME_COLOR }}>Start: </Text>
            {item.startTime}
          </Text>
          <Text style={{ color: colors.THEME_COLOR }}>
            {" "}
            {item.duration} min
          </Text>
          <Text>
            <Text style={{ color: colors.THEME_COLOR }}>End:</Text>{" "}
            {item.endTime}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <ImageBackground
      source={{
        uri:
          "https://images.neosofttech.com/sites/all/themes/neosoft2017/images/banner.jpg"
      }} style={styles.container}>
         <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.THEME_COLOR}
        />
        <Text style={styles.bookingStyle}>
          {constants.BOOKING_LABEL} {""}
          <Text
            onPress={() =>
              this.props.navigation.navigate("LocationList", {
                backKey: ""
              })
            }
            style={{
              color: colors.THEME_COLOR,
              textDecorationLine: "underline"
            }}
          >
            {constants.CLICK_HERE}
          </Text>
        </Text>

        <FlatList
          data={this.state.bookingList}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderDetails}
        />
      </ImageBackground>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7"
  },
  bookingStyle: {
    textAlign: "center",
    fontSize: 14,
    marginHorizontal:30,
    margin: 10
  },
  cardTitleText: {
    fontSize: 14,
    color: colors.THEME_COLOR
  },
  iconStyle: {
    width: 70,
    height: 50,
    margin:4,
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

const mapStateToProps = state => {
  return {
    arrayList: state.UserDetails.userDetails
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      //pushArrayList: pushUserDataList
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviousBookRoom);
