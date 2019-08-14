import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  Keyboard,
  Button
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onLoginClick } from "../action/index";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { constants } from "../utils/Constants";
import { colors } from "../utils/Colors";

class ForgotPassword extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#fff"
    },
    headerTintColor: "#000"
  };
  state = {
    emailId: "",
    password: ""
  };

  onPressEvent = () => {
    this.props.onLoginClick('ADD_PLACE',this.state.text);
    this.props.navigation.navigate("Registration");
  };

  onChangeValue(name) {
    return text => {
      this.setState({ [name]: text });
    };
  }

  render() {
    return (
      <View style={styles.parentView}>
        <Image
          style={styles.logoImage}
          source={{ uri: "http://mis.neosofttech.in//images/logo.jpg" }}
        />
        <View style={styles.middleView}>
          <Text style={styles.titleText}>{constants.FORGOT_PASSWORD}</Text>
          <View style={styles.inputView}>
            <View style={styles.iconView}>
              <Icon name="user" size={28} color={colors.THEME_COLOR} />
            </View>
            <TextInput
              style={styles.styleTextInput}
              ref={input => (this.emailId = input)}
              placeholder={constants.ENTER_EMAIL_ID}
              returnKeyType={"done"}
              onChangeText={this.onChangeValue("emailId")}
            />
          </View>
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.onPressEvent()}
          >
            <Text>{constants.DONE}</Text>
          </TouchableOpacity>
        </View>
      </View>
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
      onLoginClick: onLoginClick
    },
    dispatch
  );
};

const styles = {
  parentView: { alignItems: "center", flex: 1 },
  logoImage: {
    width: "90%",
    height: 100,
    flex: 0.6,
    resizeMode: "contain"
  },
  middleView: {
    flex: 1,
    width: "90%",
    alignItems: "center"
  },
  titleText: {
    color: colors.THEME_COLOR,
    fontSize: 24,
    marginBottom: "15%",
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
    flex: 1,
    width: "80%"
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
)(ForgotPassword);
