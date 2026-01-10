import type { ThemeName } from "./types";

export const themes: Record<
  ThemeName,
  {
    "--primary-color": string;
    "--accent-color": string;
    "--btn-color": string;
    "--btn-hover": string;
    heroImage: string;
  }
> = {
  yellow: {
    "--primary-color": "#FBE9BA",
    "--accent-color": "#F4C550",
    "--btn-color": "#FFDC86",
    "--btn-hover": "#F4C550",
    heroImage: "/images/yellow.png",
  },
  green: {
    "--primary-color": "#CBDED3",
    "--accent-color": "#9FBAAE",
    "--btn-color": "#CBDED3",
    "--btn-hover": "#9FBAAE",
    heroImage: "/images/green.png",
  },
  blue: {
    "--primary-color": "#BFD6EA",
    "--accent-color": "#9FB7CE",
    "--btn-color": "#BFD6EA",
    "--btn-hover": "#9FB7CE",
    heroImage: "/images/blue.png",
  },
  red: {
    "--primary-color": "#F2C0BD",
    "--accent-color": "#E0A39A",
    "--btn-color": "#F2C0BD",
    "--btn-hover": "#E0A39A",
    heroImage: "/images/red.png",
  },
  orange: {
    "--primary-color": "#F4C8BA",
    "--accent-color": "#F0AA8D",
    "--btn-color": "#F4C8BA",
    "--btn-hover": "#F0AA8D",
    heroImage: "/images/orange.png",
  },
};
