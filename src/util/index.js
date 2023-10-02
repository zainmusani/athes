// @flow
import _, {
  cloneDeep,
  every,
  filter,
  find,
  findIndex,
  has,
  includes,
  isEmpty,
  isEqual,
  isNil,
  lowerCase,
  merge,
  round,
  some,
  unionBy,
  uniqBy,
  upperFirst,
} from 'lodash';
import moment from 'moment';
import {Linking, Platform, useWindowDimensions} from 'react-native';
import {MessageBarManager} from 'react-native-message-bar';
import {Actions} from 'react-native-router-flux';
import {setCurrentActiveScreenName} from '../actions/GeneralActions';
import {
  refreshToken,
  userSignOutRequest,
  userSignOutSuccess,
} from '../actions/UserActions';
import {BASE_URL} from '../config/WebService';
import {
  EMIT_TO_SERVER_TYPES,
  MESSAGE_TYPES,
  NOTIFICATIONS_TYPE,
  paymentCard,
  RESOURCETYPE,
  SOCIAL_LOGIN_TYPES,
  strings,
} from '../constants';
import {emitToServer} from '../helpers/chatHelper';
import DataHandler from '../services/DataHandler';
import {Colors, Fonts, Images} from '../theme';
import messaging from '@react-native-firebase/messaging';

class Util {
  reg = new RegExp('^[0-9]+$');
  validNumber = new RegExp(/^\d*\.?\d*$/);

  keyExtractor = (item, index) => index.toString();
  isPlatformAndroid() {
    return Platform.OS === 'android';
  }
  isValidURL(url) {
    const re =
      /^(http|https|fttp):\/\/|[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/;
    return re.test(url);
  }
  isEmailValid(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  isPasswordValid(password) {
    const re = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])\S{6,40}$/;
    if (password.length > 5) {
      return re.test(password);
    } else {
      return false;
    }
  }
  isValidName(name) {
    return /^[a-zA-Z '.]*$/.test(name);
  }
  isOnlyNumber(number) {
    return number.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '');
  }

  isValidUserName(username) {
    var regexp = /^\S*$/;
    return regexp.test(username);
  }

