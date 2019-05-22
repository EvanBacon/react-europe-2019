import React, { Component } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';
import { GestureHandler } from 'expo';
const { PanGestureHandler, State } = GestureHandler;

export default class App extends Component {
  panX = new Animated.Value(0);
  panY = new Animated.Value(0);

  render() {
    return (
      <View style={styles.container}>
        <PanGestureHandler
          onGestureEvent={({ nativeEvent }) => {
            let { translationX, translationY } = nativeEvent;
            this.panX.setValue(translationX);
            this.panY.setValue(translationY);
          }}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.oldState === State.ACTIVE) {
              this.panX.extractOffset();
              this.panY.extractOffset();

              this.panX.flattenOffset();
              this.panY.flattenOffset();

              Animated.timing(this.panX, {
                toValue: 0,
              }).start();
              Animated.timing(this.panY, {
                toValue: 0,
              }).start();
            }
          }}
        >
          <Animated.View
            style={[
              styles.box,
              {
                transform: [
                  { translateX: this.panX },
                  { translateY: this.panY },
                ],
              },
            ]}
          />
        </PanGestureHandler>
      </View>
    );
  }
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
