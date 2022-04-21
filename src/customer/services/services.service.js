import http from '../../core/http-common'

class ServicesService {
    endPoint = 'https://localhost:5001/api/v1/services';

    getById(id) {
        return http.get(`${this.endPoint}/${id}`);
    }
}

export default new ServicesService();