  topAlert(message, alertType = 'success') {
    MessageBarManager.showAlert({
      duration: 10000,
      message,
      alertType,
      viewBottomInset: 10,
      viewTopInset: Platform.OS == 'ios' ? 50 : 10,
      position: 'top',
      messageStyle: {
        fontSize: 14,
        textAlign: 'center',
      },
      stylesheetSuccess: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        messageColor: Colors.white,
        height: 50,
      },
      stylesheetError: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        messageColor: Colors.white,
        height: 50,
      },
    });
  }

  topAlertError(message, alertType = MESSAGE_TYPES.ERROR) {
    MessageBarManager.showAlert({
      duration: 10000,
      message,
      alertType,
      viewBottomInset: 10,
      viewTopInset: Platform.OS == 'ios' ? 50 : 10,
      position: 'top',
      messageStyle: {
        fontSize: 14,
        textAlign: 'center',
      },
      stylesheetSuccess: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        messageColor: Colors.white,
        height: 50,
      },
      stylesheetError: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        messageColor: Colors.white,
        height: 50,
      },
    });
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  formatTime(dateTime) {
    return moment(dateTime).format('hh:mm A');
  }

  formatDateAndTime(dateTime) {
    return moment(dateTime).format('DD/MM/YYYY hh:mm A');
  }

  getFormattedDateTime = (date, format) => {
    if (date) return moment(date).format(format);
    return '';
  };

  showLoader = (instance, loadingFor = '') => {
    if (!instance.state.loading) {
      instance.setState({
        loading: true,
        loadingFor,
      });
    }
  };

  hideLoader = (instance, callback) => {
    if (instance.state.loading) {
      instance.setState(
        {
          loading: false,
          loadingFor: '',
        },
        callback,
      );
    }
  };

  getCurrentUserAccessToken() {
    return DataHandler.getStore().getState().user?.data.access_token;
  }

  isNumber(val) {
    return /^\d+$/.test(val);
  }

  openLinkInBrowser(url) {
    if (url) {
      Linking.openURL(url).catch(() => {
        this.topAlertError(strings.INVALID_URL_FOUND);
      });
    } else {
      console.log("Don't know how to open URI: ");
    }
  }

  generateGetParameter(obj) {
    let final = '?';
    for (const key in obj) {
      final = `${final}${key}=${obj[key]}&`;
    }
    final = final.slice(0, -1);
    return final;
  }

  numberCount(count) {
    let number = null;
    if (count <= 9) {
      number = count;
    } else if (count > 9) {
      number = '9+';
    }
    return number;
  }

  isFieldNil = field => {
    return isNil(field);
  };

  isArrayEmpty = mArr => {
    return isEmpty(mArr);
  };

  cloneDeepArray = mArr => cloneDeep(mArr);

  cloneDeep = toClone => cloneDeep(toClone);

  findDataFromArray = (mArr, mFunc) => find(mArr, mFunc);

  isArrayIncludesValue = (mArr, mValue) => includes(mArr, mValue);

  isStringsIncludesValue = (mStr, mValue) => includes(mStr, mValue);

  includesValue = (mStr, mValue) => includes(mStr, mValue);

  findIndexByString = (mArr, mString) =>
    findIndex(mArr, item => item === mString);

  areValuesEqual = (objA, objB) => isEqual?.(objA, objB);

  isEmptyValue = (value = '') => isEmpty(String(value?.trim()));

  isEmptyObject = (value = {}) => isEmpty(value);

  isEmptyValueWithoutTrim = (value = '') => isEmpty(String(value));

  excludeIdFromArray = (mArr, id) => filter(mArr, item => item.id != id);

  filterArray = (mArr, mFunc) => filter(mArr, mFunc);

  doesArrayContainsParticularId = (array, mId) => {
    if (find(array, {id: mId})) return true;
    else return false;
  };

  hasObjectWithKey = (mObj, key) => has(mObj, key);

  getIndexOfObjFromArray_byID = (mArr, id) =>
    findIndex(mArr, item => item.id == id);

  getIdsFromArray = mArr => {
    let idsArr = [];
    mArr.map(item => {
      idsArr.push(item.id);
    });
    return idsArr;
  };

  upperFirst = mStr => upperFirst(mStr);

  lowerCase = mStr => lowerCase(mStr);

  some = (mArr, _obj) => some(mArr, _obj);

  every = (mArr, _func) => every(mArr, _func);

  uniqBy = (mArr, _func) => uniqBy(mArr, _func);

  roundValue = val => round(val);

  // unionById = (mArrOne, mArrTwo) => unionBy(mArrOne, mArrTwo, 'id');
  unionById = (mArrOne, mArrTwo) => {
    let mArrOneClone = this.cloneDeepArray(mArrOne);
    let mArrTwoClone = this.cloneDeepArray(mArrTwo);

    if (this.isArrayEmpty(mArrOneClone) || this.isArrayEmpty(mArrTwoClone)) {
      if (!this.isArrayEmpty(mArrOneClone)) return mArrOneClone;
      else return mArrTwoClone;
    }

    mArrOneClone = unionBy(mArrOne, mArrTwo, 'id');
    for (let i = 0; i < mArrTwo.length; i++) {
      const mIndex = this.findIndexById(mArrOneClone, mArrTwo[i].id);
      mArrOneClone[mIndex] = mArrTwo[i];
    }
    return mArrOneClone;
  };

  getCreditCardImage = cardType => {
    let cardTypeBrandName = String(cardType).toLocaleLowerCase();
    if (this.includesValue(cardTypeBrandName, 'master'))
      return Images.mastercardIcon;
    else if (this.includesValue(cardTypeBrandName, 'visa'))
      return Images.visaCardLogo;
    else if (this.includesValue(cardTypeBrandName, 'american'))
      return Images.americanExpressCardLogo;
    else if (this.includesValue(cardTypeBrandName, 'discover'))
      return Images.discoverCardLogo;
    else if (this.includesValue(cardTypeBrandName, 'jcb'))
      return Images.jcbCardIcon;
    else if (this.includesValue(cardTypeBrandName, 'diners'))
      return Images.dinersCardIcon;
    else {
      return Images.defaultCardIcon;
    }
  };

  findIndexById = (mArr, id) => findIndex(mArr, item => item.id === id);

  findIndex = (mArr, _func) => findIndex(mArr, _func);

  isRequiredErrorMessage(fieldName) {
    return `${this.capitalizeFirstLetter(fieldName)} is required`;
  }

  errorMessage(fieldName) {
    return `${this.capitalizeFirstLetter(fieldName)}`;
  }

  passwordNotMatch(fieldName) {
    return `${this.capitalizeFirstLetter(fieldName)} not match`;
  }

  formatAMPM(date, twelveHours = true) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  mergeObj = (obj, obj2) => merge(obj, obj2);

  //a simple date formatting function
  dateFormat(inputDate, format = 'MM/dd/yyyy') {
    //parse the input date
    const date = new Date(inputDate);

    //extract the parts of the date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    //replace the month
    format = format.replace('MM', month.toString().padStart(2, '0'));

    //replace the year
    if (format.indexOf('yyyy') > -1) {
      format = format.replace('yyyy', year.toString());
    } else if (format.indexOf('yy') > -1) {
      format = format.replace('yy', year.toString().substr(2, 2));
    }

    //replace the day
    format = format.replace('dd', day.toString().padStart(2, '0'));

    return format;
  }

  formatDate(inputDate) {
    return inputDate ? moment(inputDate).format('MM/DD/YYYY') : inputDate;
  }

  getMonthFromDate(param) {
    let date = new Date(param);
    let month = date.getMonth();
    return month;
  }

  getDayNameFromDate(dateString) {
    var days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    var d = new Date(dateString);
    var dayName = days[d.getDay()];
    return dayName;
  }

  getFileExtension = url => {
    return url.slice((Math.max(0, url.lastIndexOf('.')) || Infinity) + 1);
  };

  getRoleNameByID(id) {
    switch (id) {
      case 1:
        return 'Parent';
      case 2:
        return 'Athlete';
      case 3:
        return 'coach';
      case 4:
        return 'team';
      case 5:
        return 'organization';
      case 6:
        return 'facility';

      default:
        return '';
    }
  }

  timeAgo(date) {
    date = moment(date);
    var seconds = Math.floor((moment() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return (
        Math.floor(interval) +
        (Math.floor(interval) == 1 ? ' year ago' : ' years ago')
      );
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        (Math.floor(interval) == 1 ? ' month ago' : ' months ago')
      );
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        (Math.floor(interval) == 1 ? ' day ago' : ' days ago')
      );
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        (Math.floor(interval) == 1 ? ' hour ago' : ' hours ago')
      );
    }
    interval = seconds / 60;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        (Math.floor(interval) == 1 ? ' minute ago' : ' minutes ago')
      );
    }
    if (interval < 1) {
      return ' Just Now.';
    }
    return Math.floor(seconds) + ' seconds ago';
  }

  logoutUser() {
    let payload = {
      device_token: this.getDeviceToken(),
    };

    DataHandler.getStore().dispatch(
      userSignOutRequest(payload, res => {
        if (res) Actions.reset('login');
      }),
    );
    
    emitToServer(EMIT_TO_SERVER_TYPES.OFFLINE_USER);
    Actions.reset('login');
  }

  redirectAgreementScreen(res) {
    let role = DataHandler.getStore().getState().user?.data.role;

    if (role == null && res?.isAgree == false) {
      this.logoutUser();
    }

    if (role == 2 && res?.isAgree == false) {
      Actions.reset('introvideo');
    }
  }

  getMonthName(month) {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return monthNames[month - 1];
  }

  convert12t24(time) {
    const value = time.includes('PM') && time.split(':');
    value[0] = +value[0] + 12;
    return value.join(':');
  }

  getAgeFromDob(dob) {
    return moment().diff(moment(dob, 'YYYYMMDD'), 'years');
  }

  convertTimeInto12(time) {
    if (_.isUndefined(time) || _.isEmpty(time)) {
      return time;
    }

    let newDate = moment(`${time}`, 'hh:mm A').format('hh:mm A');
    // .toString();
    return newDate;
  }

  createDateOfBirth = dob => {
    const dateOfBirth = dob?.toString()?.split('');

    let slash = Platform.OS == 'ios' ? '/' : '-';

    dateOfBirth?.splice(4, 0, slash);
    dateOfBirth?.splice(7, 0, slash);

    return dateOfBirth?.join('');
  };

  getFromattedDuration = (duration = 0) => {
    const date = new Date(0);
    date.setSeconds(duration);
    const string = date.toISOString().substring(11, 19);
    return string?.startsWith('00:') ? string?.slice(3) : string;
  }
  
  getTitlesFromSelectArray = array => {
    let titles = [];
    array.forEach(res => {
      titles.push(res.title);
    });
    return titles;
  };

  getFontSize = () => {
    let fontSize = useWindowDimensions().fontScale;
    fontSize = fontSize < 2 ? fontSize + 3.5 : fontSize + 1.5;
    return fontSize;
  };

  getContactNumberInputFontSize = () => {
    let fontSize = useWindowDimensions().fontScale;
    if (this.isPlatformAndroid()) {
      if (fontSize < 1) {
        fontSize = Fonts.size.medium;
      } else {
        fontSize = Fonts.size.xxxSmall;
      }
    } else {
      if (
        fontSize === 0.823 ||
        fontSize === 0.882 ||
        fontSize === 0.941 ||
        fontSize === 1
      ) {
        fontSize = Fonts.size.medium;
      } else if (fontSize === 1.118) {
        fontSize = Fonts.size.small;
      } else if (fontSize === 1.235 || fontSize === 1.353) {
        fontSize = Fonts.size.xxSmall;
      } else if (fontSize === 1.786) {
        fontSize = Fonts.size.xxxSmall;
      } else if (fontSize === 2.143) {
        fontSize = Fonts.size.xxxxSmall;
      } else if (fontSize === 2.643) {
        fontSize = 6;
      } else if (fontSize === 3.143 || fontSize === 3.571) {
        fontSize = 5;
      }
    }
    return fontSize;
  };

  getDurationTime = (createdAt, duration) => {
    let now = moment();
    let createAt = moment(createdAt);

    let diff = now.diff(createAt, duration);

    return diff;
  };

  manipulateDataForSectionList = mArray => {
    const format = {
      NEW: 'New',
      TODAY: 'Today',
      WEEK: 'This Week',
      MONTH: 'This Month',
      OTHER: 'Others',
    };

    let notificationData = [];
    let newNotifications = [];
    let todayNotifications = [];
    let weekNotifications = [];
    let monthNotifications = [];
    let othersNotifications = [];

    mArray?.map(item => {
      const {isSeen, createdAt} = item || {};

      const today = moment();

      const isNew = this.areValuesEqual(isSeen, false);
      const isTodaysNotification = moment().isSame(createdAt, 'day');

      const beginWeek = moment(today).startOf('isoweek');
      const isWeekNotification = moment(createdAt).isBetween(beginWeek, today);

      const beginMonth = moment(today).startOf('month');
      const isMonthNotification = moment(createdAt).isBetween(
        beginMonth,
        beginWeek,
      );

      if (isNew) {
        let objectItem = this.cloneDeep(item);
        let mintsDiff = this.getDurationTime(createdAt, 'minutes');
        let mints = Math.abs(mintsDiff);
        if (mints < 60) {
          objectItem['duration'] = this.areValuesEqual(mints, 0)
            ? 'now'
            : mints + 'm';
        } else {
          let hrs = mints / 60;
          objectItem['duration'] = Math.round(hrs) + 'h';
        }
        newNotifications.push(objectItem);
      } else {
        if (isTodaysNotification) {
          let objectItem = this.cloneDeep(item);
          let mintsDiff = this.getDurationTime(createdAt, 'minutes');

          let mints = Math.abs(mintsDiff);
          if (mints <= 60) {
            objectItem['duration'] = this.areValuesEqual(mints, 0)
              ? 'now'
              : mints + 'm';
          } else {
            let hrs = mints / 60;
            objectItem['duration'] = Math.round(hrs) + 'h';
          }
          todayNotifications.push(objectItem);
        } else if (!!isWeekNotification) {
          let objectItem = this.cloneDeep(item);
          let days = this.getDurationTime(createdAt, 'days') + 1;
          objectItem['duration'] = Math.round(days) + 'd';
          weekNotifications.push(objectItem);
        } else if (!!isMonthNotification) {
          let objectItem = this.cloneDeep(item);
          let weeks = (this.getDurationTime(createdAt, 'days') + 1) / 7;

          objectItem['duration'] =
            weeks < 1
              ? this.getDurationTime(createdAt, 'days') + 1 + 'd'
              : Math.round(weeks) + 'w';
          monthNotifications.push(objectItem);
        } else {
          let objectItem = this.cloneDeep(item);
          let months = this.getDurationTime(createdAt, 'months');

          objectItem['duration'] = Math.round(months) + 'M';
          othersNotifications.push(objectItem);
        }
      }
    });

    if (!this.isArrayEmpty(newNotifications)) {
      notificationData.push({
        title: format.NEW,
        data: newNotifications.sort((a, b) => b.createdAt - a.createdAt),
      });
    }
    if (!this.isArrayEmpty(todayNotifications)) {
      notificationData.push({
        title: format.TODAY,
        data: todayNotifications.sort((a, b) => a.createdAt - b.createdAt),
      });
    }
    if (!this.isArrayEmpty(weekNotifications)) {
      notificationData.push({
        title: format.WEEK,
        data: weekNotifications.sort((a, b) => b.createdAt - a.createdAt),
      });
    }
    if (!this.isArrayEmpty(monthNotifications)) {
      notificationData.push({
        title: format.MONTH,
        data: monthNotifications.sort((a, b) => b.createdAt - a.createdAt),
      });
    }
    if (!this.isArrayEmpty(othersNotifications)) {
      notificationData.push({
        title: format.OTHER,
        data: othersNotifications.sort((a, b) => b.createdAt - a.createdAt),
      });
    }

    console.log({notificationData});
    return notificationData;
  };

  notificationsNavigation = data => {
    const cloneData = cloneDeep(data);
    const {role: loginUserRole, id: loggedInUserId} =
      DataHandler.store.getState()?.user?.data;

    const {
      enrollName,
      team,
      enroll,
      isParent,
      enrollParent,
      user,
      post,
      title,
      idForEnrollment,
    } = cloneData || {};

    

    const {rejected} = post || {};

    switch (cloneData.type) {
      case NOTIFICATIONS_TYPE.CHAT_GROUP_CREATED:
      case NOTIFICATIONS_TYPE.CHAT_MESSAGE_RECEIVED: {
        Actions.messageView({item: data});
        break;
      }
      case NOTIFICATIONS_TYPE.POST: {
        if (!!!rejected && !!!isParent && cloneData?.post?.id) {
          !cloneData?.post?.isComment &&
            !cloneData?.post?.isReact &&
            Actions.singlePostView({
              id: cloneData?.post?.id || 0,
            });

          cloneData?.post?.isComment &&
            Actions.singlePostView({
              id: cloneData?.post?.id || 0,
              isComment: cloneData?.post?.isComment,
            });
          cloneData?.post?.isReact &&
            Actions.singlePostView({
              id: cloneData?.post?.id || 0,
              isReact: cloneData?.post?.isReact,
            });
        }
        if (!!isParent) {
          Actions.profile({
            isParentAthleteManagementView: true,
            child_data: {
              id: user?.id,
            },
            userId: user?.id,
            tab: 'Approval',
          });
        }

        break;
      }
      case NOTIFICATIONS_TYPE.FOLLOWING: {
        if (user.parentId == loggedInUserId) {
          Actions.profile({
            child_data: user,
            userId: user.id,
            isParentAthleteManagementView: true,
          });
        } else {
          Actions.profile({
            userId: user.id,
            requested_role: user.role_id,
            publicView: loggedInUserId != user.id,
          });
        }
      }
      case NOTIFICATIONS_TYPE.INVITATION:
        {
          this.areValuesEqual(enrollName, 'event') &&
            Actions.eventDetail({
              data: enroll,
              isEnrollButton: true,
            });
        }
        {
          this.areValuesEqual(enrollName, 'session') &&
            Actions.sessionDetail({
              data: enroll,
              isEnrollButton: true,
            });
        }
        {
          this.areValuesEqual(enrollName, 'season') &&
            Actions.seasonDetail({
              data: enroll,
              isEnrollButton: true,
            });
        }
        {
          this.areValuesEqual(enrollName, 'team') &&
            Actions.profile({
              userId: user.id,
              requested_role: user.role_id,
              publicView: loggedInUserId != user.id,
            });
        }
        {
          this.areValuesEqual(enrollName, 'teamEvent') &&
            Actions.teamEventDetail({
              data: enroll,
              isCreatorView: false,
              idForEnrollment
            });
        }
        break;
      case NOTIFICATIONS_TYPE.CANCELATION: {
        break;
      }
      case NOTIFICATIONS_TYPE.ENROLL: {
        if (this.areValuesEqual(enrollName, 'facility') && !enroll.isCancel) {
          Actions.facilityDetail({
            isPublicView: true,
            facilityId: enroll?.id,
            isCreatorView: true,
          });
        }

        if (!!enrollParent) {
          {
            this.areValuesEqual(enrollName, 'event') &&
              Actions.eventDetail({
                data: enroll,
                isEnrollButton: true,
              });
          }
          {
            this.areValuesEqual(enrollName, 'session') &&
              Actions.sessionDetail({
                data: enroll,
                isEnrollButton: true,
              });
          }
          {
            this.areValuesEqual(enrollName, 'season') &&
              Actions.seasonDetail({
                data: enroll,
                isEnrollButton: true,
              });
          }
        } else {
          {
            this.areValuesEqual(enrollName, 'event') &&
              Actions.eventDetail({
                data: enroll,
                isCreatorView: true,
              });
          }
          {
            this.areValuesEqual(enrollName, 'session') &&
              Actions.sessionDetail({
                data: enroll,
                isCreatorView: true,
              });
          }
          {
            this.areValuesEqual(enrollName, 'season') &&
              Actions.seasonDetail({
                data: enroll,
                isCreatorView: true,
              });
          }
          {
            this.areValuesEqual(enrollName, 'teamEvent') &&
              Actions.teamEventDetail({
                data: enroll,
                isCreatorView: true,
              });
          }
        }
        break;
      }
      case NOTIFICATIONS_TYPE.TEAM_JOIN: {
        if (team && team?.isTeam) {
          Actions.replace('managementTab', {refreshNow: new Date()});
        }

        break;
      }
      case NOTIFICATIONS_TYPE.MEETING_BOOK: {
        break;
      }
      case NOTIFICATIONS_TYPE.PAYMENT: {
        if (loginUserRole == 3 || loginUserRole == 5 || loginUserRole == 6) {
          Actions.earnings();
        }
        Actions.investments({tab: title == 'Payment refund' ? 2 : 1});

        break;
      }
    }
  };

  checkIsEndTimeAfterStartTime = (startTime, endTime) => {
    const st = startTime;
    const et = endTime;

    return (
      st.split(' ')[1] === et.split(' ')[1] &&
      +st.split(':')[0] !== 12 &&
      +st.split(':')[0] >= +et.split(':')[0]
    );
  };

  getDeepLinkUrl = (screenName, id) => {
    let finalUrl = '';
    id = id || -1;
    switch (screenName) {
      case RESOURCETYPE.FACILITY: {
        finalUrl = `${BASE_URL}${RESOURCETYPE.FACILITY}/${id}`;
        break;
      }
      case RESOURCETYPE.MEETING: {
        finalUrl = `${BASE_URL}${RESOURCETYPE.MEETING}/${id}`;
        break;
      }
      case RESOURCETYPE.SESSION: {
        finalUrl = `${BASE_URL}${RESOURCETYPE.SESSION}/${id}`;
        break;
      }
      case RESOURCETYPE.SEASON: {
        finalUrl = `${BASE_URL}${RESOURCETYPE.SEASON}/${id}`;
        break;
      }
      case RESOURCETYPE.EVENT: {
        finalUrl = `${BASE_URL}${RESOURCETYPE.EVENT}/${id}`;
        break;
      }
    }
    return `${finalUrl}`;
  };

  deepLinkNavigation = url => {
    const user = DataHandler.getStore().getState().user?.data ?? null;
    const cart = DataHandler.getStore().getState().general?.cart ?? null;

    if (url && !this.isFieldNil(url)) {
      const data = url.split('/');

      const screenName = data?.[3] || undefined;
      let mId = data?.[4] || 0;

      if (mId != 0 && (mId.includes('#') || mId.includes('?'))) {
        mId = mId.split(/[#?]/);
        mId = mId[0];
      }

      if (!this.isFieldNil(screenName)) {
        let payload = null;
        switch (screenName) {
          case RESOURCETYPE.FACILITY: {
            payload = {
              isComingFromDeepLinkUrl: true,
              resourceType: RESOURCETYPE.FACILITY,
              deepLinkData: {
                resourceId: mId,
                selectedPaymentMethod: paymentCard.VENMO_PAY,
                selectedDate: cart?.selectedDate,
                amount: cart?.amount,
              },
            };
            break;
          }
          case RESOURCETYPE.MEETING: {
            payload = {
              isComingFromDeepLinkUrl: true,
              resourceType: RESOURCETYPE.MEETING,
              deepLinkData: {
                resourceId: mId,
                selectedPaymentMethod: paymentCard.VENMO_PAY,
                amount: cart?.amount,
                slotId: cart?.slotId,
              },
            };
            break;
          }
          case RESOURCETYPE.SESSION: {
            payload = {
              isComingFromDeepLinkUrl: true,
              resourceType: RESOURCETYPE.SESSION,
              deepLinkData: {
                resourceId: mId,
                ids: cart?.ids,
                selectedPaymentMethod: paymentCard.VENMO_PAY,
                amount: cart?.amount,
              },
            };
            break;
          }
          case RESOURCETYPE.SEASON: {
            payload = {
              isComingFromDeepLinkUrl: true,
              resourceType: RESOURCETYPE.SEASON,
              deepLinkData: {
                resourceId: mId,
                ids: cart?.ids,
                selectedPaymentMethod: paymentCard.VENMO_PAY,
                amount: cart?.amount,
              },
            };
            break;
          }
          case RESOURCETYPE.EVENT: {
            payload = {
              isComingFromDeepLinkUrl: true,
              resourceType: RESOURCETYPE.EVENT,
              deepLinkData: {
                resourceId: mId,
                ids: cart?.ids,
                selectedPaymentMethod: paymentCard.VENMO_PAY,
                amount: cart?.amount,
              },
            };
            break;
          }
          // case SOCIAL_LOGIN_TYPES.facebook: {
          //   payload = {
          //     redirectLogin: true,
          //   };
          //   break;
          // }
        }

        Actions.deepLinkScreen(payload);
      } else {
        Actions.reset('athes_tab');
      }
    } else {
      setTimeout(() => {
        if (!_.isEmpty(user) && !_.isEmpty(user.access_token)) {
          if (_.isNull(user.role)) {
            if (user.parentId) {
              Actions.reset('athes_tab');
            } else {
              Actions.reset('choicerole');
            }
          } else {
            Actions.reset('athes_tab');
          }
        } else {
          Actions.reset('getstarted');
        }
      }, 2000);
    }
  };

  setSelectedActionName(actionName) {
    DataHandler.getStore().dispatch(setCurrentActiveScreenName(actionName));
  }

  getCurrentUserRefreshToken() {
    return DataHandler.getStore().getState().user.data.refresh_token;
  }

  async refreshAccessToken() {
    console.log('here in refreshAccessToken');
    let options = Object.assign({method: 'POST'});
    let data = {};
    data.token = this.getCurrentUserRefreshToken();
    console.log({refreshData: data});

    options.body = JSON.stringify(data);

    console.log({options});
    try {
      const response = await fetch(`${BASE_URL}auth/v1/refresh-token`, options);
      console.log({newAccessToken: response});

      const responseJson = await response.json();
      console.log({newAccessToken: responseJson.data});

      DataHandler.getStore().dispatch(refreshToken(responseJson.data));
      return responseJson.data.access_token;
    } catch (error) {
      console.log({refreshTokenError: error});
      DataHandler.getStore().dispatch(userSignOutSuccess());
      return false;
    }
  }

  getDeviceToken() {
    return DataHandler.getStore().getState().general?.device_token;
  }
}

export default new Util();
