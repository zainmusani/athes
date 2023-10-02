import {FFprobeKit, FFmpegKit} from 'ffmpeg-kit-react-native';
import RNFS from 'react-native-fs';
import {generateFFmpegCommand} from './ffmpegCommands';

export const getMediaFormatedDuration = async url => {
  const numberDuration = await getMediaDuration(url);
  const date = new Date(0);
  date.setSeconds(numberDuration);
  const string = date.toISOString().substring(11, 19);
  return string?.startsWith('00:') ? string?.slice(3) : string;
};

export const getMediaDuration = async url => {
  const session = await FFprobeKit.getMediaInformationFromCommandArguments([
    '-v',
    'error',
    '-hide_banner',
    '-print_format',
    'json',
    '-show_format',
    '-show_streams',
    '-show_chapters',
    '-i',
    url.replace(/%20/g, ' '),
  ]);
  const info = session.getMediaInformation();
  // const logs = await session.getAllLogsAsString();
  if (info) {
    return info.getDuration();
  } else {
    return 0;
  }
};

export const createVideoThumbnail = async url => {
  const fileName = 'athes_video_thumb';
  const outputFile = RNFS.DocumentDirectoryPath + `/${fileName}.png`;
  await RNFS.unlink(outputFile).catch(_ => _);

  return new Promise((resolve, reject) =>
    FFmpegKit.executeWithArgumentsAsync(
      [
        '-i',
        url.replace(/%20/g, ' '),
        '-ss',
        '00:00:01.000',
        '-vf',
        'thumbnail,scale=1280:720:force_original_aspect_ratio=decrease',
        '-vframes',
        '1',
        '-preset',
        'ultrafast',
        outputFile,
      ],
      async res => {
        resolve(outputFile);
      },
      () => {},
    ).catch(reject),
  );
};

export const trimAudio = async (filename, start, end) => {
  const outputFileName = 'athes_audio_temp.mp3';
  const outputFile = RNFS.DocumentDirectoryPath + `/${outputFileName}`;
  await RNFS.unlink(outputFile).catch(_ => _);

  return new Promise((resolve, reject) =>
    FFmpegKit.executeWithArgumentsAsync(
      [
        '-ss',
        String(start),
        '-i',
        filename.replace(/%20/g, ' '),
        '-t',
        String(end - start),
        '-c:a',
        'libmp3lame',
        outputFile,
      ],
      async res => {
        resolve(outputFile);
      },
      log => {},
    ).catch(reject),
  );
};

export const mergeAudioIntoVideo = async (
  videoUrl,
  audioUrl,
  audioOffset,
  voiceUrl,
  voiceOffset,
  volumes,
) => {
  const audio =
    !audioUrl || audioUrl?.includes('file:///')
      ? audioUrl
      : `file://${audioUrl}`;
  const voice =
    !voiceUrl || voiceUrl?.includes('file:///')
      ? voiceUrl
      : `file://${voiceUrl}`;
  const outputFileName = 'athes_merged_video_temp.mp4';
  const outputFile = RNFS.DocumentDirectoryPath + `/${outputFileName}`;
  await RNFS.unlink(outputFile).catch(_ => _);

  const command = generateFFmpegCommand(
    outputFile,
    videoUrl?.replace(/%20/g, ' '),
    audio?.replace(/%20/g, ' '),
    audioOffset,
    voice,
    voiceOffset,
    volumes,
  );

  return new Promise((resolve, reject) =>
    FFmpegKit.executeWithArgumentsAsync(
      command,
      async res => {
        resolve(outputFile);
      },
      log => {},
    ).catch(reject),
  );
};
