import gql from 'graphql-tag';

import { MessageBubbleFragment } from '../../../components/MessageBubble';

export default gql`
  ${MessageBubbleFragment}

  query getMessages($id: ID!) {
    threadMessages(threadId: $id) {
      data {
        _id
        user {
          _id
        }
        ...MessageBubbleFragment
      }
    }
  }
`;
