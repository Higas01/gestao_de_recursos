export enum UserValidationMessage {
    EMAIL_REQUIRED = "Email precisa ser preenchido",
    EMAIL_INVALID = "Email passado não é válido",
    EMAIL_MAX_LENGTH = "Email excede o limite de caracteres (255)",
    ISADMIN_REQUIRED = "IsAdmin precisa ser preenchido",
    NAME_REQUIRED = "name precisa ser preenchido",
    NAME_MAX_LENGTH = "name excede o limite de caracteres (100)",
    PASSWORD_REQUIRED = "Password precisa ser preenchido",
    PASSWORD_TOO_SHORT = "Campo Password precisa ter ao menos 6 caracteres",
    EMAIL_ALREADY_EXISTS = "E-mail já está cadastrado",
    USER_NOT_FOUND = "Usuário não existente"
}