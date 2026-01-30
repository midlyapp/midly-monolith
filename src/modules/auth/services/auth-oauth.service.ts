import { Inject, Injectable } from "@nestjs/common";
import { BaseOAuthService } from "../oauth/services/base-oauth.service";

@Injectable()
export class OAuthService {
    constructor(
        @Inject('OAUTH_PROVIDER') private readonly providers: BaseOAuthService[] 
    ){}


    public findProvider(type: string){
        return  this.providers.find(p => p.type === type)
    }

    public async create(name: string, code: string, device_id?:string){
        const provider = this.findProvider(name)
        const data = await provider.findUserByCode(code, device_id)
        console.log(data)
    }
}