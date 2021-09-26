export const getFirstLetterInCapitalLetters = (string) => string
  .split(/\s+/)
  .map((word) => word[0].toUpperCase() + word.substring(1).toLowerCase())
  .join(' ');
