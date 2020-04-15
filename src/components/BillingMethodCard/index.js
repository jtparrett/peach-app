import React from 'react';
import PropTypes from 'prop-types';
import getOr from 'lodash/fp/getOr';
import get from 'lodash/fp/get';
import gql from 'graphql-tag';

import { Grid } from '../Grid';
import { Card } from '../Card';
import { Text } from '../Text';
import { SkeletonText } from '../Skeletons';

export const BillingMethodCard = ({ isLoading, account, isSelected }) => (
  <Card isSelected={isSelected}>
    <Grid justify="space-between">
      <Grid.Item size={12}>
        <Text>
          <SkeletonText isLoading={isLoading} loadingText="Account holder name">
            {get('account_holder_name', account) ||
              `${get('brand', account)} ${get('funding', account)}`}
          </SkeletonText>
        </Text>
      </Grid.Item>
      <Grid.Item>
        <Text>
          <SkeletonText isLoading={isLoading} loadingText="01-02-3">
            {getOr('', 'routing_number', account)}
          </SkeletonText>
        </Text>
      </Grid.Item>
      <Grid.Item>
        <Text>
          <SkeletonText isLoading={isLoading} loadingText="01234567">
            ****{getOr('', 'last4', account)}
          </SkeletonText>
        </Text>
      </Grid.Item>
    </Grid>
  </Card>
);

BillingMethodCard.defaultProps = {
  isSelected: false,
  isLoading: false,
  account: null,
};

BillingMethodCard.propTypes = {
  isSelected: PropTypes.bool,
  isLoading: PropTypes.bool,
  account: PropTypes.any,
};

export const BillingMethodCardFragment = gql`
  fragment BillingMethodCardFragment on BillingMethod {
    id
    last4
    routing_number
    account_holder_name
    brand
    funding
  }
`;
