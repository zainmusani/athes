import moment from 'moment';
import {NOTIFICATIONS, NOTIFICATIONS_TYPE} from '../constants';
import util from '../util';
import {
  manipulateChatNotificationObj,
  manipulateSingleObjOfChat,
} from './chatHelper';

export function manipulateNotificationList(list) {
  if (util.isArrayEmpty(list)) return [];
  let mArtList = [];
  list.forEach((item, index) => {
    let mNotificationObj = manipulateNotification(item);
    mArtList.push(mNotificationObj);
  });
  return mArtList;
}

export function manipulateNotification(payload) {
  const {notificationType, extra_data} = payload || {};
  const extraData = JSON.parse(extra_data) || {};

  let mNotObj = {};

  switch (notificationType) {
    case NOTIFICATIONS_TYPE.POST: {
      mNotObj['id'] = payload?.id ?? 0;
      mNotObj['user'] = extraData?.user ?? {};
      mNotObj['silent'] = payload?.silent ?? 'false';
      mNotObj['title'] = payload?.title ?? '';
      mNotObj['post'] = extraData?.post ?? {};
      mNotObj['postUri'] =
        extraData?.post?.media_thumbnail ?? extraData?.post?.media_url ?? '';
      mNotObj['isSeen'] = payload?.isRead ?? false;
      mNotObj['createdAt'] = payload?.date || payload?.createdAt;
      mNotObj['isParent'] = extraData?.type?.isParent ?? false;
      mNotObj['type'] = payload?.notificationType ?? '';
      break;
    }
    case NOTIFICATIONS_TYPE.FOLLOWING: {
      mNotObj['id'] = payload?.id ?? 0;
      mNotObj['user'] = extraData?.user ?? {};
      mNotObj['silent'] = payload?.silent ?? 'false';
      mNotObj['title'] = payload?.title ?? '';
      mNotObj['isSeen'] = payload?.isRead ?? false;
      mNotObj['createdAt'] = payload?.date || payload?.createdAt;
      mNotObj['type'] = payload?.notificationType ?? '';
      break;
    }
    case NOTIFICATIONS_TYPE.TEAM_JOIN: {
      mNotObj['id'] = payload?.id ?? 0;
      mNotObj['user'] = extraData?.user ?? {};
      mNotObj['title'] = payload?.title ?? '';
      mNotObj['silent'] = payload?.silent ?? 'false';
      mNotObj['order'] = extraData?.order ?? {};
      mNotObj['post'] = extraData?.art ?? {};
      mNotObj['body'] = payload?.body ?? {};
      mNotObj['team'] = extraData?.team ?? {};
      mNotObj['isSeen'] = payload?.isRead ?? false;
      mNotObj['createdAt'] = payload?.date || payload?.createdAt;
      mNotObj['type'] = payload?.notificationType ?? '';
      break;
    }
    case NOTIFICATIONS_TYPE.MEETING_BOOK: {
      mNotObj['id'] = payload?.id ?? 0;
      mNotObj['user'] = extraData?.user ?? {};
      mNotObj['silent'] = payload?.silent ?? 'false';
      mNotObj['title'] = payload?.title ?? '';
      mNotObj['post'] = extraData?.art ?? {};
      mNotObj['isSeen'] = payload?.isRead ?? false;
      mNotObj['createdAt'] = payload?.date || payload?.createdAt;
      mNotObj['type'] = payload?.notificationType ?? '';
      mNotObj['body'] = payload?.body ?? '';
      break;
    }
    case NOTIFICATIONS_TYPE.CANCELATION: {
      mNotObj['id'] = payload?.id ?? 0;
      mNotObj['user'] = extraData?.user ?? {};
      mNotObj['silent'] = payload?.silent ?? 'false';
      mNotObj['title'] = payload?.title ?? '';
      mNotObj['post'] = extraData?.art ?? {};
      mNotObj['isSeen'] = payload?.isRead ?? false;
      mNotObj['createdAt'] = payload?.date || payload?.createdAt;
      mNotObj['type'] = payload?.notificationType ?? '';
      mNotObj['body'] = payload?.body ?? '';
      break;
    }
    case NOTIFICATIONS_TYPE.ENROLL: {
      mNotObj['id'] = payload?.id ?? 0;
      mNotObj['user'] = extraData?.user ?? {};
      mNotObj['silent'] = payload?.silent ?? 'false';
      mNotObj['title'] = payload?.title ?? '';
      mNotObj['body'] = payload?.body ?? '';
      mNotObj['post'] = extraData?.art ?? {};
      mNotObj['isSeen'] = payload?.isRead ?? false;
      mNotObj['createdAt'] = payload?.date || payload?.createdAt;
      mNotObj['type'] = payload?.notificationType ?? '';
      mNotObj['enroll'] = extraData?.type ?? {};
      mNotObj['enrollName'] = extraData?.type?.item ?? '';
      mNotObj['enrollParent'] = extraData?.type?.enroll_parent ?? false;
      break;
    }
    case NOTIFICATIONS_TYPE.GROUP: {
      mNotObj['id'] = payload?.id ?? 0;
      mNotObj['user'] = extraData?.user ?? {};
      mNotObj['silent'] = payload?.silent ?? 'false';
      mNotObj['title'] = payload?.title ?? '';
      mNotObj['body'] = payload?.body ?? '';
      mNotObj['post'] = extraData?.art ?? {};
      mNotObj['isSeen'] = payload?.isRead ?? false;
      mNotObj['createdAt'] = payload?.date || payload?.createdAt;
      mNotObj['type'] = payload?.notificationType ?? '';
      mNotObj['group'] = extraData?.group ?? {};
      mNotObj['isAccept'] = payload?.isAccept ?? 0;

      break;
    }
    case NOTIFICATIONS_TYPE.INVITATION: {
      mNotObj['id'] = payload?.id ?? 0;
      mNotObj['user'] = extraData?.user ?? {};
      mNotObj['silent'] = payload?.silent ?? 'false';
      mNotObj['title'] = payload?.title ?? '';
      mNotObj['post'] = extraData?.art ?? {};
      mNotObj['body'] = payload?.body ?? '';
      mNotObj['isSeen'] = payload?.isRead ?? false;
      mNotObj['createdAt'] = payload?.date || payload?.createdAt;
      mNotObj['group'] = extraData?.group ?? {};
      mNotObj['type'] = payload?.notificationType ?? '';
      mNotObj['enroll'] = extraData?.type ?? {};
      mNotObj['enrollName'] = extraData?.type?.item ?? '';
      if ('idForEnrollment' in extraData?.type)
        mNotObj['idForEnrollment'] = extraData?.type?.idForEnrollment ?? '';
      break;
    }
    case NOTIFICATIONS_TYPE.PAYMENT: {
      mNotObj['id'] = payload?.id ?? 0;
      mNotObj['silent'] = payload?.silent ?? 'false';
      mNotObj['title'] = payload?.title ?? '';
      mNotObj['isSeen'] = payload?.isRead ?? false;
      mNotObj['createdAt'] = payload?.date || payload?.createdAt;
      mNotObj['type'] = payload?.notificationType ?? '';
      mNotObj['body'] = payload?.body ?? '';
      break;
    }
    case NOTIFICATIONS_TYPE.CHAT_GROUP_CREATED:
    case NOTIFICATIONS_TYPE.CHAT_MESSAGE_RECEIVED: {
      mNotObj = {
        type: payload?.notificationType ?? '',
        ...manipulateSingleObjOfChat(extraData),
      };
      mNotObj['body'] = payload?.body ?? '';
      mNotObj['createdAt'] = payload?.date || payload?.createdAt;
      mNotObj['isAccept'] = payload?.isAccept ?? 0;
      mNotObj['isSeen'] = payload?.isRead ?? false;
      mNotObj['title'] = payload?.title ?? '';
      break;
    }
    default: {
      break;
    }
  }
  return mNotObj;
}
