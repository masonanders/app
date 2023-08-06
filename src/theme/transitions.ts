type Params = Partial<{
  delay: number;
  duration: number;
  property: string | string[];
}>;

const transitions = {
  easeInOut: (params: Params = {}): string => {
    const { delay = 0, duration = 150, property = "all" } = params;
    return [
      Array.isArray(property) ? property.join(" ") : property,
      `${duration}ms`,
      "ease-in-out",
      `${delay}ms`,
    ].join(" ");
  },
};

export default transitions;
