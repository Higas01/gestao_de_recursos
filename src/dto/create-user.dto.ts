import { IsEmail, IsNotEmpty, IsStrongPassword, MaxLength } from "class-validator";
import { UserValidationMessage } from "src/utils/validation/messages/user-validation-messages";

export class CreateUserDto {
    @IsNotEmpty({message: UserValidationMessage.NAME_REQUIRED})
    @MaxLength(100, {message: UserValidationMessage.NAME_MAX_LENGTH})
    name: string; 

    @IsNotEmpty({message: UserValidationMessage.ISADMIN_REQUIRED})
    isAdmin: boolean;

    @IsNotEmpty({message: UserValidationMessage.EMAIL_REQUIRED})
    @IsEmail({}, {message: UserValidationMessage.EMAIL_INVALID})
    @MaxLength(255, {message: UserValidationMessage.EMAIL_MAX_LENGTH })
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minLowercase: 0,
        minNumbers: 0,
        minSymbols: 0,
        minUppercase: 0,
      },  {message: UserValidationMessage.PASSWORD_TOO_SHORT })
    @IsNotEmpty({message: UserValidationMessage.PASSWORD_REQUIRED})  
      password: string;

}
