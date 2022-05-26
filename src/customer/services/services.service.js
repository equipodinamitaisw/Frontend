import http from '../../core/http-common'

class ServicesService {
    endPoint = 'https://go2climbisw.azurewebsites.net/api/v1/services';

    getById(id) {
        return http.get(`${this.endPoint}/${id}`);
    }
}

export default new ServicesService();
