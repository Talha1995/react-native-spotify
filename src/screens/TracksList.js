import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import styles from '../styles/common';

const PasswordScreen = ({route, navigation}) => {
  const [trackList, setTrackList] = useState({
    selectedTrack: '',
    listOfTrackListFromAPI: [],
  });
  useEffect(() => {
    axios(`https://api.spotify.com/v1/playlists/${route.params.playListId}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + route.params.token,
      },
    })
      .then(playlistResponse => {
        setTrackList({
          listOfTrackListFromAPI: playlistResponse.data.tracks.items,
        });
      })
      .catch(err => {});
  }, [trackList.selectedTrack]);

  return (
    <View style={screenstyles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={trackList.listOfTrackListFromAPI}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TrackDetails', {
                  tractId: item.track.id,
                  token: route.params.token,
                });
              }}
              style={styles.container}>
              <View style={styles.subConatainer}>
                <View>
                  <FastImage
                    style={styles.roundedImage}
                    source={{uri: item.track.album.images[0].url}}
                  />
                </View>
                <View style={styles.detailView}>
                  <Text>Name: {item.track.name}</Text>
                  <Text>Artist Name: {item.track.album.artists[0].name}</Text>
                  <Text>Popularity:{item.track.popularity}</Text>
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

const screenstyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PasswordScreen;
