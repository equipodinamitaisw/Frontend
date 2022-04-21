import http from '../../core/http-common'

class HiredService {
    endPoint = 'https://localhost:5001/api/v1/hiredservice';

    getAll() {
        return http.get(this.endPoint);
    }
    getExtendInformation(agencyId, category) {
        return http.get(`https://localhost:5001/api/v1/agencies/${agencyId}/hiredservices?expand=${category}`);
    }
    getById(id) {
        return http.get(`${this.endPoint}/${id}`);
    }
    create(createHiredServiceDto) {
        return http.post(this.endPoint, createHiredServiceDto);
    }
    update(id, updateHiredServiceDto) {
        return http.put(`${this.endPoint}/${id}`, updateHiredServiceDto);
    }
    delete(id) {
        return http.delete( `${this.endPoint}/${id}`);
    }
}
export default new HiredService();
