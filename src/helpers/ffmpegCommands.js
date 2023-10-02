export const generateFFmpegCommand = (
  outputFile,
  videoUrl,
  audio,
  audioOffset,
  voice,
  voiceOffset,
  volumes,
) => {
  let args = [];
  if (audio && voice) {
    args = videoWithAudioVoiceOutputs(
      audio,
      audioOffset,
      voice,
      voiceOffset,
      volumes,
    );
  } else if (audio && !voice) {
    args = videoWithAudioOutputs(audio, audioOffset, volumes);
  } else if (!audio && voice) {
    args = videoWithVoiceOutputs(voice, voiceOffset, volumes);
  } else if (!audio && !voice) {
    args = videoOnlyOutputs(volumes);
  } else {
    return null;
  }
  return [...videoInput(videoUrl), ...args, ...generalOutputs(outputFile)];
};

const videoInput = videoUrl => ['-y', '-i', videoUrl];

const generalOutputs = outputFile => [
  '-codec:a',
  'aac',
  '-map',
  '0:v',
  '-map',
  '[out]',
  '-codec:v',
  'copy',
  '-pix_fmt',
  'yuv420p',
  '-b:v',
  '6000k',
  '-bufsize',
  '6000k',
  '-ar',
  '44100',
  '-ac',
  '2',
  '-b:a',
  '96k',
  '-async',
  '1',
  '-preset',
  'ultrafast',
  '-shortest',
  outputFile,
];

const videoOnlyOutputs = volumes => {
  const {origin} = volumes;
  return [
    '-filter_complex',
    `[0:a]aformat=sample_fmts=flt:sample_rates=44100:channel_layouts=stereo,volume=${origin},apad[A]; \
  [A]amerge=1[out]`,
  ];
};

const videoWithAudioVoiceOutputs = (
  audio,
  audioOffset,
  voice,
  voiceOffset,
  volumes,
) => {
  const {origin, added, voice: record} = volumes;
  return [
    '-itsoffset',
    String(audioOffset),
    '-i',
    audio,
    '-itsoffset',
    String(voiceOffset),
    '-i',
    voice,
    '-filter_complex',
    `[0:a]aformat=sample_fmts=flt:sample_rates=44100:channel_layouts=stereo,volume=${origin},apad[A]; \
  [1:a]aformat=sample_fmts=flt:sample_rates=44100:channel_layouts=stereo,volume=${added},apad[B]; \
  [2:a]aformat=sample_fmts=flt:sample_rates=44100:channel_layouts=stereo,volume=${
    record * 1.5
  },apad[C]; \
  [A][B][C]amerge=3[out]`,
  ];
};

const videoWithAudioOutputs = (audio, audioOffset, volumes) => {
  const {origin, added} = volumes;
  return [
    '-itsoffset',
    String(audioOffset),
    '-i',
    audio,
    '-filter_complex',
    `[0:a]aformat=sample_fmts=flt:sample_rates=44100:channel_layouts=stereo,volume=${origin},apad[A]; \
  [1:a]aformat=sample_fmts=flt:sample_rates=44100:channel_layouts=stereo,volume=${added},apad[B]; \
  [A][B]amerge=2[out]`,
  ];
};

const videoWithVoiceOutputs = (voice, voiceOffset, volumes) => {
  const {origin, voice: record} = volumes;
  return [
    '-itsoffset',
    String(voiceOffset),
    '-i',
    voice,
    '-filter_complex',
    `[0:a]aformat=sample_fmts=flt:sample_rates=44100:channel_layouts=stereo,volume=${origin},apad[A]; \
  [1:a]aformat=sample_fmts=flt:sample_rates=44100:channel_layouts=stereo,volume=${
    record * 1.5
  },apad[C]; \
  [A][C]amerge=2[out]`,
  ];
};
