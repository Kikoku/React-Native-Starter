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
      pusher: 'a'
    }
  }

  componentDidMount() {
    const pusher = new Pusher('a72b893e775eb14e8b4c');
    const channel = pusher.subscribe('test_channel');
    channel.bind('my_event', (data) => {
      this.setState({
        notifcations: [
          ...this.state.notifcations,
          data
        ]
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          {this.state.pusher}
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
