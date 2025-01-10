import React from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
  Pressable,
} from 'react-native';
import { Platform } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  children?: React.ReactNode;
  title?: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loadingColor?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  children,
  title,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  loadingColor,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return styles.disabled.backgroundColor;
    switch (variant) {
      case 'secondary':
        return '#E2E8F0';
      case 'outline':
        return 'transparent';
      default:
        return '#2563EB';
    }
  };

  const getTextColor = () => {
    if (disabled) return styles.disabledText.color;
    switch (variant) {
      case 'secondary':
      case 'outline':
        return '#1F2937';
      default:
        return '#FFFFFF';
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: 8, paddingHorizontal: 12 };
      case 'large':
        return { paddingVertical: 16, paddingHorizontal: 24 };
      default:
        return { paddingVertical: 12, paddingHorizontal: 16 };
    }
  };

  const getBorderStyle = () => {
    return variant === 'outline'
      ? { borderWidth: 1, borderColor: '#2563EB' }
      : undefined;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          opacity: (pressed && !disabled) ? 0.8 : 1,
          ...getPadding(),
          ...getBorderStyle(),
        },
        style,
      ]}
      android_ripple={variant !== 'outline' ? { color: 'rgba(0, 0, 0, 0.1)' } : null}
    >
      {loading ? (
        <ActivityIndicator
          color={loadingColor || getTextColor()}
          size={size === 'small' ? 'small' : 'small'}
        />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: getTextColor(),
              fontSize: size === 'small' ? 14 : size === 'large' ? 18 : 16,
            },
            textStyle,
          ]}
        >
          {children || title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  disabled: {
    backgroundColor: '#E5E7EB',
  },
  disabledText: {
    color: '#9CA3AF',
  },
});

export default Button;
