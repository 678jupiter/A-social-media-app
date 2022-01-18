import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Video from 'react-native-video';

interface IVideoPlayer {
    uri: string;
}

const VideoPlayer = ({uri}: IVideoPlayer) => {
    return (
        <Video source={{uri}} style={styles.video} />
    )
}

export default VideoPlayer

const styles = StyleSheet.create({
    video: {
        width: "100%",
        aspectRatio: 1,
    }
})
