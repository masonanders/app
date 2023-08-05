type Mode = "default" | "dark" | "darker";

const palette = {
  primary: (mode: Mode = "default"): string => {
    switch (mode) {
      case "dark":
        return "#4e7bec";
      case "darker":
        return "#4b75e1";
      default:
        return "#5281f7";
    }
  },
} as const;

export default palette;
