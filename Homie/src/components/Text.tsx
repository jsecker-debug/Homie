import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
}

export const Text: React.FC<CustomTextProps> = ({ style, children, ...props }) => {
  return (
    <RNText style={[styles.defaultText, style]} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'System', // Default system font
  },
});