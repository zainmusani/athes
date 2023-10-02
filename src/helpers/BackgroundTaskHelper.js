import BackgroundService from 'react-native-background-actions';
import {isAddingPost} from '../actions/PostActions';
import {multiMediaUploadToServer} from './ImageUploaderHelper';
import {Image as CompressImage} from 'react-native-compressor';
import RNFS from 'react-native-fs';
import {FFmpegKit} from 'ffmpeg-kit-react-native';

const cacheResourcePath = async sourcePath => {
  const uriComponents = sourcePath.split('/');
  const fileNameAndExtension = uriComponents[
    uriComponents.length - 1
  ].replaceAll(' ', '');

  const destPath = `file://${RNFS.CachesDirectoryPath}/${fileNameAndExtension}`;
  await RNFS.unlink(destPath).catch(_ => _);
  await RNFS.copyFile(sourcePath, destPath);
  return destPath;
};

export const BackgroundTaskHelper = async (
  images,
  setImages,
  imageUploaded,
  payload,
  api,
  setLoading,
  dispatch,
) => {
  const options = {
    taskName: 'Post',
    taskTitle: 'Post Uploading...',
    taskDesc: 'Your post is uploading please wait for a while.',
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
  try {
    await BackgroundService.start(async () => {
      dispatch(isAddingPost(payload));

      if (images.length > 0 && imageUploaded) {
        await Promise.all(
          images.map(async (image, index) => {
            if (image.path.includes('.mp4') || image.path.includes('.mov')) {
              const finalVideo = `file://${RNFS.CachesDirectoryPath}/audioVideoFinal${index}.mp4`;

              await cacheResourcePath(image.path).then(async rVideoUrl => {
                // const ffmpegCmdString = `-y -i ${rVideoUrl} -vcodec libx264 -crf 30 -preset ultrafast ${finalVideo}`;
                const ffmpegCmdString = `-y -i ${rVideoUrl} -codec:v libx264 -pix_fmt yuv420p -b:v 2000k -preset slow ${finalVideo}`;
                await FFmpegKit.execute(ffmpegCmdString).then(async result => {
                  image.path = finalVideo;
                });
              });
            } else {
              image.path = await CompressImage.compress(image.path, {
                compressionMethod: 'auto',
              });
            }
            return image;
          }),
        ).then(async res => {
          let result = await multiMediaUploadToServer(
            res,
            setImages,
            setLoading,
          );
          if (result) {
            result.forEach(img => {
              payload.media_urls.push(img.path);
            });
            dispatch(
              api(payload, async res => {
                dispatch(isAddingPost(payload));
                await BackgroundService.stop();
                dispatch(isAddingPost({}));
                setLoading(false);
              }),
            );
          }
        });
      } else {
        dispatch(
          api(payload, async res => {
            await BackgroundService.stop();
            dispatch(isAddingPost({}));

            setLoading(false);
          }),
        );
      }
    }, options);
    return true;
  } catch (err) {
    async () => {
      await BackgroundService.stop();
    };
    return false;
  }
};
