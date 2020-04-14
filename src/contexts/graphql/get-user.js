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
        capabilities {
          card_payments
          transfers
        }
      }
      emailVerification {
        isVerified
      }
    }
  }
`;
