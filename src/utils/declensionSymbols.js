export default function declensionSymbols(count) {
  if (count === 1) {
    return " символ."
  } else if (count === 2 || count === 3 || count === 4) {
    return " символа."
  } else return " символов."
}
