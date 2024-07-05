import { FileTypeValidator, MaxFileSizeValidator, ParseFilePipe } from "@nestjs/common";
import { memoryStorage } from "multer";

export const imageUploadConfig = {
    storage: memoryStorage(),
};

export const changeImageValidator = new ParseFilePipe({
    validators: [
        new MaxFileSizeValidator({maxSize: 1000000}),
        new FileTypeValidator({fileType: /^image\/jpg|jpeg|png/})
    ]
});