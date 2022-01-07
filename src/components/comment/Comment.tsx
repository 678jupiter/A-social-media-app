import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

const Comment = ({comment}) => {
  return (
    <View style={styles.comment}>
      <Text style={styles.commentText}>
        <Text style={styles.bold}> {comment.user.username}</Text>
        {comment.comment}
      </Text>
      <AntDesign name={'hearto'} style={styles.icon} color={colors.black} />
    </View>
  );
};

export default Comment;
const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 5,
  },

  bold: {
    fontWeight: fonts.weight.bold,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentText: {
    color: colors.black,
    lineHeight: 18,
    flex: 1,
  },
});