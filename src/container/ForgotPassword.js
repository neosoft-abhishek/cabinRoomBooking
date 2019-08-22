import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onLoginClick } from "../action/index";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { constants } from "../utils/Constants";
import { colors } from "../utils/Colors";
import {callbackApiCalling } from '../services/APICallbackMethod';
import DropdownAlert from "react-native-dropdownalert";
import {urls} from '../services/Url';
import { emptyString, validateEmail } from "../utils/Validation";



class ForgotPassword extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#fff"
    },
    headerTintColor: "#000"
  };
  state = {
    emailId: ""
  };

  onPressEvent = () => {
    const body = {
      email:this.state.emailId
    }
   
    if(validateEmail(this.state.emailId)){
    callbackApiCalling
        .post(urls.forgotPassword, body, null, null)
        .then(response => {
          if (response.data.success) {
            this.props.navigation.navigate("ResetPassword", {emailId:this.state.emailId});
          } else {
            alert("Something went wrong...");
          }
        })
        .catch(error => {
        //  if(error.response.status === 400 )
          //this.dropDownAlertRef.alertWithType('warn',constants.WARNING,constants.NOT_FOUND_EMAIL)
          console.log("error", error);
        });
      }else {
        this.dropDownAlertRef.alertWithType(
          "error",
          "Error",
          constants.EMAIL_ERROR_LABEL
        );
      }
    
  };

  buttonEnable = () => {
    const { emailId } = this.state;
    return emailId;
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
        <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
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
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={this.onChangeValue("emailId")}
            />
          </View>
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
    backgroundColor: colors.THEME_COLOR,
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
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700"
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);
