import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import {Post, Header, Avatar, Name, PostImage} from './styles';
import {descriptions} from 'jest-config';

export default function Feed() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    async function loadFeed() {
      const response = await fetch(
        'https://localhost:3000/feed?_expand=author&_limit=5&_page=1',
      );

      const data = await response.json();

      setFeed(data);
    }
  }, []);

  return (
    <View>
      <FlatList
        data={feed}
        keyExtractor={post => String(post.id)}
        renderItem={({item}) => (
          <Post>
            <Header>
              <Avatar source={{uri: item.author.avatar}} />
              <Name>{item.author.name}</Name>
            </Header>
            <PostImage source={{uri: item.image}} />
            <Description>
              <Name>{item.author.name}</Name> {item.description}
            </Description>
          </Post>
        )}
      />
    </View>
  );
}
