import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onLoginClick } from "../action/index";
import Icon from "react-native-vector-icons/FontAwesome";
import { constants } from "../utils/Constants";
import { colors } from "../utils/Colors";
import DropdownAlert from "react-native-dropdownalert";
import { emptyString, validateEmail } from "../utils/Validation";
import { callbackApiCalling } from "../services/APICallbackMethod";
import { urls } from "../services/Url";

class Login extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.props.demoUrlHit();
  }

  state = {
    emailId: "",
    password: ""
  };

  isEmpty = (str, key) => {
    if (emptyString(str)) {
      return true;
    } else {
      this.dropDownAlertRef.alertWithType(
        "error",
        "Error",
        `${key} should not be empty`
      );
    }
  };

  isEmailValidate = email => {
    if (validateEmail(email)) {
      return true;
    } else {
      this.dropDownAlertRef.alertWithType(
        "error",
        "Error",
        `This is not valid email address, please enter valid email address`
      );
    }
  };

  onPressEvent = () => {
    const { emailId, password } = this.state;
    const body = {
      email: "pushkar.abhishek@neosofttech.com",
      password: "qwerty1234"
    };

    if (
      this.isEmpty(emailId, "email address") &&
      this.isEmpty(password, "password") &&
      this.isEmailValidate(emailId)
    ) {
      callbackApiCalling
        .post(urls.loginUrl, body, null, null)
        .then(response => {
          if (response.data.success) {
            this.props.navigation.navigate("LocationList");
          } else {
            alert("Something went wrong...");
          }
        })
        .catch(error => {
          console.log("error", error);
        });
    }
  };

  onChangeValue(name) {
    return text => {
      this.setState({ [name]: text });
    };
  }

  buttonEnable = () => {
    const { emailId, password } = this.state;
    return emailId && password;
  };

  validation = (event, value, error) => {
    if (event.nativeEvent.text && value) {
      value.focus();
    } else {
      this.dropDownAlertRef.alertWithType(
        "error",
        "Error",
        `${error} should not be empty`
      );
    }
  };

  render() {
    const { invisible } = this.state;
    return (
      <KeyboardAvoidingView style={styles.parentView} behavior="padding">
        <Image
          style={styles.logoImage}
          source={{ uri: "http://mis.neosofttech.in//images/logo.jpg" }}
        />
        <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
        <View style={styles.middleView}>
          <Text style={styles.titleText}>{constants.LOGIN_C}</Text>
          <View style={styles.inputView}>
            <View style={styles.iconView}>
              <Icon name="user" size={28} color={colors.THEME_COLOR} />
            </View>
            <TextInput
              style={styles.styleTextInput}
              ref={input => (this.emailId = input)}
              onSubmitEditing={text => {
                this.validation(text, this.password, "Email Id");
              }}
              blurOnSubmit={false}
              placeholder={constants.ENTER_EMAIL_ID}
              returnKeyType={"next"}
              onChangeText={this.onChangeValue("emailId")}
              //value={this.state.text}
            />
          </View>
          <View style={styles.inputView}>
            <View style={styles.iconView}>
              <Icon name="lock" size={28} color={colors.THEME_COLOR} />
            </View>
            <TextInput
              style={styles.styleTextInput}
              placeholder={constants.ENTER_PASSWORD}
              ref={input => (this.password = input)}
              onSubmitEditing={event => {
                this.validation(event, null, "Password");
                Keyboard.dismiss;
              }}
              //blurOnSubmit={false}
              returnKeyType={"done"}
              onChangeText={this.onChangeValue("password")}
            />
          </View>
          <View style={{ marginLeft: "55%" }}>
            <Text
              onPress={() => this.props.navigation.navigate("ForgotPassword")}
            >
              {constants.FORGOT_PASSWORD} ?
            </Text>
          </View>

          <View style={styles.bottomView}>
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
            <Text style={styles.bottomText}>
              {constants.NEED_AN_ACCOUNT}
              <Text
                onPress={() => this.props.navigation.navigate("Registration")}
                style={{
                  color: colors.THEME_COLOR,
                  textDecorationLine: "underline"
                }}
              >
                {constants.SIGN_UP}
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.HomeReducer
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      demoUrlHit: onLoginClick
    },
    dispatch
  );
};

const styles = {
  parentView: {
    alignItems: "center",
    flex: 0.8
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700"
  },
  logoImage: {
    width: "90%",
    height: 100,
    flex: 1,
    resizeMode: "contain"
  },
  middleView: {
    flex: 3,
    width: "90%",
    alignItems: "center"
  },
  titleText: {
    color: colors.THEME_COLOR,
    fontSize: 24,
    marginBottom: "6%",
    fontWeight: "700"
  },
  inputView: {
    flexDirection: "row",
    width: "90%"
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
  },
  bottomView: {
    width: "90%",
    top: "8%"
  },
  buttonStyle: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.THEME_COLOR,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  bottomText: {
    textAlign: "center",
    margin: 5
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
