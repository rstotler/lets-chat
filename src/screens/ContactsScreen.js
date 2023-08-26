import { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import chats from '../../assets/data/chats.json';
import ContactListItem from '../components/ContactListItem';

const ContactsScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: '#1b159a' },
      headerTintColor: 'white',
    });
  });

  return (
    <FlatList
      data={chats}
      renderItem={({ item }) => <ContactListItem user={item.user} />}
      style={{ backgroundColor: 'white' }}
    />
  );
};

export default ContactsScreen;
