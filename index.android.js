/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

var Pusher = require('pusher-websocket-iso/react-native');

class reactnativestarter extends Component {

  constructor() {
    super();
    this.state ={
      notifcations: [
        {message: 'test'},
        {message: 'test2'}
      ],
      pusher: '2',
      value: 20
    }
  }

  componentDidMount() {
    const pusher = new Pusher('a72b893e775eb14e8b4c');
    const channel = pusher.subscribe('value_channel');
    channel.bind('my_event', (data) => {
      this.setState({
        notifcations: [
          ...this.state.notifcations,
          data
        ]
      });
    });
    channel.bind('value_update', (data) => {
      this.setState({
        value: this.state.value + data.value
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          {this.state.pusher}
        </Text>
        <Text>
          Value: {this.state.value}
        </Text>
        {
          this.state.notifcations.map((notif, i) => (
            <Text key={i}>
              {notif.message}
            </Text>
          ))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('reactnativestarter', () => reactnativestarter);
