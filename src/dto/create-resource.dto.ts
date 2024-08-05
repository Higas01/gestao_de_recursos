import { IsBoolean, IsNotEmpty, MaxLength } from "class-validator";
import { ResourceValidationMessages } from "src/utils/validation/messages/resource-validation-messages";

export class CreateResourceDto {
    @IsNotEmpty({ message: ResourceValidationMessages.NAME_REQUIRED })
    @MaxLength(100, { message: ResourceValidationMessages.NAME_MAX_LENGTH })
    name: string;

}
