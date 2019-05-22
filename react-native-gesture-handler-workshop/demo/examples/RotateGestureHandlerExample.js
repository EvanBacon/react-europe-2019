import { GestureHandler } from 'expo';
import React, { Component } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const { RotationGestureHandler, State } = GestureHandler;

export default class App extends Component {
  rotate = new Animated.Value(0);

  render() {
    const rotation = this.rotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0rad', '1rad'],
    });
    return (
      <View style={styles.container}>
        <RotationGestureHandler
          onGestureEvent={Animated.event([
            { nativeEvent: { rotation: this.rotate } },
          ])}
        >
          <Animated.View
            style={[
              styles.box,
              {
                transform: [{ rotate: rotation }],
              },
            ]}
          />
        </RotationGestureHandler>
      </View>
    );
  }

  _handleGestureStateChange = ({ nativeEvent }) => {
    let { oldState, state } = nativeEvent;

    if (oldState === State.ACTIVE) {
      this.panX.extractOffset();
      this.panY.extractOffset();
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'red',
  },
});
