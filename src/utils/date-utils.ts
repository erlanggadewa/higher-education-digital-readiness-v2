export const formatDate = (date: string | Date) => {
  if (date) {
    const dt = new Date(date);
    const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
    const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
    return day + '/' + month + '/' + dt.getFullYear();
  }
  return '';
};

/**
 * Akan menghasilkan array tahun dari tahun sekarang hingga tahun yang diinginkan.
 * Value default tahun dimulai dari 2023.
 * @param {number} [startYear=2023]
 * @returns {*}
 */
export const generateYearOptions = (startYear = 2023): { value: string; label: string }[] => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear + 1 - startYear }, (_, i) => {
    const year = currentYear - i;
    return { value: year.toString(), label: year.toString() };
  });
};
