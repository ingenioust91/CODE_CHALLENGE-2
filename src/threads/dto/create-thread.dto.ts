import { IsString, Length, MinLength } from "class-validator"

export class CreateThreadDto {

    @IsString()
    @MinLength(3)
    title! : string

    @IsString()
    @MinLength(3)
    content! : string
}
