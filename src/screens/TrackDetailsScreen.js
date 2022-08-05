import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import styles from '../styles/common';

const DashBoardScreen = ({route}) => {
  const [trackDetails, setTrackDetails] = useState({
    selectedTrackDetail: '',
    trackDetail: {},
  });
  useEffect(() => {
    axios(`https://api.spotify.com/v1/tracks/${route.params.tractId}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + route.params.token,
      },
    })
      .then(trackDetailsResponse => {
        setTrackDetails({
          trackDetail: trackDetailsResponse.data,
        });
      })
      .catch(err => {});
  }, [trackDetails.selectedTrackDetail]);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.subConatainer}>
          <View>
            <FastImage
              style={styles.squareImage}
              source={{uri: trackDetails.trackDetail?.album?.images[0]?.url}}
            />
          </View>
          <View style={styles.detailView}>
            <Text>Name: {trackDetails?.trackDetail?.name}</Text>
            <Text>
              Artist Name: {trackDetails.trackDetail?.album?.artists[0]?.name}
            </Text>
            <Text>Album Name:{trackDetails.trackDetail?.album?.name}</Text>
            <Text>
              Duration:
              {Math.floor(
                (trackDetails.trackDetail.duration_ms / (1000 * 60)) % 60,
              )}{' '}
              min
            </Text>
          </View>
        </View>
      </View>
      <View style={{paddingHorizontal: 30}}>
        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'red'}}>
          This whole application contain basic understanding that how spotify
          works. It show playlist, tracks list and track details. This is a very
          basic design however we can add countless things in it.{' '}
        </Text>
      </View>
    </>
  );
};

export default DashBoardScreen;
