import React, { useState, useEffect } from "react";

export function useWk() {
  const [wk, setWeek] = useState(null);

  useEffect(() => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(
      ((now - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7
    );
    setWeek(weekNumber);
  }, []);

  return wk
}
