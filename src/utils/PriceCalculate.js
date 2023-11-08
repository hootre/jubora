const PriceCalculate = (row, col, count) => {
  let price = 0;
  let tempRow = 0;
  let tempCol = 0;
  if (row > col) {
    tempRow = Math.floor(row / 100) - 2 >= 1 ? Math.floor(row / 100) - 2 : 1;
    if (col <= 70) {
      price = tempRow === 1 ? 20000 : tempRow >= 3 ? tempRow * 5000 + 20000 : 22000;
    } else if (col <= 90) {
      price = tempRow === 1 ? 22000 : tempRow >= 3 ? tempRow * 6000 + 24000 : 24000;
    } else if (col <= 105) {
      price = tempRow === 1 ? 25000 : tempRow >= 3 ? tempRow * 7000 + 28000 : 28000;
    } else if (col <= 120) {
      price = tempRow === 1 ? 28000 : tempRow >= 3 ? tempRow * 8000 + 32000 : 32000;
    } else if (col <= 150) {
      price = tempRow === 1 ? 30000 : tempRow >= 3 ? tempRow * 9000 + 36000 : 36000;
    } else if (col <= 180) {
      price = tempRow === 1 ? 33000 : tempRow >= 3 ? tempRow * 10000 + 40000 : 40000;
    } else {
      price = tempRow === 1 ? 40000 : tempRow >= 3 ? tempRow * 12000 + 50000 : 50000;
    }
  } else {
    tempCol = Math.floor(col / 100) - 2;
    if (row <= 70) {
      price = tempCol === 1 ? 20000 : tempCol >= 3 ? tempCol * 5000 + 20000 : 22000;
    } else if (row <= 90) {
      price = tempCol === 1 ? 22000 : tempCol >= 3 ? tempCol * 6000 + 24000 : 24000;
    } else if (row <= 105) {
      price = tempCol === 1 ? 25000 : tempCol >= 3 ? tempCol * 7000 + 28000 : 28000;
    } else if (row <= 120) {
      price = tempCol === 1 ? 28000 : tempCol >= 3 ? tempCol * 8000 + 32000 : 32000;
    } else if (row <= 150) {
      price = tempCol === 1 ? 30000 : tempCol >= 3 ? tempCol * 9000 + 36000 : 36000;
    } else if (col <= 180) {
      price = tempCol === 1 ? 33000 : tempCol >= 3 ? tempCol * 10000 + 40000 : 40000;
    } else {
      price = tempCol === 1 ? 40000 : tempCol >= 3 ? tempCol * 12000 + 50000 : 50000;
    }
  }
  return Number(price) * Number(count);
};

export default PriceCalculate;
