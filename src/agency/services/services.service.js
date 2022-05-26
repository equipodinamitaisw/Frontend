import http from '../../core/http-common'

class ServicesService {
    endPoint = 'https://go2climbisw.azurewebsites.net/api/v1/services';

    getAll() {
        return http.get(this.endPoint);
    }
    getById(id) {
        return http.get(`${this.endPoint}/${id}`);
    }
    getActivities(idService) {
        return http.get(`${this.endPoint}/${idService}/activities`);
    }
    getReviews(idService) {
        return http.get(`${this.endPoint}/${idService}/servicereviews`);
    }
    create(createServiceDto) {
        return http.post(this.endPoint, createServiceDto);
    }
    createActivity(idService, createActivityDto) {
        return http.post(`${this.endPoint}/${idService}/activities`, createActivityDto);
    }
    update(id, updateServiceDto) {
        return http.put(`${this.endPoint}/${id}`, updateServiceDto);
    }
    delete(id) {
        return http.delete( `${this.endPoint}/${id}`);
    }

}

export default new ServicesService();
