import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Assuming you're using FontAwesome5 icons
import Colors from '../constants/Colors';
import Font from '../constants/Font';
import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing';

interface AppTextInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean; // Optional prop for password input
}

const AppTextInput: React.FC<AppTextInputProps> = ({ placeholder, value, onChangeText, secureTextEntry,icon }) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [secure, setSecure] = useState<boolean>(secureTextEntry || false);

  const toggleSecureEntry = () => {
    setSecure(!secure);
  };

  return (
    <View style={styles.container}>
      <FontAwesome5 name={icon} size={20} color={Colors.darkText} style={styles.icon} />
      <TextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholderTextColor={"#132a13"}
        style={[
          styles.input,
          focused && {
            borderWidth: 3,
            borderColor: "#132a13",
            shadowOffset: { width: 4, height: Spacing },
            shadowColor: "#132a13",
            shadowOpacity: 0.2,
            shadowRadius: Spacing,
          },
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={toggleSecureEntry} style={styles.eyeIconContainer}>
          <FontAwesome5 name={secure ? "eye-slash" : "eye"} size={20} color={Colors.darkText} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#fffffa",
    borderRadius: Spacing,
    marginVertical: Spacing,
  },
  input: {
    flex: 1,
    fontFamily: Font['poppins-regular'],
    fontSize: FontSize.small,
    paddingVertical: Spacing * 2,
    paddingHorizontal: Spacing,
  },
  icon: {
    marginHorizontal: Spacing,
  },
  eyeIconContainer: {
    padding: Spacing,
  },
});
