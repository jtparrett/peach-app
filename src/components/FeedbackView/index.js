import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Icon, Title, Button, SubTitle, Actions } from 'components';
import { IconWrapper } from './styles';

export const FeedbackView = ({
  title,
  subTitle,
  actionButtonLabel,
  onActionButtonPressed,
}) => (
  <>
    <Grid.Item size={12}>
      {/* Better icon or SVG here. */}
      <IconWrapper>
        <Icon size={100} name="ios-checkmark" />
      </IconWrapper>
    </Grid.Item>
    <Grid.Item size={12}>
      <Title isCentered>{title}</Title>
    </Grid.Item>
    <Grid.Item size={12}>
      <SubTitle isCentered>{subTitle}</SubTitle>
    </Grid.Item>
    {actionButtonLabel && (
      <Grid.Item size={12}>
        <Actions>
          <Button
            fixedWidth
            title={actionButtonLabel}
            onPress={onActionButtonPressed}
          />
        </Actions>
      </Grid.Item>
    )}
  </>
);

FeedbackView.defaultProps = {
  actionButtonLabel: null,
};

FeedbackView.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  actionButtonLabel: PropTypes.string,
  onActionButtonPressed: PropTypes.func.isRequired,
};
