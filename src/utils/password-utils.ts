import {type GenerateOptions, generate} from "generate-password";

export const generatePassword = (options?: GenerateOptions) => generate(options ?? {
    length: 8,
    numbers: true
})
