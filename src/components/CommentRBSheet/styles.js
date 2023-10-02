// @flow
import {Platform, StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  // Comment Style
  commentClose: {
    width: 40,
    height: 60,
    position: 'absolute',
    right: 0,
    top: 6,
    justifyContent: 'center',
  },
  topBackBtn: {
    width: 40,
    height: 60,
    position: 'absolute',
    left: 15,
    top: 5,
    justifyContent: 'center',
  },
  commentContainer: {
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    backgroundColor: Colors.white,
    position: Platform.OS == 'ios' ? 'relative' : 'absolute',
    bottom: Platform.OS == 'ios' ? 'auto' :  0,
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
  comments: {
    flex: 1,
    ...AppStyles.padding20,
  },
  commentAvator: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  commentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#C8C7CC',
    ...AppStyles.pTop10,
    ...AppStyles.pBottom10,
  },
  commentDetail: {
    flexGrow: 1,
    ...AppStyles.pLeft10,
    ...AppStyles.pRight10,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  //
  innerActionWrap: {
    position: 'absolute',
    left: 50,
    top: 30,
    zIndex: 9,
    justifyContent: 'flex-end',
  },
  postActionsArea: {
    borderRadius: 50,
    backgroundColor: Colors.white,
    ...AppStyles.pLeft15,
    ...AppStyles.pRight15,
    flexDirection: 'row',
    width: 145,
    justifyContent: 'space-between',
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
    ...AppStyles.pLeft15,
    ...AppStyles.pRight15,
    marginBottom: 70,
    shadowColor: 'rgba(0,0,0,1)',
  },
  actionBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 9,
  },
  innerActionBtn: {
    paddingHorizontal: 5,
  },
  closeButton: {
    width: 40,
    height: 60,
    position: 'absolute',
    right: 0,
    top: 6,
    justifyContent: 'center',
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
  likeTypeImg: {
    marginRight: 5,
    width: 20,
    height: 20,
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
  likeProfilePic: {
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
  replyContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 10,
  },
  replyLine: {backgroundColor: '#C8C7CC', height: '90%', width: 1},
  replyCommentsContainer: {paddingHorizontal: 10, width: '90%'},
});

