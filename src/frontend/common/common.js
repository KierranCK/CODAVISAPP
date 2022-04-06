//file for common functions shared between components
export const addCommas = (number) => {
  try {
    if (typeof number === "string")
      return number.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  } catch (TypeError) {
    return "0";
  }
};

export const formatDateTime = (date) => {
  const dateString =
    ("0" + date.getDate()).slice(-2) +
    "/" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    date.getFullYear() +
    " " +
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2) +
    ":" +
    ("0" + date.getSeconds()).slice(-2);

  return dateString;
};
