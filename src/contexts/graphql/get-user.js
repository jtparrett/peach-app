import gql from 'graphql-tag';

import { ProfileHeaderFragment } from '../../components/ProfileHeader';

export default gql`
  ${ProfileHeaderFragment}

  query getCurrentUser {
    user {
      _id
      type
      onboarded
      ...ProfileHeaderFragment
      stripeAccount {
        id
        capabilities {
          transfers
        }
      }
      emailVerification {
        isVerified
      }
    }
  }
`;
