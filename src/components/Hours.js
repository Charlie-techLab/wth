import React, { useState, useEffect } from 'react';

const Hours = () => {
  const [today, setToday] = useState('');

  const shelterHours = [
    { day: "Monday", open: "10:00", close: "16:00" },
    { day: "Tuesday", open: "10:00", close: "16:00" },
    { day: "Wednesday", open: "10:00", close: "16:00" },
    { day: "Thursday", open: "10:00", close: "16:00" },
    { day: "Friday", open: "10:00", close: "16:00" },
    { day: "Saturday", open: "9:00", close: "20:00" },
    { day: "Sunday", open: "9:00", close: "20:00" },
  ];

  useEffect(() => {
    setToday(new Date().toLocaleDateString('en-US', { weekday: 'long' }));
  }, []);

  const todayHours = shelterHours.find((day) => day.day === today);

  return (
    <div id="hours">
      <h2>Today's Hours</h2>
      {today && todayHours ? (
        <p>{todayHours.day} {todayHours.open} - {todayHours.close}</p>
      ) : (
        <p>Loading hours...</p>
      )}
    </div>
  );
};

export default Hours;