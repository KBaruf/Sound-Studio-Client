import React, { useEffect, useState } from 'react';
function RandomNumber() {
  const [randomNumber, setRandomNumber] = useState(undefined);

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * (234 - 34 + 1)) + 34);
  }, []);

  return <p>&#40;{randomNumber}&#41;</p>;
}
export default RandomNumber;
