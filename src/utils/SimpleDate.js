export const SimpleDate = (created_at, style = 'm') => {
  let dateText = '';
  if (style === 'y') {
    dateText = String(created_at).substring(2, 10);
  } else if (style === 'm') {
    dateText = String(created_at).substring(5, 10);
  } else if (style === 'd') {
    dateText = String(created_at).substring(8, 10);
  }
  return dateText;
};
