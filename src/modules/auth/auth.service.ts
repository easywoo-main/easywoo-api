import { Injectable } from '@nestjs/common';
import {TokenService} from "./token.service";

@Injectable()
export class AuthService {
    constructor(private readonly tokenService: TokenService) {}

    public async register() {
        return ;
    }

}
