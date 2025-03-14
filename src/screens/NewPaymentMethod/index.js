import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/native';

import {
  SafeAreaView,
  StatusBar,
  Header,
  Container,
  Intro,
  Grid,
  PaymentMethodForm,
  Actions,
  Button,
  Text,
  GraphQLErrors,
  KeyboardAvoidingView,
  ScrollView,
} from 'components';

import { stripe } from '../../stripe';
import CREATE_PAYMENT_METHOD from './graphql/create-payment-method';

const validationSchema = Yup.object().shape({
  number: Yup.string()
    .max(16)
    .required('Card number is required'),
  expiry: Yup.string()
    .matches(
      /([0-9]{2})\/([0-9]{2})/,
      'Not a valid expiration date. Example: MM/YY'
    )
    .required('Expiry date is required'),
  cvc: Yup.string()
    .min(3)
    .max(4)
    .required('CVC is required'),
});

export const NewPaymentMethod = ({
  rightActionLabel,
  onRightActionPressed,
  onComplete,
}) => {
  const navigation = useNavigation();

  const [createPaymentMethod, { loading, error }] = useMutation(
    CREATE_PAYMENT_METHOD,
    {
      refetchQueries: ['getPaymentMethods'],
      onCompleted: () => {
        if (onComplete) return onComplete();
        navigation.goBack();
      },
    }
  );

  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    initialValues: {
      number: '',
      expiry: '',
      cvc: '',
    },
    onSubmit: async ({ number, expiry, cvc }) => {
      const [expMonth, expYear] = expiry.split('/');
      const paymentMethod = await stripe.createToken({
        card: {
          currency: 'gbp',
          number,
          exp_month: expMonth,
          exp_year: expYear,
          cvc,
        },
      });

      if (paymentMethod.error) {
        formik.setErrors({ generic: paymentMethod.error.message });
        return;
      }

      createPaymentMethod({
        variables: {
          token: paymentMethod.id,
        },
      });
    },
  });

  return (
    <SafeAreaView>
      <StatusBar />
      <Header
        title="New Payment Method"
        rightActionLabel={rightActionLabel}
        onRightActionPressed={onRightActionPressed}
      />
      <KeyboardAvoidingView>
        <ScrollView>
          <Container>
            <Intro />
            <Grid>
              <Grid.Item size={12}>
                <Text>
                  Add a new payment method to fast track through campaign
                  creations and influencer payouts.
                </Text>
              </Grid.Item>

              <PaymentMethodForm formik={formik} />

              {error && (
                <Grid.Item size={12}>
                  <GraphQLErrors error={error} />
                </Grid.Item>
              )}

              {formik.errors.generic && (
                <Grid.Item size={12}>
                  <Text isCenter>{formik.errors.generic}</Text>
                </Grid.Item>
              )}
            </Grid>
          </Container>
        </ScrollView>
        <Actions>
          <Button
            title="Save"
            fixedWidth
            isLoading={loading}
            onPress={formik.handleSubmit}
          />
        </Actions>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

NewPaymentMethod.defaultProps = {
  rightActionLabel: null,
  onRightActionPressed: null,
  onComplete: null,
};

NewPaymentMethod.propTypes = {
  rightActionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onRightActionPressed: PropTypes.func,
  onComplete: PropTypes.func,
};
