import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import user from '../../assets/data/user.json';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {useForm, Controller, Control} from 'react-hook-form';
import {IUser} from '../../types/models';

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

type IEditableUserField = 'name' | 'username' | 'website' | 'bio';
type IEditableUser = Pick<IUser, IEditableUserField>;

interface ICustomInput {
  label: string;
  multiline?: boolean;
  control: Control<IEditableUser, object>;
  name: IEditableUserField;
  rules?: object;
}

const CustomInput = ({
  label,
  multiline = false,
  control,
  name,
  rules = {},
}: ICustomInput) => (
  <Controller
    control={control}
    name={name}
    rules={{required: true}}
    render={({field: {onChange, value, onBlur}, fieldState: {error}}) => {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{label}</Text>
          <View style={{flex: 1}}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={label}
              style={[
                styles.input,
                {borderColor: error ? colors.red : colors.border},
              ]}
              multiline={multiline}
            />
            {error && (
              <Text style={{color: colors.red}}>
                {error.message || 'Error'}
              </Text>
            )}
          </View>
        </View>
      );
    }}
  />
);
const EditProfile = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IEditableUser>({
    defaultValues: {
      name: user.name,
      username: user.username,
      website: user.website,
      bio: user.bio,
    },
  });
  const onSubmit = (data: IEditableUser) => {};

  const onChangePhoto = async () => {
    await ImagePicker.launchImageLibrary(
      {mediaType: 'photo'},
      ({didCancel, errorCode, errorMessage, assets}) => {
        if (!didCancel && !errorCode) {
          setSelectedPhoto(assets[0]);
        }
      },
    );
  };
  return (
    <View style={styles.page}>
      <Image
        source={{uri: selectedPhoto?.uri || user.image}}
        style={styles.avatar}
      />

      <Text onPress={onChangePhoto} style={styles.textButton}>
        Change Profile photo
      </Text>
      <CustomInput
        name="name"
        control={control}
        label="Name"
        rules={{required: 'Name is required'}}
      />
      <CustomInput
        name="username"
        control={control}
        label="Username"
        rules={{
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Username should be more than 3 characters',
          },
        }}
      />
      <CustomInput
        name="website"
        control={control}
        label="Website"
        rules={{
          pattern: {
            value: URL_REGEX,
            message: 'Invalid url',
          },
        }}
      />
      <CustomInput
        name="bio"
        control={control}
        label="Bio"
        multiline
        rules={{
          maxLength: {
            value: 2,
            message: 'Bio should be less than 200 characters',
          },
        }}
      />

      <Text onPress={handleSubmit(onSubmit)} style={styles.textButton}>
        Submit
      </Text>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    padding: 10,
  },
  avatar: {width: '30%', aspectRatio: 1, borderRadius: 100},
  textButton: {
    color: colors.primary,
    fontSize: fonts.size.md,
    fontWeight: fonts.weight.semi,
    margin: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  label: {
    width: 75,
  },
  input: {
    borderBottomWidth: 1,
  },
});
