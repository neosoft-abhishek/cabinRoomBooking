import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { colors } from "../utils/Colors";
import { constants } from "../utils/Constants";
import Icon from "react-native-vector-icons/FontAwesome";
import { FlatList } from "react-native-gesture-handler";

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

const meetingRm = [
  { key: "Pune_It_6_RM_1" },
  { key: "Pune_It_6_RM_2" },
  { key: "Pune_It_6_RM_3" },
  { key: "Pune_It_6_RM_4" },
  { key: "Pune_It_6_RM_5" },
  { key: "Pune_It_6_RM_6" },
  { key: "Pune_It_6_RM_7" }
];

export class BookARoom extends Component {
  static navigationOptions = {
    title: constants.MEETING_ROOM,
    headerLeft: null
  };
  static propTypes = {
    prop: PropTypes
  };

  state = {
    listOfLocation: false,
    selected: (new Map(): Map<string, boolean>),
    listOfMeetingRoom: false
  };
  _keyExtractor = (item, index) => item.id;

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState(state => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });
  };

  _onPress = id => {
    this.setState({ listOfMeetingRoom: true });
    // this._onPressItem(id);
  };

  renderItems = ({ item }) => {
    const textColor = !!this.state.selected.get(item.key) ? "black" : "#fff";
    return (
      <TouchableOpacity
        style={styles.itemView}
        onPress={() => this._onPress(item.key)}
      >
        <View>
          <Text style={[styles.itemText, { color: textColor }]}>
            {item.key}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderItemsMeeting = ({ item }) => {
    const textColor = !!this.state.selected.get(item.key) ? "black" : "white";
    return (
      <TouchableOpacity
        style={styles.itemMeetingView}
        onPress={() => this._onPress(item.key)}
      >
        <Icon name="handshake-o" size={30} color={colors.WHITE} />
        <View>
          <Text style={[styles.itemText, { color: textColor }]}>
            {item.key}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  meetingRoom = () => {
    return (
      <View style={styles.parentView}>
        <TouchableOpacity
          style={styles.buttonView}
          onPress={() => this.setState({ listOfLocation: true })}
        >
          <Text style={styles.buttonText}>{constants.BOOKING_ROOM} </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonView}
         onPress = {()=> this.props.navigation.navigate('LocationList')}>
          <Text style={styles.buttonText}>{constants.OCCUPIED_ROOM} </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderListOfLocation = () => {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ paddingStart: 15, paddingTop: 15, width: "20%" }}
          onPress={() => {
            this.setState({ listOfLocation: false });
          }}
        >
          <Icon
            size={30}
            color={colors.THEME_COLOR}
            name={"arrow-circle-left"}
          />
        </TouchableOpacity>
        <Text style={styles.titleText}>{constants.SELECT_A_LOCATION}</Text>
        <FlatList
          data={data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderItems}
        />
      </View>
    );
  };

  renderRoomList = () => {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ paddingStart: 15, paddingTop: 15, width: "20%" }}
          onPress={() => {
            this.setState({ listOfMeetingRoom: false });
          }}
        >
          <Icon
            size={30}
            color={colors.THEME_COLOR}
            name={"arrow-circle-left"}
          />
        </TouchableOpacity>
        <Text style={styles.titleText}>{constants.SELECT_A_MEETING_ROOM}</Text>
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <FlatList
            data={meetingRm}
            horizontal={false}
            numColumns={2}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderItemsMeeting}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </ScrollView>
      </View>
    );
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
        {this.state.listOfLocation
          ? this.state.listOfMeetingRoom
            ? this.renderRoomList()
            : this.renderListOfLocation()
          : this.meetingRoom()}
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

const styles = {
  parentView: {
    flex: 1,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  imageBackground: {
    width: "100%",
    height: "100%"
  },
  buttonText: {
    fontSize: 16,
    color: colors.WHITE,
    fontWeight: "700"
  },
  buttonView: {
    height: 100,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    borderColor: colors.THEME_COLOR
  },
  titleText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: colors.THEME_COLOR,
    margin: 15
  },
  itemView: {
    width: "80%",
    borderWidth: 1,
    padding: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderColor: colors.THEME_COLOR,
    borderRadius: 15
  },

  itemMeetingView: {
    width: "45%",
    borderWidth: 1,
    padding: 10,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderColor: colors.THEME_COLOR,
    borderRadius: 15
  },
  itemText: {
    fontSize: 16
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookARoom);
