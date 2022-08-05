import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {Credentials} from '../Credentials';
import FastImage from 'react-native-fast-image';
import styles from '../styles/common';

const PlayListScreen = ({navigation}) => {
  const [token, setToken] = useState('');

  const [playlist, setPlaylist] = useState({
    selectedPlaylist: '',
    listOfPlaylistFromAPI: [],
  });
  const [tracks, setTracks] = useState({
    selectedTrack: '',
    listOfTracksFromAPI: [],
  });
  const spotify = Credentials();

  useEffect(() => {
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret),
      },
      data: 'grant_type=client_credentials',
      method: 'POST',
    }).then(tokenResponse => {
      setToken(tokenResponse.data.access_token);

      axios('https://api.spotify.com/v1/browse/featured-playlists', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + tokenResponse.data.access_token,
        },
      })
        .then(playlistResponse => {
          setPlaylist({
            Playlist: playlistResponse.data.playlists,
            listOfPlaylistFromAPI: playlistResponse.data.playlists.items,
          });
        })
        .catch(err => {});
    });
  }, [playlist.selectedPlaylist, spotify.ClientId, spotify.ClientSecret]);

  return (
    <View style={styles.screenContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={playlist.listOfPlaylistFromAPI}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TracksList', {
                  playListId: item.id,
                  token,
                });
              }}
              style={styles.container}>
              <View style={styles.subConatainer}>
                <View>
                  <FastImage
                    style={styles.roundedImage}
                    source={{uri: item.images[0].url}}
                  />
                </View>
                <View style={styles.detailView}>
                  <Text>Title: {item.name}</Text>
                  <Text>No. of tracks: {item.tracks.total}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const screenStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default PlayListScreen;
