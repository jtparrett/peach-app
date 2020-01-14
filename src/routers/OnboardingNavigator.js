import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import OnboardingWelcome from '../screens/OnboardingWelcome';
import OnboardingPaymentDetails from '../screens/OnboardingPaymentDetails';
import OnboardingComplete from '../screens/OnboardingComplete';

const OnboardingNavigator = createStackNavigator(
  {
    Welcome: OnboardingWelcome,
    PaymentDetails: OnboardingPaymentDetails,
    Complete: OnboardingComplete,
  },
  {
    headerMode: 'none',
  }
);

export default createAppContainer(OnboardingNavigator);
