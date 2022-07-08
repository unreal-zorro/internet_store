export default function declensionSymbols(count, ending = 'ов') {
  if (ending === 'ов') {
    if (count === 1) {
      return " символ."
    } else if (count === 2 || count === 3 || count === 4) {
      return " символа."
    } else return " символов."
  } else if (ending === 'ам') {
    if (count === 1) {
      return " символу."
    } else {
      return " символам."
    }
  }
}
