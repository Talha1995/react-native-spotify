import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#D2D2D2',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  subConatainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignContent: 'center',
    alignItems: 'center',
  },
  detailView: {
    paddingHorizontal: 20,
    marginVertical: 10,
    width: '60%',
  },
  squareImage: {
    height: 150,
    width: 150,
  },
  roundedImage: {
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
  },
});
