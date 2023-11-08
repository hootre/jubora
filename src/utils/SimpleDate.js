const simpleDate = (createdAt, style = 'm') => {
  let dateText = '';
  if (style === 'y') {
    dateText = String(createdAt).substring(2, 10);
  } else if (style === 'm') {
    dateText = String(createdAt).substring(5, 10);
  } else if (style === 'd') {
    dateText = String(createdAt).substring(8, 10);
  }
  return dateText;
};
export default simpleDate;
