import { IsEmail, IsString, Length, Matches, MinLength } from "class-validator"

export class LogInDto {
    @IsEmail()
    @IsString()
    email! : string

    @IsString()
    @MinLength(8)
    @Matches(/(?=.*[A-Z])/, {message: "password must contain at least one capital letter",})
    @Matches(/(?=.*[0-9])/, {message: "password must contain at least one number",})
    password! : string

}
