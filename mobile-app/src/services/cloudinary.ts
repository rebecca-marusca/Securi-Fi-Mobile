import * as FileSystem from "expo-file-system/legacy";

const CLOUDINARY_CLOUD_NAME = "cotj3zxu";
const CLOUDINARY_UPLOAD_PRESET = "fjpntuya";

export async function uploadProfilePhoto(localUri: string): Promise<string> {
  const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

  const result = await FileSystem.uploadAsync(uploadUrl, localUri, {
    httpMethod: "POST",
    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    fieldName: "file",
    mimeType: "image/jpeg",
    parameters: {
      upload_preset: CLOUDINARY_UPLOAD_PRESET,
      folder: "profile-pictures",
    },
  });

  if (result.status !== 200) {
    throw new Error(`Photo upload failed: ${result.body}`);
  }

  const data = JSON.parse(result.body);
  return data.secure_url as string;
}