import { useEffect } from 'react';
import { ImageBackground, StyleSheet, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Message from '../components/Message';
import InputBox from '../components/InputBox';

import bg from '../../assets/images/BG.png';
import messages from '../../assets/data/messages.json';

const ChatScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: route.params.name,
      headerStyle: { backgroundColor: '#1b159a' },
      headerTintColor: 'white',
    });
  }, [route.params.name]);

  return (
    <ImageBackground source={bg} style={styles.bg}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Message message={item} />}
        style={styles.list}
        inverted
      />
      <InputBox />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
});

export default ChatScreen;
