import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { constants } from "../utils/Constants";
import { colors } from "../utils/Colors";
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

export default class OtpVerification extends Component {
//   static navigationOptions = {
//     headerStyle: {
//       backgroundColor: "#fff"
//     },
//     headerTintColor: "#000"
//   };

  state = {
      code:''
  }
  pinInput = React.createRef();
  _checkCode = (code) => {
    if (code != '1234') {
      this.pinInput.current.shake()
        .then(() => this.setState({ code: '' }));
    }
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
  logoImage: {
    width: "60%",
    height: 100,
    resizeMode: "contain"
  },
};
