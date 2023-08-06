type Mode = "default" | "dark" | "darker";

// Colors picked with help from Material color picker: https://m2.material.io/inline-tools/color/
const palette = {
  primary: (mode: Mode = "default"): string => {
    switch (mode) {
      case "dark":
        return "#506ee2";
      case "darker":
        return "#4d5ccf";
      default:
        return "#5281f7";
    }
  },
  secondary: (mode: Mode = "default"): string => {
    switch (mode) {
      case "dark":
        return "#f32065";
      case "darker":
        return "#ec004c";
      default:
        return "#f75281";
    }
  },
} as const;

export default palette;
