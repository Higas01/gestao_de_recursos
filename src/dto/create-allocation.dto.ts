import { Type } from "class-transformer";
import { IsDate } from "class-validator";
import { AllocationValidationMessages } from "src/utils/validation/messages/allocation-validation-messages";

export class CreateAllocationDto {
    @Type(() => Date)
    @IsDate({
        message: AllocationValidationMessages.DATE_INVALID
    })
    date: Date;

    @Type(() => Date)
    @IsDate({
        message: AllocationValidationMessages.RETURN_DATE_INVALID
    })
    returnDate: Date;
}
