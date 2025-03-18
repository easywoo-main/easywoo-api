import {Body, Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import {ErrorResponse} from "../../../errorHandler/errorResponse.dto";
import {RefreshToken} from "../../token/dtos/refresh.token.dto";
import {AccessToken} from "../../token/dtos/accessToken.dto";
import {UserCreateDto} from "../../user/dto/userCreate.dto";
import {CredentialsService} from "./credentials.service";
import {LoginDto} from "./login.dto";
import {UserAuthDto} from "../userAuth.dto";

@Controller('auth')
export class CredentialsController {
    constructor(private readonly credentialsService: CredentialsService) {}

    @ApiOkResponse({ type: UserAuthDto })
    @ApiNotFoundResponse({ type: ErrorResponse })
    @Post('login')
    async login(@Body() body: LoginDto) {
        return this.credentialsService.login(body);
    }

    @Post('refresh')
    @ApiOkResponse({ type: UserAuthDto })
    async refreshToken(@Body() body: RefreshToken): Promise<AccessToken> {
        return this.credentialsService.refreshToken(body);
    }

    @ApiOkResponse({ type: UserAuthDto })
    @Post('register')
    async register(@Body() body: UserCreateDto) {
        return this.credentialsService.register(body);
    }
}
