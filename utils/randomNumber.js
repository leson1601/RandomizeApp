const generateRandomNumbers = (min, max, quantity, isRepeat) => {
  const results = [];
  for (let i = 0; i < quantity; i++) {
    const randNum = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!isRepeat) {
      if (!results.includes(randNum)) {
        results.push(randNum);
      }
    } else results.push(randNum);
  }
  console.log(results.sort((a, b) => a - b));
  const text = results.sort((a, b) => a - b).join(", ");
  const sum = results.reduce((partialSum, a) => partialSum + a, 0);
  const average = (sum / results.length).toFixed(2);
  return {
    text,
    sum,
    average
  };
};

export { generateRandomNumbers };