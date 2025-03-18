import {OAuth2Client} from "google-auth-library";
import {ConfigService} from "@nestjs/config";
import {getGoogleConfig} from "../../../configs/google.config";

export class GoogleClient extends OAuth2Client{
    constructor() {
        super(getGoogleConfig(new ConfigService()));
    }

}