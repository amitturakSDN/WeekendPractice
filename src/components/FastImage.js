import React from 'react';
import FastImage from 'react-native-fast-image';
export const FastImageComponent = (url, style) => {
  return (
    <>
      <FastImage
        style={style}
        source={{
          uri: url,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </>
  );
};
