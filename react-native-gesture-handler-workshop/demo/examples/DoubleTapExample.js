import * as React from 'react';
import { Text, View, Alert, StyleSheet } from 'react-native';
import { GestureHandler } from 'expo';

const { TapGestureHandler, State } = GestureHandler;

const doubleTap = React.createRef();

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TapGestureHandler
          onHandlerStateChange={({ nativeEvent }) =>
            nativeEvent.state === State.ACTIVE && Alert.alert('Single tap!')
          }
          waitFor={doubleTap}
        >
          <TapGestureHandler
            ref={doubleTap}
            onHandlerStateChange={({ nativeEvent }) =>
              nativeEvent.state === State.ACTIVE &&
              Alert.alert("You're so fast")
            }
            numberOfTaps={2}
          >
            <View style={styles.box} />
          </TapGestureHandler>
        </TapGestureHandler>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
