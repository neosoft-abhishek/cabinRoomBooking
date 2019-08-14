import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { colors } from "../utils/Colors";
import { constants } from "../utils/Constants";

class BookingRoomDetails extends Component {
  static navigationOptions = {
    title: "Details",
    addReason: "",
    email: ""
  };
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    this.state = {
      getParams: params ? params : {}
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
          {this.renderEmployeeDetails(constants.DURATION, duration)}

          <View style={styles.rowView}>
            <Text style={styles.keyText}>{constants.REASON} - </Text>
            <TextInput
              style={[styles.styleTextInput, { width: "55%" }]}
              placeholder={"add reason"}
              multiline={true}
              ref={input => (this.password = input)}
              onSubmitEditing={() => {
                Keyboard.dismiss;
              }}
              //blurOnSubmit={false}
              returnKeyType={"done"}
              //onChangeText={this.onChangeValue("password")}
            />
          </View>
          <View style={styles.rowView}>
            <Text style={styles.keyText}>{constants.SEND_INVITE} - </Text>
            <View style={{ width: "55%" }}>
              <TextInput
                style={styles.styleTextInput}
                placeholder={"add email address 1"}
                ref={input => (this.password = input)}
                onSubmitEditing={() => {
                  Keyboard.dismiss;
                }}
                //blurOnSubmit={false}
                returnKeyType={"done"}
                //onChangeText={this.onChangeValue("password")}
              />
              <TextInput
                style={styles.styleTextInput}
                placeholder={"add email address 2"}
                ref={input => (this.password = input)}
                onSubmitEditing={() => {
                  Keyboard.dismiss;
                }}
                //blurOnSubmit={false}
                returnKeyType={"done"}
                //onChangeText={this.onChangeValue("password")}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => this.props.navigation.navigate("PreviousBookRoom")}
        >
          <Text>{constants.DONE}</Text>
        </TouchableOpacity>

        {onCancel && (
          <TouchableOpacity
            style={[styles.buttonStyle, { marginTop: 10 }]}
            onPress={() => null}
          >
            <Text>{constants.CANCEL}</Text>
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
    width: "40%"
  },
  valueText: {
    fontSize: 15,
    marginTop: 4,
    width: "60%",
    color: colors.THEME_COLOR
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
    borderWidth: 1,
    borderColor: colors.THEME_COLOR,
    top: "5%",
    width: "85%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  }
};

export default BookingRoomDetails;
