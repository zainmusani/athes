import {BASE_URL} from '../config/WebService';
import util from '../util';
import {Image as CompressImage} from 'react-native-compressor';
import RNFS from 'react-native-fs';
import {FFmpegKit} from 'ffmpeg-kit-react-native';
import BackgroundService from 'react-native-background-actions';
import {useDispatch} from 'react-redux';
import {isAddingPost} from '../actions/PostActions';

export const uploadImageToServer = async (
  file,
  setUploadImageUri,
  setLoader,
) => {
  setLoader(true);

  await compRessImages(file);

  let URL = '';
  let fileUri = file.path;
  let fileType = file.mime;

  const fileExt = util.getFileExtension(fileUri);
  try {
    await fetch(`${BASE_URL}api/v1/upload/sign?ext=${fileExt}`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${util.getCurrentUserAccessToken()}`,
      }),
    })
      .then(response => response.json())
      .then(result => {
        URL = result.data;
      });
  } catch (error) {
    setLoader(false);
    console.log('PIC Error', error);
  }

  const media = {
    uri: fileUri,
    type: fileType,
    name: 'imageFile.' + fileExt,
  };

  await fetch(URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: media,
    ACL: 'public-read',
  })
    .then(result => {})
    .catch(err => {
      setLoader(false);
      console.error('err', err);
    });

  let imageUrl = URL[0].split('?')[0];

  setUploadImageUri(imageUrl);

  setLoader(false);

  return imageUrl;
};

export const uploadMediaInBackground = async (
  file,
  dispatch,
  api,
  key,
  afterApi,
  afterPayload,
  id,
  child_profile = false
) => {
  const options = {
    taskName: `Uploading ${key}`,
    taskTitle: 'Uploading...',
    taskDesc: 'uploading inprogress.',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#0f0',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
      delay: 1000,
    },
  };

  await BackgroundService.start(async () => {
    let whiteReducerKeys = {uplaoding: key, ids: []};
    if (id) {
      whiteReducerKeys.ids.push(id);
    }
    dispatch(isAddingPost(whiteReducerKeys));
    await compRessImages(file);

    let URL = '';
    let fileUri = file.path;
    let fileType = file.mime;

    const fileExt = util.getFileExtension(fileUri);
    try {
      await fetch(`${BASE_URL}api/v1/upload/sign?ext=${fileExt}`, {
        method: 'GET',
        headers: new Headers({
          Authorization: `Bearer ${util.getCurrentUserAccessToken()}`,
        }),
      })
        .then(response => response.json())
        .then(result => {
          URL = result.data;
        });
    } catch (error) {
      async () => {
        await BackgroundService.stop();
      };
      console.log('PIC Error', error);
    }

    const media = {
      uri: fileUri,
      type: fileType,
      name: 'imageFile.' + fileExt,
    };

    await fetch(URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: media,
      ACL: 'public-read',
    })
      .then(result => {})
      .catch(async err => {
        await BackgroundService.stop();
        console.error('err', err);
      });

    let imageUrl = URL[0].split('?')[0];  
    
    let payload = {};
    payload[key] = imageUrl;
    if (child_profile) {
      payload.child_id = id;
    }


    dispatch(
      api(payload, async res => {
        await BackgroundService.stop();
        dispatch(afterApi(afterPayload, res => {}));
        dispatch(isAddingPost({}));
      }),
    );
  }, options);

  return imageUrl;
};

export const multiMediaUploadToServer = async (
  file,
  setUploadImageUri,
  setLoader,
) => {
  let fileExt = '';
  let typeOfUris = util.cloneDeepArray(file);

  typeOfUris.forEach((res, idx) => {
    fileExt +=
      util.getFileExtension(res.path) +
      (idx < typeOfUris.length - 1 ? ',' : '');
  });

  let comingSignedUri = [];

  try {
    await fetch(`${BASE_URL}api/v1/upload/sign?ext=${fileExt}`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${util.getCurrentUserAccessToken()}`,
      }),
    })
      .then(response => response.json())
      .then(result => {
        comingSignedUri = result.data;
      });
  } catch (error) {
    console.log('PIC Error', error);
  }

  if (!util.isArrayEmpty(comingSignedUri)) {
    const uploadMedia = [];
    comingSignedUri.forEach((res, index) => {
      uploadMedia.push(uploadToS3BySigned(file, res, index));
    });

    let mediaUpload = file;

    await Promise.all(uploadMedia).then(uploadedImgs => {
      uploadMedia.map((_, index) => {
        mediaUpload[index]['path'] = uploadedImgs[index];

        if (index === comingSignedUri.length - 1) {
          setUploadImageUri(mediaUpload);
        }
      });
    });

    setLoader(false);

    return mediaUpload;
  }

  setLoader(false);

  return 'mediaUpload';
};

async function uploadToS3BySigned(file, item, index) {
  let imageUrl = null;
  const fileExt = util.getFileExtension(file[index].path);

  const media = {
    uri: file[index].path,
    type: file[index].type,
    name: 'mediaFile.' + fileExt,
  };
  
  await fetch(item, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: media,
    ACL: 'public-read',
  })
    .then(result => {
      imageUrl = result.url.split('?')[0];
    })
    .catch(err => console.error('err', err));
    
  return imageUrl;
}

const compRessImages = async images => {
  try {
    if (!Array.isArray(images)) {
      if (images.path.includes('.mp4') || images.path.includes('.mov')) {
        // const finalVideo = `file://${RNFS.CachesDirectoryPath}/audioVideoFinal.mp4`;
        // await cacheResourcePath(images.path).then(async rVideoUrl => {
        //   const ffmpegCmdString = `-y -i ${rVideoUrl} -codec:v libx264 -pix_fmt yuv420p -b:v 2000k -preset slow ${finalVideo}`;
        //   await FFmpegKit.execute(ffmpegCmdString).then(async result => {
        //     images.path = finalVideo;
        //   });
        // });
      } else {
        images.path = await CompressImage.compress(images.path, {
          compressionMethod: 'auto',
        });
      }
    }
  } catch (errorWhileCompressingImage) {
    alert({
      error: 'errorWhileCompressingImage err 1' + errorWhileCompressingImage,
    });
    console.log({
      error: 'errorWhileCompressingImage err 1' + errorWhileCompressingImage,
    });
  }
};

async function cacheResourcePath(sourcePath) {
  const uriComponents = sourcePath.split('/');
  const fileNameAndExtension = uriComponents[
    uriComponents.length - 1
  ].replaceAll(' ', '');

  const destPath = `file://${RNFS.CachesDirectoryPath}/${fileNameAndExtension}`;

  await RNFS.copyFile(sourcePath, destPath);
  return destPath;
}
