import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { constants } from "../utils/Constants";
import { colors } from "../utils/Colors";
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {callbackApiCalling } from '../services/APICallbackMethod'
import {urls} from '../services/Url'

export default class OtpVerification extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#fff"
    },
    headerTintColor: "#000"
  };

  state = {
      code:''
  }
  pinInput = React.createRef();

  buttonEnable = () => {
    const { code } = this.state;
    return code
  };

  _checkCode = (code) => {
        this.setState({ code})
  }

  onPressEvent = () =>{
    
      callbackApiCalling
        .get(urls.OtpVerification+this.state.code, null)
        .then(response => {
          if (response.data.success) {
            this.props.navigation.navigate('Login')

          } else {
            alert("Something went wrong...");
          }
        })
        .catch(error => {
          console.log("error", error);
        });
  }

  render() {
    const { code } = this.state
    return (
      <View style={styles.parentView}>
            <Image
          style={styles.logoImage}
          source={{ uri: "http://mis.neosofttech.in//images/logo.jpg" }}
        />
        <Text style={styles.titleText}>{constants.VERIFICATION_CODE}</Text>
        <Text>{constants.OTP_TEXT} </Text>
        <Text style = {{marginBottom:15}}>to xyz@gmail.com</Text>
        <SmoothPinCodeInput
          ref={this.pinInput}
          value={code}
          onTextChange={code => this.setState({ code })}
          onFulfill={this._checkCode}
          onBackspace={() => console.log('No more back.')}
        />

        <Text onPress = {()=> alert('Re-send email Successful')}
        style = {{marginTop:15,textDecorationLine: 'underline'}}>
            Re-send email</Text>

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
    top:'10%',
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
};
