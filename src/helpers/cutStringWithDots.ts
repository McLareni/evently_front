export function cutStringWithDots(string: string, length: number) {
  if (string.length > length) {
    const cutString = string.slice(0, length) + '...';
    return cutString;
  }
  return string;
}
