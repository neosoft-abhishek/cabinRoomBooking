import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  ScrollView,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import { colors } from "../utils/Colors";
import { constants } from "../utils/Constants";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import Accordion from "react-native-collapsible/Accordion";

const data = [
  {
    locationCity: "Ahmedabad",
    locationArea: [{ area: "91springboard" }]
  },
  {
    locationCity: "Bangalore",
    locationArea: [{ area: "91springboard" }]
  },
  {
    locationCity: "Mumbai",
    locationArea: [
      { area: "The Ruby Tower" },
      { area: "Business Arcade (10th Floor)" },
      { area: "Business Arcade (9th Floor)" },
      { area: "Business Arcade (8th Floor)" },
      { area: "Unique Industrial Estate" }
    ]
  },
  {
    locationCity: "Navi Mumbai",
    locationArea: [
      { area: "Sigma IT Park (5th Floor)" },
      { area: "Sigma IT Park (9th Floor)" }
    ]
  },
  {
    locationCity: "Noida",
    locationArea: [{ area: "91springboard" }]
  },
  {
    locationCity: "Pune",
    locationArea: [
      { area: "Hinjewadi - NTPL SEZ IT 6" },
      { area: "Hinjewadi - NTPL SEZ IT 9" }
    ]
  }
];
export default class LocationList extends Component {
  static navigationOptions = ({navigation} ) => {
    return {
      title: constants.LOCATION,
      headerLeft: navigation.state.params ? 
       navigation.state.params.backKey : null 
      }
      // headerLeft: navigation.state.params ? 
      // navigation.state.params.backKey && { 
      //   title:'back'
      // }
      // : null
  };

  state = {
    activeSections: []
  };

  _renderHeader = section => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.headerStyle}>{section.locationCity}</Text>
      </View>
    );
  };

  _renderContent = section => {
    return (
      <View style={{ alignItems: "center" }}>
        <FlatList
          data={section.locationArea}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderItems}
        />
      </View>
    );
  };

  renderItems = ({ item }) => {
    return (
      <TouchableOpacity style={styles.subTextStyle}
      onPress = {()=> this.props.navigation.navigate('MeetingRoom')}>
        <Text style={{ color: colors.WHITE, fontSize: 14 }}>{item.area}</Text>
      </TouchableOpacity>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <ImageBackground
        source={{
          uri:
            "https://images.neosofttech.com/sites/all/themes/neosoft2017/images/background.jpg"
        }}
        style={styles.imageBackground}
      >
        <Text style={styles.titleText}>{constants.SELECT_A_LOCATION}</Text>
        <Accordion
          sections={data}
          activeSections={this.state.activeSections}
          // renderSectionTitle={this._renderSectionTitle}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateSections}
        />
      </ImageBackground>
    );
  }
}

const styles = {
  subTextStyle: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderColor: colors.THEME_COLOR,
    borderRadius: 15
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  headerStyle: {
    color: colors.WHITE,
    fontSize: 20,
    marginHorizontal: 10,
    marginVertical: 5
  },
  titleText: {
    position: "absolute",
    top: 20,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: colors.THEME_COLOR,
    margin: 15
  }
};
