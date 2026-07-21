import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

import { getR2BucketName, getR2Client, getR2PublicUrl } from "@/lib/r2/client";

export interface UploadedFile {
  key: string;
  url: string;
  filename: string;
  mimeType: string;
  sizeBytes: number;
}

export async function uploadFileToR2(file: File, folder = "media"): Promise<UploadedFile> {
  const extension = file.name.split(".").pop() ?? "bin";
  const now = new Date();
  const key = `${folder}/${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${crypto.randomUUID()}.${extension}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  await getR2Client().send(
    new PutObjectCommand({
      Bucket: getR2BucketName(),
      Key: key,
      Body: buffer,
      ContentType: file.type || "application/octet-stream",
    })
  );

  return {
    key,
    url: getR2PublicUrl(key),
    filename: file.name,
    mimeType: file.type || "application/octet-stream",
    sizeBytes: file.size,
  };
}

export async function deleteFileFromR2(key: string): Promise<void> {
  await getR2Client().send(
    new DeleteObjectCommand({ Bucket: getR2BucketName(), Key: key })
  );
}
