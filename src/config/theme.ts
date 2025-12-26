import {
  createTheme,
  MantineColorsTuple,
  MantineTheme,
  rem,
} from "@mantine/core";

// ============================================
// DESIGN SYSTEM - Rediska.uz
// ============================================

// Primary color palette (Pink/Red)
const primary: MantineColorsTuple = [
  "#FFEDEF", // 0 - lightest
  "#FBBDC3", // 1
  "#F89DA5", // 2
  "#F67C87", // 3
  "#DA4957", // 4 - main
  "#C43E4C", // 5
  "#AE3441", // 6
  "#982A36", // 7
  "#82202B", // 8
  "#6C1620", // 9 - darkest
];

// Greyscale palette
const gray: MantineColorsTuple = [
  "#FAFAFA", // 0 - background
  "#F5F5F5", // 1 - card background
  "#EEEEEE", // 2 - divider
  "#E0E0E0", // 3 - border
  "#BDBDBD", // 4 - disabled
  "#9E9E9E", // 5 - placeholder
  "#757575", // 6 - secondary text
  "#616161", // 7
  "#424242", // 8
  "#212121", // 9 - primary text
];

// ============================================
// DESIGN TOKENS
// ============================================

// Spacing scale (4px base unit)
export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
  "4xl": 48,
  "5xl": 64,
} as const;

// Border radius scale
export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  full: 9999,
} as const;

// Shadow scale
export const shadows = {
  xs: "0 1px 2px rgba(0, 0, 0, 0.05)",
  sm: "0 2px 4px rgba(0, 0, 0, 0.08)",
  md: "0 4px 12px rgba(0, 0, 0, 0.1)",
  lg: "0 8px 24px rgba(0, 0, 0, 0.12)",
  xl: "0 16px 32px rgba(0, 0, 0, 0.15)",
} as const;

// Typography scale
export const fontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  "2xl": 20,
  "3xl": 24,
  "4xl": 32,
  "5xl": 40,
} as const;

// Line heights
export const lineHeights = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 26,
  "2xl": 28,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
} as const;

// Transition durations
export const transitions = {
  fast: "0.15s ease",
  normal: "0.2s ease",
  slow: "0.3s ease",
} as const;

// Component sizes (height)
export const componentSizes = {
  xs: 32,
  sm: 40,
  md: 48,
  lg: 56,
  xl: 64,
} as const;

// ============================================
// MANTINE THEME
// ============================================

