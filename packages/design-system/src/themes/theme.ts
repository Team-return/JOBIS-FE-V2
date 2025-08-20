export interface FontStyle {
  fontSize: string;
  lineHeight: string;
}

export interface TextStyles {
  h1: FontStyle;
  h2: FontStyle;
  h3: FontStyle;
  h4: FontStyle;
  h5: FontStyle;
  h6: FontStyle;
  body1: FontStyle;
  body2: FontStyle;
  body3: FontStyle;
  caption: FontStyle;
}

export interface FontWeight {
  bold: string;
  medium: string;
  regular: string;
}

export interface ColorPalette {
  10?: string;
  20?: string;
  30?: string;
  40?: string;
  50?: string;
  60?: string;
  70?: string;
  80?: string;
  90?: string;
}

export interface SubColorPalette {
  10?: string;
  20?: string;
  30?: string;
  40?: string;
}

export interface ThemeColor {
  primary: ColorPalette;
  grayScale: ColorPalette;
  subColor: {
    red: SubColorPalette;
    green: SubColorPalette;
    blue: SubColorPalette;
    yellow: SubColorPalette;
  };
}

export interface JOBISTheme {
  color: ThemeColor;
  font: TextStyles;
  fontWeight: FontWeight;
}

const fontToCss = (size: number, lineHeight: number): FontStyle => ({
  fontSize: `${size}px`,
  lineHeight: `${lineHeight}px`
});

const textStyles: TextStyles = {
  h1: fontToCss(40, 60),
  h2: fontToCss(36, 54),
  h3: fontToCss(32, 48),
  h4: fontToCss(28, 40),
  h5: fontToCss(24, 36),
  h6: fontToCss(20, 28),
  body1: fontToCss(18, 26),
  body2: fontToCss(16, 24),
  body3: fontToCss(14, 20),
  caption: fontToCss(12, 18)
};

const fontWeight: FontWeight = {
  bold: "700",
  medium: "500",
  regular: "400"
};

export const lightTheme: JOBISTheme = {
  color: {
    primary: {
      10: "#f3f3fb",
      20: "#2f53ff",
      30: "#263ebf",
      40: "#132bac"
    },
    grayScale: {
      10: "#ffffff",
      20: "#fafafa",
      30: "#f7f7f7",
      40: "#e5e5e5",
      50: "#cccccc",
      60: "#7f7f7f",
      70: "#444444",
      80: "#333333",
      90: "#000000"
    },
    subColor: {
      red: {
        10: "#FCE9E7",
        20: "#E74C3C"
      },
      green: {
        10: "#E5F8EE",
        20: "#2ECC71"
      },
      blue: {
        10: "#F2F6FF",
        20: "#E0EBF6",
        30: "#237BC9",
        40: "#002C53"
      },
      yellow: {
        10: "#FDF7E2",
        20: "#F1C40F"
      }
    }
  },
  font: textStyles,
  fontWeight: fontWeight
};

export const darkTheme: JOBISTheme = {
  color: {
    primary: {
      10: "#000dbe",
      20: "#2f4def",
      30: "#586ed4",
      40: "#4f8d9d"
    },
    grayScale: {
      10: "#000000",
      20: "#060606",
      30: "#191919",
      40: "#333333",
      50: "#545454",
      60: "#8e8e8e",
      70: "#d9d9d9",
      80: "#eeeeee",
      90: "#ffffff"
    },
    subColor: {
      red: {
        10: "#4C1914",
        20: "#E74C3C"
      },
      green: {
        10: "#0F4325",
        20: "#2ECC71"
      },
      blue: {
        10: "#151A24",
        20: "#237BC9",
        30: "#0C2942",
        40: "#002C53"
      },
      yellow: {
        10: "#504105",
        20: "#F1C40F"
      }
    }
  },
  font: textStyles,
  fontWeight: fontWeight
};
