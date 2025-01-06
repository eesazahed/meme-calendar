const nameOfMonthId = (monthId: number): string => {
  const months: string[] = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  return months[monthId];
};

export default nameOfMonthId;
