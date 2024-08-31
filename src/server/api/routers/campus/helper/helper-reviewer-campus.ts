export class HelperCampus {
  static determineStatus(statusArray: ('WAITING' | 'REVIEWED')[], totalVariable?: number) {
    const hasWaiting = statusArray.includes('WAITING');
    const hasReviewed = statusArray.includes('REVIEWED');

    let surveyStatus = '';
    let reviewStatus = '';

    if (statusArray.length > 0 && totalVariable === statusArray.length) {
      surveyStatus = 'Selesai Dikerjakan';
    } else if (statusArray.length > 0 && statusArray.length !== totalVariable) {
      surveyStatus = 'Sedang Dikerjakan';
    } else {
      surveyStatus = 'Perlu Dikerjakan'; // In case the array is empty or has neither status
    }

    if (hasWaiting && hasReviewed) {
      reviewStatus = 'Sedang Direview';
    } else if (hasWaiting) {
      reviewStatus = 'Belum Direview';
    } else if (hasReviewed) {
      reviewStatus = 'Sudah Direview';
    } else {
      reviewStatus = 'Menunggu Dikerjakan'; // In case the array is empty or has neither status
    }
    return { surveyStatus, reviewStatus };
  }
}
