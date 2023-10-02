// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  likesRBSheetContainer: {
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    backgroundColor: Colors.white,
    // width: '94%',
    // margin: 'auto',
    // overflow: 'visible',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    shadowColor: Colors.black,
  },

  likeMainView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomColor: '#c8c7cc7d',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingBottom: 15,
  },

  likeView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  likeProfilePic: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginRight: 10,
    alignSelf: 'flex-start',
  },

  nameView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  nameStyle: {
    color: '#252529',
    fontSize: 13,
    fontFamily: Fonts.type.medium,
  },

  athleteStyle: {
    color: '#252529',
    fontSize: 13,
  },

  timeStyle: {
    color: '#8A8A8F',
    fontSize: 11,
  },

  likeTypeMainView: {
    // flexDirection: 'row',
    // alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },

  likeTypeView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
    paddingHorizontal: 3,
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },

  likeTypeViewSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
    paddingHorizontal: 3,
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: '#0E0E0E',
  },

  likeTypeTextSelected: {
    color: '#0E0E0E',
    fontSize: 14,
    fontFamily: Fonts.type.medium,
  },

  likeTypeText: {
    color: '#3B3B3B',
    fontSize: 14,
    fontFamily: Fonts.type.medium,
  },

  likeTypeImg: {
    marginRight: 5,
    width: 20,
    height: 20,
  },

  closeButton: {
    width: 40,
    height: 60,
    position: 'absolute',
    right: 0,
    top: 6,
    justifyContent: 'center',
  },

  innerActionWrap: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },

  innerActionBtn: {
    paddingHorizontal: 5,
    width: 50,
    ...AppStyles.centerInner,
  },

  postActionsArea: {
    marginTop: -30,
    borderRadius: 105,
    backgroundColor: Colors.white,
    // paddingVertical: 14,
    ...AppStyles.pLeft15,
    ...AppStyles.pRight15,
    flexDirection: 'row',
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 40,
    elevation: 40,
    shadowColor: 'rgba(0,0,0,0.12)',
  },

  thumbsActions: {
    width: 180,
    ...AppStyles.pLeft15,
    ...AppStyles.pRight15,
    marginBottom: 70,
    shadowColor: 'rgba(0,0,0,1)',
  },

  actionBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 18,
  },
});
