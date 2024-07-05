import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { PutObjectCommand, S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

@Injectable()
export class AwsS3Service {
    private _client: S3Client | undefined;
    private readonly AWS_REGION: string;
    private readonly AWS_BUCKET_NAME: string;
    private readonly AWS_ACCESS_KEY: string;
    private readonly AWS_SECRET_ACCESS_KEY: string;

    constructor(
        private configService: ConfigService
    ) { 
        this.AWS_REGION = this.configService.get("AWS_REGION");
        this.AWS_BUCKET_NAME = this.configService.get("AWS_BUCKET_NAME");
        this.AWS_ACCESS_KEY = this.configService.get("AWS_ACCESS_KEY");
        this.AWS_SECRET_ACCESS_KEY = this.configService.get("AWS_SECRET_ACCESS_KEY");
    }

    private initClient() {
        if (this._client) {
            return;
        }

        this._client = new S3Client({
            region: this.AWS_REGION,
            credentials: {
                accessKeyId: this.AWS_ACCESS_KEY,
                secretAccessKey: this.AWS_SECRET_ACCESS_KEY
            }
        });
    }

    public async sendFile(file: Express.Multer.File, fileKey: string) {
        this.initClient();

        const params = {
            Bucket: this.AWS_BUCKET_NAME,
            Key: fileKey,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        const command = new PutObjectCommand({
            ...params,
            ACL: "public-read"
        });
        
        return await this._client?.send(command);
    }

    public async deleteFile(fileName: string) {
        this.initClient();

        const params = {
            Bucket: this.AWS_BUCKET_NAME,
            Key: fileName
        };

        const command = new DeleteObjectCommand(params);
        await this._client?.send(command);
    }
}