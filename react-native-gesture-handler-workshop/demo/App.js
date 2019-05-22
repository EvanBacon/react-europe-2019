import React from 'react';
import { FlatList, StyleSheet, Text, View, YellowBox } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import DoubleTap from './examples/DoubleTapExample';
import PanAndScroll from './examples/PanAndScrollExample';
import PanGestureHandler from './examples/PanGestureHandlerExample';
import PanResponderSucks from './examples/PanResponderSucksExample';
import PinchGestureHandler from './examples/PinchGestureHandlerExample';
import RotateGestureHandler from './examples/RotateGestureHandlerExample';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);
// refers to bug in React Navigation which should be fixed soon
// https://github.com/react-navigation/react-navigation/issues/3956

const SCREENS = {
  DoubleTap: { screen: DoubleTap, title: 'DoubleTap' },
  PanAndScroll: { screen: PanAndScroll, title: 'PanAndScroll' },
  PanGestureHandler: { screen: PanGestureHandler, title: 'PanGestureHandler' },
  PanResponderSucks: { screen: PanResponderSucks, title: 'PanResponderSucks' },
  PinchGestureHandler: {
    screen: PinchGestureHandler,
    title: 'PinchGestureHandler',
  },
  RotateGestureHandler: {
    screen: RotateGestureHandler,
    title: 'RotateGestureHandler',
  },
};

class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Gesture Workshop',
  };
  render() {
    const data = Object.keys(SCREENS).map(key => ({ key }));
    return (
      <FlatList
        style={styles.list}
        data={data}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={props => (
          <MainScreenItem
            {...props}
            onPressItem={({ key }) => this.props.navigation.navigate(key)}
          />
        )}
        renderScrollComponent={props => <ScrollView {...props} />}
      />
    );
  }
}

const ItemSeparator = () => <View style={styles.separator} />;

class MainScreenItem extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.item);
  render() {
    const { key } = this.props.item;
    return (
      <RectButton style={styles.button} onPress={this._onPress}>
        <Text style={styles.buttonText}>{SCREENS[key].title || key}</Text>
      </RectButton>
    );
  }
}

const ExampleApp = createStackNavigator(
  {
    Main: { screen: MainScreen },
    ...SCREENS,
  },
  {
    initialRouteName: 'Main',
  },
);

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#EFEFF4',
  },
  separator: {
    height: 1,
    backgroundColor: '#DBDBE0',
  },
  buttonText: {
    backgroundColor: 'transparent',
  },
  button: {
    flex: 1,
    height: 60,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default createAppContainer(ExampleApp);
