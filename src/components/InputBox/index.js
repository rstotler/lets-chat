import { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createMessage, updateChatRoom } from '../../graphql/mutations';

const InputBox = ({ chatroom }) => {
  const [text, setText] = useState("");

  const onSend = async () => {
    console.warn('Sending a new message: ', text);

    const authUser = await Auth.currentAuthenticatedUser();

    const newMessage = {
      chatroomID: chatroom.id,
      text,
      userID: authUser.attributes.sub,
    };

    const newMessageData = await API.graphql(graphqlOperation(createMessage, { input: newMessage }));

    setText("");

    await API.graphql(graphqlOperation(updateChatRoom, {input: {
      _version: chatroom._version,
      chatRoomLastMessageId: newMessageData.data.createMessage.id,
      id: chatroom.id,
    }}));
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          placeholder="Type your message.."
        />
      </View>
      <MaterialIcons onPress={onSend} style={styles.send} name="send" size={28} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    margin: 8,
    alignItems: 'flex-end',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    marginRight: 5,
    alignItems: 'center',

    borderRadius: 25,
    borderColor: 'lightgray',
    borderWidth: StyleSheet.hairlineWidth,
  },
  textInput: {
	  flex: 1,
    fontSize: 16,
  },
  send: {
    backgroundColor: '#1b159a',
    padding: 10,
    borderRadius: 25,
    overflow: 'hidden',
  },
});

export default InputBox;
