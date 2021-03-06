import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  TextInput
} from "react-native";
import { constants } from "../utils/Constants";
import { colors } from "../utils/Colors";
import Icon from "react-native-vector-icons/FontAwesome";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";

export default class ResetPassword extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#fff"
    },
    headerTintColor: "#000"
  };

  state = {
    code: "",
    password: "",
    confirmPassword: ""
  };
  pinInput = React.createRef();
  _checkCode = code => {
    if (code != "1234") {
      this.pinInput.current.shake().then(() => this.setState({ code: "" }));
    }
  };

  onPressEvent = () => {
    this.props.navigation.navigate("Login");
  };

  onChangeValue(name) {
    return text => {
      this.setState({ [name]: text });
    };
  }

  buttonEnable = () => {
    const { code, password, confirmPassword } = this.state;
    return code && password && confirmPassword;
    
  };

  render() {
    const { code } = this.state;
    return (
      <View style={styles.parentView}>
        <Image
          style={styles.logoImage}
          source={{ uri: "http://mis.neosofttech.in//images/logo.jpg" }}
        />
        <Text style={styles.titleText}>{constants.RESET_PASSWORD}</Text>
        <Text>{constants.OTP_TEXT} </Text>
        <Text style={{ marginBottom: 15 }}>to xyz@gmail.com</Text>
        <SmoothPinCodeInput
          ref={this.pinInput}
          value={code}
          onTextChange={code => this.setState({ code })}
          onFulfill={this._checkCode}
          onBackspace={() => console.log("No more back.")}
        />

        <View style={[styles.inputView, { marginTop: 10 }]}>
          <View style={styles.iconView}>
            <Icon name="lock" size={28} color={colors.THEME_COLOR} />
          </View>
          <TextInput
            style={styles.styleTextInput}
            placeholder={constants.NEW_PASSWORD}
            ref={input => (this.password = input)}
            onSubmitEditing={() => {
              this.confirmPassword.focus();
            }}
            blurOnSubmit={false}
            secureTextEntry={true}
            returnKeyType={"next"}
            onChangeText={this.onChangeValue("password")}
          />
        </View>
        <View style={styles.inputView}>
          <View style={styles.iconView}>
            <Icon name="lock" size={28} color={colors.THEME_COLOR} />
          </View>
          <TextInput
            style={styles.styleTextInput}
            placeholder={constants.CONFIRM_PASSWORD}
            ref={input => (this.confirmPassword = input)}
            onSubmitEditing={() => {
              Keyboard.dismiss;
            }}
            //blurOnSubmit={false}
            secureTextEntry={true}
            returnKeyType={"done"}
            onChangeText={this.onChangeValue("confirmPassword")}
          />
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
          onPress={() => this.onPressEvent()}
        >
          <Text style={styles.buttonText}>{constants.DONE}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = {
  parentView: {
    flex: 1,
    alignItems: "center"
  },
  titleText: {
    color: colors.THEME_COLOR,
    fontSize: 24,
    marginTop: "10%",
    marginBottom: "2%",
    fontWeight: "700"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700"
  },
  buttonStyle: {
    top: "10%",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: colors.THEME_COLOR,
    borderColor: colors.THEME_COLOR,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  logoImage: {
    width: "90%",
    height: 100,
    resizeMode: "contain"
  },
  inputView: {
    flexDirection: "row",
    width: "80%"
  },
  iconView: {
    marginTop: 10,
    marginRight: 5
  },
  styleTextInput: {
    height: 40,
    width: "92%",
    padding: 5,
    marginBottom: 20,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "gray"
  }
};
