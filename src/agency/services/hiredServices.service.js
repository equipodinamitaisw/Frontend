import http from '../../core/http-common'

class HiredService {
    endPoint = 'https://go2climbisw.azurewebsites.net/api/v1/hiredservice';

    getAll() {
        return http.get(this.endPoint);
    }
    getExtendInformation(agencyId, category) {
        return http.get(`https://go2climbisw.azurewebsites.net/api/v1/hiredservice?expand=${category}/${agencyId}`);
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
