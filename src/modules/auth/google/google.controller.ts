import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import {GoogleService} from "./google.service";

@Controller('auth/google')
export class GoogleController {
    constructor(private readonly googleAuthService: GoogleService) {}

    @Get()
    @UseGuards(AuthGuard('google'))
    public async googleAuth() {
        console.log("googleAuth")
    }

    @Get('callback')
    @UseGuards(AuthGuard('google'))
    public async googleAuthRedirect(@Req() req: Request) {
        const googlePayload = req.user;
        return this.googleAuthService.googleLogin(googlePayload);
    }
}
