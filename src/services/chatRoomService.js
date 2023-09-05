import { API, graphqlOperation, Auth } from 'aws-amplify';

export const getCommonChatRoomWithUser = async (userId) => {
  const authUser = await Auth.currentAuthenticatedUser();

  // Get all chat rooms of user1
  const response = await API.graphql(graphqlOperation(listChatRooms, {id: authUser.attributes.sub}));
  const chatRooms = response.data?.getUser?.ChatRooms?.items || [];
  const chatRoom = chatRooms.find(chatRoomItem => chatRoomItem.chatRoom.users.items.some(userItem => userItem.user.id === userId));
  
  return chatRoom;
};

export const listChatRooms = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      ChatRooms {
        items {
          chatRoom {
            id
            users {
              items {
                user {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`
