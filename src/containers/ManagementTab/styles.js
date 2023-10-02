// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  approvalContainer: {
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    flex: 1,
    ...AppStyles.paddingHorizontalBase,
  },

  // parent
  page: {
    backgroundColor: Colors.whiteMain,
    flex: 1,
  },
  container: {
    flex: 1,
    ...AppStyles.paddingHorizontalBase,
  },
  attList: {
    ...AppStyles.padding15,
    ...AppStyles.mBottom20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 40,
    shadowColor:
      Platform.OS === 'ios'
        ? 'rgba(78, 79, 114, 0.15)'
        : 'rgba(78, 79, 114, 1)',
  },

  // facility
  addIconButton: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    backgroundColor: Colors.black,
    borderRadius: 50,
  },

  invitePeopleMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
    paddingHorizontal: 5,
  },

  invitePeopleView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  invitePeopleText: {
    marginLeft: 20,
    fontSize: 18,
    color: Colors.white,
  },
  // team rbsheet
  commentContainer: {
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    backgroundColor: Colors.white,
    width: '100%',
    margin: 'auto',
    overflow: 'visible',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    shadowColor: Colors.black,
  },
  atheleteDetailArea: {
    ...AppStyles.mTop10,
    ...AppStyles.padding30,
    ...AppStyles.flexRow,
    ...AppStyles.spaceBetween,
  },
  postHeader: {
    flex: 1,
    ...AppStyles.pLeft30,
    ...AppStyles.pRight30,
  },
  headerLeft: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  profileImage: {
    width: 51,
    height: 51,
    overflow: 'hidden',
    ...AppStyles.mRight15,
    borderRadius: 51,
  },
  postIntro: {
    justifyContent: 'center',
  },

  actionPostMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 10,
  },

  actionPostView: {
    flexDirection: 'row',
  },

  actionPostHeading: {
    color: '#252529',
    fontFamily: Fonts.type.bold,
    fontWeight: '700',
    fontSize: 15,
  },

  actionPostDescription: {
    color: '#252529',
    fontWeight: '400',
    fontSize: 13,
  },

  undoButtonView: {
    backgroundColor: '#FAF5FF',
    borderColor: '#E9D8FD',
    borderWidth: 1,
    borderRadius: 42,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },

  undoButton: {
    color: '#553C9A',
    fontSize: 10,
    fontWeight: '500',
    fontFamily: Fonts.type.medium,
  },
});
