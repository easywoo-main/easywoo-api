import {UserCreateDto} from "./userCreate.dto";
import {IsOptional, IsString, IsUrl} from "class-validator";

class UserUpdateDto extends UserCreateDto {
    @IsOptional()
    @IsString()
    confirmPassword?: string;

    @IsUrl()
    @IsOptional()
    photo?: string;
}