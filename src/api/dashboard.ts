import { request } from "./instance";

export class Dashboard{
    static stats(){
        return request({
          method: 'GET',
          url: 'admin',
        });
    }
}