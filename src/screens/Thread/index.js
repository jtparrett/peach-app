import React, { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import debounce from 'lodash/debounce';
import getOr from 'lodash/fp/getOr';
import get from 'lodash/fp/get';
import startCase from 'lodash/startCase';
import { useRoute, useNavigation } from '@react-navigation/native';

import { Composer, Wrapper, TextInput, Send, Icon, Spacer } from './styles';
import {
  SafeAreaView,
  Header,
  Loading,
  FlatList,
  MessageBubble,
  KeyboardAvoidingView,
} from 'components';

import SEND_MESSAGE from './graphql/send-message';
import GET_THREAD from './graphql/get-thread';

export const Thread = () => {
  const [text, setText] = useState('');
  const {
    params: { id },
  } = useRoute();
  const navigation = useNavigation();
  const { data, fetchMore, startPolling, stopPolling } = useQuery(GET_THREAD, {
    variables: {
      id,
    },
    pollInterval: 3000,
  });

  const [sendMessage, { loading }] = useMutation(SEND_MESSAGE, {
    onCompleted: () => setText(''),
    refetchQueries: ['getThread'],
    awaitRefetchQueries: true,
  });

  const onSubmit = () => {
    if (!text) return;

    sendMessage({
      variables: {
        text,
        threadId: id,
      },
    });
  };

  const title = useMemo(() => {
    return getOr([], 'findThreadById.users.data', data)
      .map(user => user.name)
      .join(', ');
  }, [data]);

  const debounceStartPolling = debounce(startPolling);

  const onScroll = e => {
    const { y } = e.nativeEvent.contentOffset;

    stopPolling();

    if (y <= 0) {
      debounceStartPolling(3000);
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <Header
          title={startCase(title)}
          rightActionIcon="ios-information-circle-outline"
          onRightActionPressed={() => navigation.navigate('ThreadInfo', { id })}
        />
        <FlatList
          ListFooterComponent={<Spacer />}
          onScroll={onScroll}
          inverted
          keyExtractor={item => item._id}
          data={getOr([], 'findThreadById.messages.data', data)}
          renderItem={({ item }) => <MessageBubble {...item} />}
          onEndReached={() => {
            const after = get('findThreadById.messages.after', data);

            if (!after || loading) return;

            fetchMore({
              variables: {
                id,
                after,
              },
              updateQuery: (cache, { fetchMoreResult }) => ({
                findThreadById: {
                  ...fetchMoreResult.findThreadById,
                  messages: {
                    ...fetchMoreResult.findThreadById.messages,
                    data: [
                      ...cache.findThreadById.messages.data,
                      ...fetchMoreResult.findThreadById.messages.data,
                    ],
                  },
                },
              }),
            });
          }}
        />

        <Composer>
          <Wrapper>
            <TextInput
              multiline
              placeholder="Type a message..."
              value={text}
              onChangeText={setText}
            />

            <Send onPress={onSubmit}>{loading ? <Loading /> : <Icon />}</Send>
          </Wrapper>
        </Composer>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
