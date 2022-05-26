import http from '../../core/http-common'

class AgencyReviewService {
    endPoint = 'https://go2climbisw.azurewebsites.net/api/v1/agencyreviews';

    create(agencyReviewDto) {
        return http.post(this.endPoint, agencyReviewDto);
    }
}

export default new AgencyReviewService();
