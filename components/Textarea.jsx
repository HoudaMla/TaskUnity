import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import Font from '../constants/Font';
import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing';

const Textarea = ({ value, onChangeText, placeholder, ...rest }) => {
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholderTextColor={"#132a13"}

      style={[
        styles.textInput,
        focused && styles.focusedTextInput,
      ]}
      multiline
      numberOfLines={3} 
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: "#fbfbf2",
    borderRadius: 5,
    padding: Spacing * 2,
    minHeight: 100, 
    fontFamily: Font['poppins-regular'],
    fontSize: FontSize.small,
    backgroundColor: "#fbfbf2",
    marginVertical: Spacing,
  },
  focusedTextInput: {
    borderWidth: 3,
    borderColor: "#132a13",
    shadowOffset: { width: 4, height: Spacing },
    shadowColor: "#132a13",
    shadowOpacity: 0.2,
    shadowRadius: Spacing,
  },
});

export default Textarea;
