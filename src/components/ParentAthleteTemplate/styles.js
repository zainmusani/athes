// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  parentAthleteEventContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    borderTopRightRadius: 32,
    marginTop: 8,
    marginBottom: 7,
    borderLeftColor: Colors.grey6,
    borderLeftWidth: 6,
  },

  time: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: Fonts.type.medium,
    fontWeight: '500',
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginRight: 10,
  },

  title: {
    color: Colors.black,
    fontSize: 18,
    fontFamily: Fonts.type.medium,
    fontWeight: '500',
  },

  titleTeamView: {
    color: Colors.black,
    paddingVertical: 10,
    fontSize: 18,
    fontFamily: Fonts.type.medium,
    fontWeight: '500',
  },

  subTitle: {
    color: Colors.black,
    fontSize: 13,
    fontFamily: Fonts.type.medium,
    fontWeight: '500',
  },

  subTitleTeamView: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: Fonts.type.medium,
    fontWeight: '500',
    marginBottom: 4,
  },

  subTitleSeasonView: {
    color: Colors.black,
    fontSize: 10,
    fontFamily: Fonts.type.medium,
    fontWeight: '500',
  },

  images: {
    width: 20,
    height: 20,
    borderRadius: 50,
    marginLeft: -6,
    borderWidth: 2,
    borderColor: '#E8ECFC',
  },

  imagesSeasonView: {
    width: 20,
    height: 20,
    borderRadius: 50,
    marginLeft: -6,
    borderWidth: 2,
    borderColor: '#E8ECFC',
    marginTop: 3,
  },
  viewMore: {
    width: 20,
    height: 20,
    borderRadius: 50,
    marginLeft: -8,
    borderWidth: 2,
    borderColor: '#E8ECFC',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#464646',
  },
});
