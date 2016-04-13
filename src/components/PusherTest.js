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


import Pusher from 'pusher-websocket-iso/react-native';

class PusherTest extends Component {

  constructor() {
    super();
    this.state ={
      messages: [{
        user: 'Server', msg: 'Welcome to realtime'
      }]
    };
  }

  componentDidMount() {
    const pusher = new Pusher('a72b893e775eb14e8b4c');
    const channel = pusher.subscribe('messanger_channel');
    channel.bind('post_message', (data) => {
      this.setState({
        messages: [
          ...this.state.messages,
          data
        ]
      });
    });

  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.messages.map((message, i) => (
            <Message user={message.user} msg={message.msg} key={i}/>
          ))
        }
      </View>
    );
  }
}

const Message = ({user, msg}) => (
  <Text>
    {user} - {msg}
  </Text>
)

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

export default PusherTest;
