const getByteSize = (size) => {
  const byteUnits = ['KB', 'MB', 'GB', 'TB'];
  let result = 0;
  for (let i = 0; i < byteUnits.length; i += 1) {
    result = Math.floor(size / 1024);
    if (size < 1024) return size.toFixed(1) + byteUnits[i];
  }
  return result;
};
export default getByteSize;
