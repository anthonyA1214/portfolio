export const getYearDisplay = (startYear: number) => {
  const currentYear = new Date().getFullYear()
  if (startYear === currentYear) {
    return `${currentYear}`
  } else if (startYear < currentYear) {
    return `${startYear} - ${currentYear}`
  } else {
    return `${startYear}`
  }
}
