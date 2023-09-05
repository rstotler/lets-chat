import { View, Text, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import { Auth } from 'aws-amplify';
import { useState, useEffect } from 'react';

const Message = ({ message }) => {
  const [isMe, setIsMe] = useState(false);

  useEffect(() => {
    const isMyMessage = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
  
      setIsMe(message.userID === authUser.attributes.sub);
    };

    isMyMessage();
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isMe ? '#D8DEFF' : 'white',
          alignSelf: isMe ? 'flex-end' : 'flex-start',
        },
      ]}
    >
      <Text>{message.text}</Text>
      <Text style={styles.time}>{dayjs(message.createdAt).fromNow(true)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 7,
    paddingVertical: 5,
    borderRadius: 10,
    maxWidth: '80%',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  name: {
    color: '#1b159a',
    fontWeight: 'bold',
  },
  time: {
    color: 'gray',
    alignSelf: 'flex-end',
    fontSize: 12,
  },
});

export default Message;
