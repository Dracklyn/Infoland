import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  noPadding?: boolean;
};

export function ThemedView({ style, lightColor, darkColor, noPadding, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <View
      style={[
        { backgroundColor },
        !noPadding && { paddingHorizontal: 16 },
        style,
      ]}
      {...otherProps}
    />
  );
}
