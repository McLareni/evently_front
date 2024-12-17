export function formatDateToDayMonth(dateYearMonthDay: string) {
  const date = new Date(dateYearMonthDay);
  const day = date.getDate();
  const months = [
    'січня',
    'лютого',
    'березня',
    'квітня',
    'травня',
    'червня',
    'липня',
    'серпня',
    'вересня',
    'жовтня',
    'листопада',
    'грудня',
  ];
  const month = months[date.getMonth()];

  return `${day} ${month}`;
}
