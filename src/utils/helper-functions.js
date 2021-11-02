import { BlobServiceClient } from "@azure/storage-blob";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const uploadImage = async (files) => {
  const filesUrl = [];
  try {
    const promises = [];
    const blobSasUrl = process.env.VUE_APP_STORAGE_SAS_URL;

    const blobServiceClient = new BlobServiceClient(blobSasUrl);

    const containerName = process.env.VUE_APP_STORAGE_IMAGE_CONTAINER;
    const containerClient = blobServiceClient.getContainerClient(containerName);

    for await (const file of files) {
      const blockBlobClient = containerClient.getBlockBlobClient(file.name);
      promises.push(blockBlobClient.uploadBrowserData(file));
      await Promise.all(promises);

      filesUrl.push(blockBlobClient.url);
    }

    return filesUrl;
  } catch (err) {
    console.log(err);
  }
};

export default {
  capitalizeFirstLetter,
  uploadImage,
};
