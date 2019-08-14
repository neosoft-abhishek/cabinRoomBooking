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
import Icon from "react-native-vector-icons/FontAwesome";
import { constants } from "../utils/Constants";
import { colors } from "../utils/Colors";
import { callbackApiCalling } from "../services/APICallbackMethod";
import { urls } from "../services/Url";

class Registration extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    confirmPassword: ""
  };

  componentDidMount() {
    callbackApiCalling
      .get(urls.demoUrl)
      .then(response => console.log("data", response))
      .catch(error => {
        console.log("data", error);
      });
  }

  onPressEvent = () => {
    this.props.navigation.navigate("OTPVerifivation");
  };

  onChangeValue(name) {
    return text => {
      this.setState({ [name]: text });
    };
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.parentView} behavior="padding">
        <Image
          style={styles.logoImage}
          source={{ uri: "http://mis.neosofttech.in//images/logo.jpg" }}
        />
        <View style={styles.middleView}>
          <Text style={styles.titleText}>{constants.SIGN_UP_C}</Text>
          <View style={styles.inputView}>
            <View style={styles.iconView}>
              <Icon name="user" size={28} color={colors.THEME_COLOR} />
            </View>
            <TextInput
              style={styles.styleTextInput}
              ref={input => (this.firstName = input)}
              onSubmitEditing={() => {
                this.lastName.focus();
              }}
              blurOnSubmit={false}
              placeholder={constants.FIRST_NAME}
              returnKeyType={"next"}
              onChangeText={this.onChangeValue("firstName")}
              //value={this.state.text}
            />
          </View>
          <View style={styles.inputView}>
            <View style={styles.iconView}>
              <Icon name="user" size={28} color={colors.THEME_COLOR} />
            </View>
            <TextInput
              style={styles.styleTextInput}
              ref={input => (this.lastName = input)}
              onSubmitEditing={() => {
                this.emailId.focus();
              }}
              blurOnSubmit={false}
              placeholder={constants.LAST_NAME}
              returnKeyType={"next"}
              onChangeText={this.onChangeValue("lastName")}
            />
          </View>
          <View style={styles.inputView}>
            <View style={styles.iconView}>
              <Icon name="user" size={28} color={colors.THEME_COLOR} />
            </View>
            <TextInput
              style={styles.styleTextInput}
              ref={input => (this.emailId = input)}
              keyboardType="email-address"
              onSubmitEditing={() => {
                this.password.focus();
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
              placeholder={constants.CONFIRMPASSWORD}
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
          <View style={styles.bottomView}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.onPressEvent()}
            >
              <Text>{constants.DONE}</Text>
            </TouchableOpacity>
            <Text style={styles.bottomText}>
              {constants.ALREADY_AN_ACCOUT}
              <Text
                onPress={() => this.props.navigation.navigate("Login")}
                style={{
                  color: colors.THEME_COLOR,
                  textDecorationLine: "underline"
                }}
              >
                {constants.LOGIN}
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
      //  onLoginClick: onLoginClick
    },
    dispatch
  );
};

const styles = {
  parentView: { alignItems: "center", flex: 1 },
  logoImage: {
    width: "90%",
    height: 100,
    flex: 0.8,
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
    top: "6%"
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
)(Registration);
