const koreaDate = () => {
  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - offset);
  return today;
};
export default koreaDate;
