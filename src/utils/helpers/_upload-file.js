import { BlobServiceClient } from "@azure/storage-blob";

export const uploadFile = async (files) => {
  const filesUrl = [];
  try {
    const promises = [];
    const blobSasUrl = process.env.VUE_APP_STORAGE_SAS_URL;

    const blobServiceClient = new BlobServiceClient(blobSasUrl);

    const containerName = process.env.VUE_APP_STORAGE_IMAGE_CONTAINER;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    if (files instanceof FileList) {
      for await (const file of files) {
        await upload(containerClient, promises, file, filesUrl);
      }
    } else {
      await upload(containerClient, promises, files, filesUrl);
    }
    return filesUrl;
  } catch (err) {
    console.log(err);
  }
};

const upload = async (containerClient, promises, file, filesUrl) => {
  const blockBlobClient = containerClient.getBlockBlobClient(file.name);
  promises.push(blockBlobClient.uploadBrowserData(file));
  await Promise.all(promises);
  filesUrl.push(blockBlobClient.url);
};
