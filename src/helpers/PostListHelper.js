import util from '../util';
import _ from 'lodash';
import DataHandler from '../services/DataHandler';
import { Images } from '../theme';
import {debug} from 'react-native-reanimated';

// in this manipulator we are getting some params from API
export const manipulatePostListData = data => {
  if (_.isEmpty(data)) return [];
  let list = null;

  if (data.filter) {
    list = data?.filter(res => {
      res.media.map(img => {
        img.media_extension = img.media_extension;
        img.uri = img.media_url;
        return img;
      });

      res.user.image = res?.user?.image
        ? res?.user?.image
        : 'https://athes.s3.us-east-2.amazonaws.com/Profile_avatar_placeholder_large.png';

      if (res.parent_id) {
        res.parent[0].media.map(img => {
          img.media_extension = img.media_extension;
          img.uri = img.media_url;
          return img;
        });

        res.parent[0].user.image =
          res.parent[0].user.image && !_.isEmpty(res.parent[0].user.image)
            ? res.parent[0].user.image
            : 'https://athes.s3.us-east-2.amazonaws.com/Profile_avatar_placeholder_large.png';
      }

      return res;
    });
  }

  return list;
};

export const manipulatePostData = data => {
  if (_.isEmpty(data)) return [];

  let currentUser = DataHandler.getStore().getState().user.data;
  data.media = data.media.map(img => {
    img.media_extension = img.media_extension;
    img.uri = img.media_url;
    return img;
  });

  data.post_text = data?.post_text ?? 0;
  data.parent_id = data?.parent_id ?? 0;
  data.parent = data?.parent ?? [];
  data.user = data.child ? data.child : currentUser;
  data.react = data?.react ?? 0;
  data.comment = data?.comment ?? 0;
  data.postTags = data?.postTags ?? [];
  
  return data;
};

export const manipulatePostReactsData = data => {
  if (_.isEmpty(data)) return {};

  data.likesReactArray = [
    {
      id: 1,
      icon: '',
      likes: 'All',
      type: 'all',
    },
    {
      id: 2,
      icon: Images.likeHands,
      likes: data.clap,
      type: 'hight_five',
    },
    {
      id: 3,
      icon: Images.letsGo,
      likes: data.care,
      type: 'lets_go',
    },
    {
      id: 4,
      icon: Images.thumbsUp,
      likes: data.liked,
      type: 'thumbs_up',
    },
  ];

  data.users.map((obj, i) => {
    let type = '';
    let type_image = '';
    obj.id = i;
    const [reaction] = Object.entries(obj.reaction).find(([r, v]) => v > 0);
    switch (reaction) {
      case 'clap':
        type = 'hight_five';
        type_image = Images.likeHands;
        break;
      case 'care':
        type = 'lets_go';
        type_image = Images.letsGo;
        break;
      case 'liked':
        type = 'thumbs_up';
        type_image = Images.thumbsUp;
        break;
      default:
        break;
    }

    obj.type = type;
    obj.type_image = type_image;

    obj.user.Athlete = util.getRoleNameByID(obj?.user?.userRole?.role_id) || 'parent athlete';

    if (!obj.user.image)
      obj.user.image =
        'https://athes.s3.us-east-2.amazonaws.com/Profile_avatar_placeholder_large.png';
  });

  return data;
};

export const manipulateGalleryData = data => {
  if (_.isEmpty(data)) return [];
  let list = null;
  if (data.map) {
    list = data.map(res => {
      res.map(img => {
        img.uri = img.media_url;
        return img;
      });
      return res;
    });
  }
  return list;
};

export const manipulateGroupListData = data => {
  if (_.isEmpty(data)) return null;

  data?.map(res => {
    res.isSelected = false;
    return res;
  });

  return data;
};