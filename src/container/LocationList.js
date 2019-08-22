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
import { bindActionCreators } from "redux";
import * as Animatable from "react-native-animatable";
import Accordion from "react-native-collapsible/Accordion";
import { callAllLocation } from "../action/index";
import Loader from "../commonComponent/Loader";

const data = [
  {
    locationCity: "Ahmedabad",
    locationArea: [{ area: "91 Spring Board" }]
  },
  {
    locationCity: "Bangalore",
    locationArea: [{ area: "91 Spring Board" }]
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
    locationArea: [{ area: "91 Spring Board" }]
  },
  {
    locationCity: "Pune",
    locationArea: [
      { area: "Hinjewadi - NTPL SEZ IT 6" },
      { area: "Hinjewadi - NTPL SEZ IT 9" }
    ]
  }
];
class LocationList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: constants.LOCATION,
      headerLeft: navigation.state.params
        ? navigation.state.params.backKey
        : null,
      headerStyle: {
        backgroundColor: "#fff"
      },
      headerTintColor: "#000"
    };
    // headerLeft: navigation.state.params ?
    // navigation.state.params.backKey && {
    //   title:'back'
    // }
    // : null
  };

  state = {
    activeSections: [],
    getList: []
  };

  static getDerivedStateFromProps(props, state) {
    if (props.getAllLocation && props.getAllLocation !== state.getList) {
      return {
        getList: props.getAllLocation
      };
    }
    return null; /// Return null if the state hasn't changed
  }

  componentDidMount() {
    this.props.callAllLocation();
  }

  _renderHeader = section => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.headerStyle}>{section._id}</Text>
      </View>
    );
  };

  _renderContent = section => {
    return (
      <View style={{ alignItems: "center" }}>
        <FlatList
          data={section.cabins}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderItems}
        />
      </View>
    );
  };

  renderItems = ({ item }, data) => {
    return (
      <TouchableOpacity
        style={styles.subTextStyle}
        onPress={() =>
          this.props.navigation.navigate("MeetingRoom", {
            locationArea: item.area,
            locationId: item._id
          })
        }
      >
        <Text style={{ color: colors.WHITE, fontSize: 15, fontWeight: "500" }}>
          {item.area}
        </Text>
      </TouchableOpacity>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };
  _keyExtractor = (item, index) => item.area;

  render() {
    //console.log("OnSuccess", this.props.getAllLocation)
    //console.log("LOADING", this.props.isLoading)
    //console.log("Failure", this.props.failureAPI)
    return (
      <ImageBackground
        source={{
          uri:
            "https://images.neosofttech.com/sites/all/themes/neosoft2017/images/background.jpg"
        }}
        style={styles.imageBackground}
      >
        <Loader loading={this.props.isLoading} />
        <Text style={styles.titleText}>{constants.SELECT_A_LOCATION}</Text>

        <Accordion
          sections={this.state.getList}
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

mapStateToProps = state => {
  return {
    getAllLocation: state.GetAllLocation.payload.data,
    isLoading: state.GetAllLocation.isLoading,
    failureAPI: state.GetAllLocation.onFailureData
  };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      callAllLocation
    },
    dispatch
  );
};

const styles = {
  subTextStyle: {
    borderWidth: 2,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationList);
