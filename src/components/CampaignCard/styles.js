import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

import Text from '../../components/Text';
import Title from '../../components/Title';

export const Icon = styled(Ionicons).attrs(props => ({
  color: props.theme.foreground,
  size: 22,
}))``;

export const MainTitle = styled(Text)`
  font-size: 16px;
`;

export const User = styled(Title)`
  color: ${props => props.theme.greyDark};
  font-size: 12px;
`;

export const Description = styled(Text)`
  color: ${props => props.theme.greyDark};
`;
