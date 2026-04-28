import { IsNotEmpty, IsString, Length, MinLength } from "class-validator"

export class CreateThreadDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    title! : string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    content! : string
}
