import http from '../../core/http-common'

class ServiceReviewService {
    endPoint = 'https://go2climbisw.azurewebsites.net/api/v1/servicereviews';

    create(createServiceReview) {
        return http.post(this.endPoint, createServiceReview);
    }
}

export default new ServiceReviewService();
