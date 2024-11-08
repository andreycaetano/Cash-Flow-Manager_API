import { IsUUID } from "class-validator";

export class UuidValidDto {
    @IsUUID()
    id: string
}