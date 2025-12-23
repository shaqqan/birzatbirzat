import { createTheme, rem, MantineColorsTuple } from "@mantine/core";

// Primary color palette (Pink/Red)
const primary: MantineColorsTuple = [
  '#FFEDEF', // 100
  '#FBBDC3', // 200
  '#F89DA5', // 300
  '#F67CB7', // 400
  '#DA4957', // 500 - main
  '#C43E4C',
  '#AE3441',
  '#982A36',
  '#82202B',
  '#6C1620',
];

// Greyscale palette
const gray: MantineColorsTuple = [
  '#FAFAFA', // 50
  '#F5F5F5', // 100
  '#EEEEEE', // 200
  '#E0E0E0', // 300
  '#BDBDBD', // 400
  '#9E9E9E', // 500
  '#757575', // 600
  '#616161', // 700
  '#424242', // 800
  '#212121', // 900
];

export const theme = createTheme({
  fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',

  // Custom breakpoints
  // breakpoints: {
  //   xs: '36em',    // 576px
  //   sm: '48em',    // 768px
  //   md: '62em',    // 992px
  //   lg: '75em',    // 1200px
  //   xl: '88em',    // 1408px
  //   xxl: '120em',  // 1920px - 2K monitors
  // },

  primaryColor: 'primary',
  primaryShade: 4,

  colors: {
    primary,
    gray,
  },

  white: '#FFFFFF',
  black: '#000000',

  other: {
    success: '#39B26F',
    warning: '#E0AB37',
    error: '#DA294A',
  },

  headings: {
    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: "700",
      // sizes: {
      //   h1: { fontSize: rem(44), lineHeight: rem(56) },
      //   h2: { fontSize: rem(32), lineHeight: rem(36) },
      //   h3: { fontSize: rem(24), lineHeight: rem(32) },
      //   h4: { fontSize: rem(20), lineHeight: rem(28) },
      //   h5: { fontSize: rem(16), lineHeight: rem(24) },
      //   h6: { fontSize: rem(14), lineHeight: rem(20) },
      // },
  },

  // fontSizes: {
  //   xs: rem(10),
  //   sm: rem(12),  // Body Small
  //   md: rem(14),  // Body Medium
  //   lg: rem(16),  // Body Large
  //   xl: rem(18),
  // },

  // lineHeights: {
  //   xs: rem(14),
  //   sm: rem(16),  // Body Small
  //   md: rem(20),  // Body Medium
  //   lg: rem(24),  // Body Large
  //   xl: rem(26),
  // },
});
