import { CONFIG } from '../config/config'
import request from './common.service'


export const materialsService = {
    getMaterials,
    getMaterialsDetails
}
    

//get Material list for particular event
function getMaterials(eventId) {
    return request.get(CONFIG.api.events + `/events/${eventId}/materials`)
}


//get Material info
function getMaterialsDetails(materialId) {
    return request.get(CONFIG.api.events + `/events/${materialId}/`)
}