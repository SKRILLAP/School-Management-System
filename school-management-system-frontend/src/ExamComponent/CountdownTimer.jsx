import React, { useState, useEffect } from "react";

const CountdownTimer = ({ endTime }) => {
  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const timeRemaining = endTime - now;

    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, []);

  return (
    <div>
      <p>
        Time Remaining: {timeRemaining.hours} hours, {timeRemaining.minutes}{" "}
        minutes, {timeRemaining.seconds} seconds
      </p>
    </div>
  );
};

export default CountdownTimer;
