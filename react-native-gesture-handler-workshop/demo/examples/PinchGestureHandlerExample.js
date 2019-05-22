import React, { Component } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';
import { GestureHandler } from 'expo';
const { PinchGestureHandler, State } = GestureHandler;

// https://snack.expo.io/@bacon/pinchgesturehandler

export default class PinchGestureHandlerExample extends React.Component {
  currentScale = new Animated.Value(1);
  accumulatedScale = new Animated.Value(1);
  _lastScale = 1;

  render() {
    let scale = Animated.multiply(this.currentScale, this.accumulatedScale);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <PinchGestureHandler
          onGestureEvent={Animated.event(
            [{ nativeEvent: { scale: this.currentScale } }],
            { useNativeDriver: true },
          )}
          onHandlerStateChange={this._handlePanGestureStateChange}
        >
          <Animated.View
            style={[
              styles.box,
              {
                transform: [{ scale }],
              },
            ]}
          />
        </PinchGestureHandler>
      </View>
    );
  }

  _handlePanGestureStateChange = e => {
    console.log(e.nativeEvent);
    const { oldState, scale } = e.nativeEvent;

    if (oldState === State.ACTIVE) {
      this._lastScale = this._lastScale * scale;
      this.accumulatedScale.setValue(this._lastScale);
      this.currentScale.setValue(1);
    }
  };
}

const styles = StyleSheet.create({
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'red',
  },
});
