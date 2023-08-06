/** Assumes no empty space at beginning of string */
export default function capitalize(value: string) {
  return value[0].toLocaleUpperCase() + value.slice(1);
}
