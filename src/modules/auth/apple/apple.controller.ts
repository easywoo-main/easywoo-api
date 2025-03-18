import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import {AppleService} from "./apple.service";

@Controller('auth/apple')
export class AppleController {
    constructor(private readonly appleService: AppleService) {}

    @Get()
    @UseGuards(AuthGuard('apple'))
    public async appleAuth() {}

    @Get('callback')
    @UseGuards(AuthGuard('apple'))
    public async  appleAuthRedirect(@Req() req: Request, @Res() res: Response) {
        const applePayload = req.user;
        return this.appleService.appleLogin(applePayload);
    }
}
