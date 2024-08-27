export class HelperDashboardAdmin {
  static determineStatus(statusArray: ('WAITING' | 'REVIEWED')[]) {
    const hasWaiting = statusArray.includes('WAITING');
    const hasReviewed = statusArray.includes('REVIEWED');

    if (hasWaiting && hasReviewed) {
      return 'Sedang Direview';
    } else if (hasWaiting) {
      return 'Belum Direview';
    } else if (hasReviewed) {
      return 'Sudah Direview';
    } else {
      return 'unknown'; // In case the array is empty or has neither status
    }
  }
}
