import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export const Main = styled.TouchableOpacity`
  width: 30px;
  justify-content: center;
`;

export const Icon = styled(Ionicons).attrs(props => ({
  name: 'ios-arrow-back',
  size: 20,
  color: props.theme.foreground,
}))``;
