/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView
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
    this.pushMsg = this.pushMsg.bind(this);

  }

  pushMsg(message) {
    fetch('https://murmuring-beyond-44790.herokuapp.com/message', {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(message)})
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
        <MessageForm messageSubmit={this.pushMsg}/>
        <ScrollView style={{height: 100}}>
          {
            this.state.messages.map((message, i) => (
              <Message user={message.user} msg={message.msg} key={i}/>
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      msg: ''
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const {user, msg} = this.state;

    if(user != '' && msg != '') {
      this.props.messageSubmit(this.state)
      this.setState({
        user: '',
        msg: ''
      })
    }
  }

  render(){
    return(
      <View>
        <TextInput
          name="user"
          placeholder="name"
          value={this.state.user}
          onChangeText={(user) => this.setState({user})}
          keyobardType="default"
          onSubmitEditing={this.onSubmit}
        />
        <TextInput
          name="msg"
          placeholder="msg"
          value={this.state.msg}
          onChangeText={(msg) => this.setState({msg})}
          onSubmitEditing={this.onSubmit}
        />
      </View>
    )
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
