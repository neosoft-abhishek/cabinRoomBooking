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

class Login extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount(){
    this.props.demoUrlHit()
  }

  state = {
    emailId: "",
    password: ""
  };

  onPressEvent = () => {
    this.props.navigation.navigate("PreviousBookRoom");
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
          <Text style={styles.titleText}>{constants.LOGIN_C}</Text>
          <View style={styles.inputView}>
            <View style={styles.iconView}>
              <Icon name="user" size={28} color={colors.THEME_COLOR} />
            </View>
            <TextInput
              style={styles.styleTextInput}
              ref={input => (this.emailId = input)}
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
              style={styles.buttonStyle}
              onPress={() => this.onPressEvent()}
            >
              <Text>{constants.DONE}</Text>
            </TouchableOpacity>
            <Text style={styles.bottomText}>
              {constants.NEED_AN_ACCOUNT}
              <Text
                onPress={() => this.props.navigation.navigate("MeetingRoom")}
                style={{ color: colors.THEME_COLOR, textDecorationLine: 'underline'}}
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
