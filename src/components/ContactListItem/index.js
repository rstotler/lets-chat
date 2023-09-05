import { Text, Image, StyleSheet, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createChatRoom, createUserChatRoom } from '../../graphql/mutations';
import { getCommonChatRoomWithUser } from '../../services/chatRoomService';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const ContactListItem = ({ user }) => {
  const navigation = useNavigation();

  const onPress = async () => {
    console.warn("Pressing")

    // Check if ChatRoom with User already exists //
    const existingChatRoom = await getCommonChatRoomWithUser(user.id);
    if(existingChatRoom) {
      navigation.navigate("Chat", {id: existingChatRoom.id});
      return;
    }

    // Create a new ChatRoom //
    const newChatRoomData = await API.graphql(graphqlOperation(createChatRoom, {input: {}}));
    if(!newChatRoomData.data?.createChatRoom) {
      console.log("Error creating the ChatRoom");
    }
    const newChatRoom = newChatRoomData.data?.createChatRoom;

    // Add clicked User to ChatRoom //
    await API.graphql(graphqlOperation(createUserChatRoom, {input: {chatRoomId: newChatRoom.id, userId: user.id}}));

    // Add Authentication User to ChatRoom //
    const authUser = await Auth.currentAuthenticatedUser();
    await API.graphql(graphqlOperation(createUserChatRoom, {input: {chatRoomId: newChatRoom.id, userId: authUser.attributes.sub}}));

    // Navigate to newly created ChatRoom //
    navigation.navigate("Chat", {id: newChatRoom.id});
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={{ uri: user.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {user.name}
        </Text>

        <Text numberOfLines={2} style={styles.subTitle}>
          {user.status}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  name: {
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  subTitle: {
    color: 'gray',
  },
});

export default ContactListItem;