export const theme = createTheme({
  // Typography
  fontFamily:
    '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontFamilyMonospace: "Monaco, Courier, monospace",

  // Breakpoints
  breakpoints: {
    xs: "0", // 0px
    sm: "30em", // 480px
    md: "48em", // 768px
    lg: "64em", // 1024px
    xl: "80em", // 1280px
    xxl: "100em", // 1600px
  },

  // Colors
  primaryColor: "primary",
  primaryShade: 4,
  colors: {
    primary,
    gray,
  },
  white: "#FFFFFF",
  black: "#000000",

  // Semantic colors
  other: {
    success: "#39B26F",
    warning: "#E0AB37",
    error: "#DA294A",
  },

  // Spacing (Mantine uses rem)
  spacing: {
    xxs: rem(spacing.xxs),
    xs: rem(spacing.xs),
    sm: rem(spacing.sm),
    md: rem(spacing.md),
    lg: rem(spacing.lg),
    xl: rem(spacing.xl),
  },

  // Border radius
  radius: {
    xs: rem(radius.xs),
    sm: rem(radius.sm),
    md: rem(radius.md),
    lg: rem(radius.lg),
    xl: rem(radius.xl),
  },

  // Shadows
  shadows: {
    xs: shadows.xs,
    sm: shadows.sm,
    md: shadows.md,
    lg: shadows.lg,
    xl: shadows.xl,
  },

  // Font sizes
  fontSizes: {
    xs: rem(fontSizes.xs),
    sm: rem(fontSizes.sm),
    md: rem(fontSizes.md),
    lg: rem(fontSizes.lg),
    xl: rem(fontSizes.xl),
  },

  // Line heights
  lineHeights: {
    xs: rem(lineHeights.xs),
    sm: rem(lineHeights.sm),
    md: rem(lineHeights.md),
    lg: rem(lineHeights.lg),
    xl: rem(lineHeights.xl),
  },

  // Headings
  headings: {
    fontFamily:
      '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: "700",
    sizes: {
      h1: {
        fontSize: rem(fontSizes["5xl"]),
        lineHeight: rem(lineHeights["5xl"]),
      },
      h2: {
        fontSize: rem(fontSizes["4xl"]),
        lineHeight: rem(lineHeights["4xl"]),
      },
      h3: {
        fontSize: rem(fontSizes["3xl"]),
        lineHeight: rem(lineHeights["3xl"]),
      },
      h4: {
        fontSize: rem(fontSizes["2xl"]),
        lineHeight: rem(lineHeights["2xl"]),
      },
      h5: { fontSize: rem(fontSizes.lg), lineHeight: rem(lineHeights.lg) },
      h6: { fontSize: rem(fontSizes.md), lineHeight: rem(lineHeights.md) },
    },
  },

  // Default component props for consistency
  components: {
    Button: {
      defaultProps: {
        radius: "md",
      },
    },
    Input: {
      defaultProps: {
        radius: "md",
      },
      styles: (theme: MantineTheme, props: { variant?: string }) => {
        if (props.variant === "mobile") {
          return {
            wrapper: {
              "--input-height": rem(52),
              "--input-fz": rem(fontSizes.lg),
              "--input-padding-x": rem(spacing.md),
              "--input-gap": rem(spacing.xs),
            },
            input: {
              height: rem(48),
              backgroundColor: theme.colors.gray[1],
              border: "none",
              color: theme.colors.gray[9],
              fontSize: rem(fontSizes.lg),
              fontWeight: 400,
              lineHeight: 24,
              borderRadius: rem(radius.md),
              "&::placeholder": {
                color: theme.colors.gray[5],
                fontSize: rem(fontSizes.lg),
                fontWeight: 400,
                lineHeight: 24,
              },
              "&:focus": {
                backgroundColor: theme.white,
                border: `1px solid ${theme.colors.primary[4]}`,
              },
            },
          };
        }
        return {};
      },
    },
    TextInput: {
      defaultProps: {
        radius: "md",
      },
      styles: (theme: MantineTheme, props: { variant?: string }) => {
        if (props.variant === "mobile") {
          return {
            wrapper: {
              "--input-height": rem(48),
              "--input-fz": rem(fontSizes.lg),
              "--input-padding-x": rem(spacing.md),
            },
            input: {
              backgroundColor: theme.colors.gray[1],
              border: "none",
              borderRadius: rem(radius.md),
              "&::placeholder": {
                color: theme.colors.gray[5],
              },
              "&:focus": {
                backgroundColor: theme.white,
                border: `1px solid ${theme.colors.primary[4]}`,
              },
            },
            label: {
              fontSize: rem(fontSizes.md),
              fontWeight: 500,
              marginBottom: rem(spacing.xs),
              color: theme.colors.gray[9],
            },
          };
        }
        return {};
      },
    },
    Select: {
      defaultProps: {
        radius: "md",
      },
    },
    Card: {
      defaultProps: {
        radius: "lg",
        padding: "md",
      },
    },
    Paper: {
      defaultProps: {
        radius: "md",
      },
    },
    Modal: {
      defaultProps: {
        radius: "lg",
      },
    },
    ActionIcon: {
      defaultProps: {
        radius: "md",
      },
    },
    Badge: {
      defaultProps: {
        radius: "sm",
      },
    },
    Drawer: {
      defaultProps: {
        position: "bottom",
      },
      styles: {
        content: {
          borderRadius: `${rem(radius.xl)} ${rem(radius.xl)} 0 0`,
        },
        title: {
          fontWeight: 700,
          fontSize: rem(fontSizes["2xl"]),
          lineHeight: rem(lineHeights["2xl"]),
          color: "var(--mantine-color-gray-9)",
        },
      },
    },
  },
});
