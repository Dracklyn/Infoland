/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * Color scheme: #FFFFFF, #E9F3EB, #DBF6DB, #3E5946
 */

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#3E5946',
    textSecondary: '#3E594680',
    background: '#FFFFFF',
    cardBackground: '#FFFFFF',
    cardBody: '#F8F8F8',
    cardBodyLight: '#DBF6DB',
    tint: '#3E5946',
    icon: '#3E594680',
    tabIconDefault: '#3E594680',
    tabIconSelected: '#3E5946',
    searchBackground: '#F8F8F8',
    searchBorder: '#3E59460D',
    likeButtonBackground: '#E9F3EB',
    shadow: '#000',
  },
  dark: {
    text: '#FFFFFF',
    textSecondary: '#FFFFFF80',
    background: '#000000',
    cardBackground: '#2A3D32',
    cardBody: '#F8F8F8',
    cardBodyLight: '#25352A',
    tint: '#DBF6DB',
    icon: '#FFFFFF80',
    tabIconDefault: '#FFFFFF80',
    tabIconSelected: '#DBF6DB',
    searchBackground: '#2A3D32',
    searchBorder: '#DBF6DB0D',
    likeButtonBackground: '#1F2E24',
    shadow: '#000',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
