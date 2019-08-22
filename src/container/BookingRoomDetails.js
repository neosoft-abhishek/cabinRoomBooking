import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert
} from "react-native";
import { colors } from "../utils/Colors";
import { constants } from "../utils/Constants";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { pushUserDataList } from "../action/index";

class BookingRoomDetails extends Component {
  static navigationOptions = {
    title: "Details",
    headerStyle: {
      backgroundColor: "#fff"
    },
    headerTintColor: "#000"
  };

  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    this.state = {
      getParams: params ? params : {},
      emails: [],
      reason: params.reason ? params.reason : "",
      email_1: params.email_1 ? params.email_1 : "",
      email_2: params.email_2 ? params.email_2 : ""
    };
  }

  renderEmployeeDetails = (key, value) => {
    return (
      <View style={styles.rowView}>
        <Text style={styles.keyText}>{key} - </Text>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    );
  };

  onDone = () => {
    const {
      roomCapacity,
      roomName,
      startTime,
      endTime,
      duration
    } = this.state.getParams;

    const obj = {
      roomName: roomName,
      roomCapacity: roomCapacity,
      startTime: startTime,
      endTime: endTime,
      duration: duration,
      reason: this.state.reason,
      email_1: this.state.email_1,
      email_2: this.state.email_2
    };

    let pushUserDataList = [];
    let saveData = this.props.arrayList ? this.props.arrayList : [];
    pushUserDataList = saveData;
    pushUserDataList.push(obj);

    if (obj) {
      this.props.pushArrayList(pushUserDataList);
      this.props.navigation.navigate(
        //({ routeName: 'PreviousBookRoom', params: { someParam: 'PreviousBookRoom' }, key: 'PreviousBookRoom' })
        "PreviousBookRoom"
      );
    }
  };

  buttonEnable = () => {
    const { reason, email_1 } = this.state;
    return reason && email_1;
  };

  onChangeValue(name) {
    return text => {
      this.setState({ [name]: text });
    };
  }

  onDeleteRoom = filterObj => {
    this.props.pushArrayList(filterObj);
    this.props.navigation.goBack();
  };

  onCancelMeeting = () => {
    const {
      roomCapacity,
      roomName,
      startTime,
      endTime,
      duration
    } = this.state.getParams;

    const clearObject = {
      roomName: roomName,
      roomCapacity: roomCapacity,
      startTime: startTime,
      endTime: endTime,
      duration: duration,
      reason: this.state.reason,
      email_1: this.state.email_1,
      email_2: this.state.email_2
    };
    let saveArray = this.props.arrayList;
    let filterObj = saveArray.filter(obj => {
      if (JSON.stringify(obj) !== JSON.stringify(clearObject)) {
        return obj;
      }
    });
    Alert.alert("Delete", constants.DELETE_MEETING_LABEL, [
      { text: "Ok", onPress: () => this.onDeleteRoom(filterObj) },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      }
    ]);
  };

  render() {
    const {
      roomCapacity,
      roomName,
      startTime,
      endTime,
      duration,
      onCancel
    } = this.state.getParams;
    return (
      <View style={styles.container}>
        <Text style={styles.titleStyle}>{roomName}</Text>
        <Text style={styles.smallText}>
          {constants.ROOM_CAPACITY}
          {roomCapacity}
        </Text>
        <View style={styles.cardBlockView}>
          {this.renderEmployeeDetails(
            constants.EMPLOYEE_NAME,
            "Abhishek Jaiswal"
          )}
          {this.renderEmployeeDetails(constants.EMPLOYEE_ID, "3295")}
          {this.renderEmployeeDetails(constants.START_TIME, startTime)}
          {this.renderEmployeeDetails(constants.END_TIME, endTime)}
          {this.renderEmployeeDetails(constants.DURATION, `${duration} min`)}

          <View style={styles.rowView}>
            <Text style={styles.keyText}>{constants.REASON} - </Text>
            <TextInput
              style={[styles.styleTextInput, { width: "55%" }]}
              placeholder={"add reason"}
              multiline={true}
              //ref={input => (this. = input)}
              onSubmitEditing={() => {
                this.email_1.focus();
                // Keyboard.dismiss;
              }}
              blurOnSubmit={false}
              returnKeyType={"next"}
              onChangeText={this.onChangeValue("reason")}
              value={this.state.reason}
            />
          </View>
          <View style={styles.rowView}>
            <Text style={styles.keyText}>{constants.SEND_INVITE} - </Text>
            <View style={{ width: "55%" }}>
              <TextInput
                style={styles.styleTextInput}
                placeholder={"add email address 1"}
                ref={input => (this.email_1 = input)}
                onSubmitEditing={() => {
                  this.email_2.focus();
                  //Keyboard.dismiss;
                }}
                blurOnSubmit={false}
                returnKeyType={"next"}
                onChangeText={this.onChangeValue("email_1")}
                value={this.state.email_1}
              />
              <TextInput
                style={styles.styleTextInput}
                placeholder={"add email address 2"}
                ref={input => (this.email_2 = input)}
                onSubmitEditing={() => {
                  Keyboard.dismiss;
                }}
                //blurOnSubmit={false}
                returnKeyType={"done"}
                onChangeText={this.onChangeValue("email_2")}
                value={this.state.email_2}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            {
              backgroundColor: this.buttonEnable()
                ? colors.THEME_COLOR
                : colors.FADE_COLOR
            }
          ]}
          disabled={!this.buttonEnable()}
          onPress={() => this.onDone()}
        >
          <Text style={styles.buttonText}>{constants.DONE}</Text>
        </TouchableOpacity>

        {onCancel && (
          <TouchableOpacity
            style={[styles.buttonStyle, { marginTop: 10 }]}
            onPress={() => this.onCancelMeeting()}
          >
            <Text style={styles.buttonText}>{constants.CANCEL}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1
    //  justifyContent: "center",
    //  alignItems: "center",
    //backgroundColor: colors.BLACK
  },
  rowView: {
    flexDirection: "row",
    marginStart: "5%",
    margin: 5
  },
  keyText: {
    fontSize: 14,
    marginTop: 4,
    width: "40%",
    color: colors.BLACK
  },
  valueText: {
    fontSize: 15,
    marginTop: 4,
    width: "60%",
    color: colors.GRAY
  },
  cardBlockView: {
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  smallText: {
    //color: colors.WHITE,
    marginBottom: 5,
    textAlign: "center",
    fontSize: 16
  },
  titleStyle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: colors.THEME_COLOR
  },
  styleTextInput: {
    //height: 100,
    // width: "55%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "green",
    margin: 4,
    padding: 5
    //marginBottom: 20,
    // borderWidth: 0
    //borderBottomWidth: 1,
    //borderBottomColor: "gray"
  },
  buttonStyle: {
    borderRadius: 10,
    backgroundColor: colors.THEME_COLOR,
    borderWidth: 1,
    borderColor: colors.THEME_COLOR,
    top: "5%",
    width: "85%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700"
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
      pushArrayList: pushUserDataList
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingRoomDetails);
