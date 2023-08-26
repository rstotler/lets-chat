import { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const InputBox = () => {
  const [newMessage, setNewMessage] = useState('');

  const onSend = () => {
    console.warn('Sending a new message: ', newMessage);

    setNewMessage('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <TextInput
          style={styles.textInput}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message.."
        />
        {!newMessage && <Entypo name="camera" size={24} color="grey" style={styles.icon} />}
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
