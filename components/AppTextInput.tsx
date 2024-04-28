import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Assuming you're using FontAwesome5 icons
import Colors from '../constants/Colors';
import Font from '../constants/Font';
import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing';

interface AppTextInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}

const AppTextInput: React.FC<AppTextInputProps> = ({ placeholder, value, onChangeText }) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <FontAwesome5  size={20} color={focused ? '#132a13' : Colors.darkText} style={styles.icon} />
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
      />
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
});
