<template>
  <div>Numbered List</div>
</template>

<script>
import { Document, Paragraph, ImageRun, Packer } from "docx";
//ImageRun, Packer
import { saveAs } from "file-saver";

export default {
  /* eslint-disable */

  dataI() {
    return {
      //
    };
  },

  mounted() {
    this.createDoc();
  },

  methods: {
    getImageHeightWidth(src) {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve({ height: img.height, width: img.width });
        img.onerror = reject;
        img.src = src;
      });
    },
    async createImageRun(imgUrl, targetWidth = 319.37007874) {
      let height = 0,
        width = 0;
      await this.getImageHeightWidth(imgUrl).then((obj) => {
        console.log(obj);
        height = obj.height;
        width = obj.width;
      });

      const originalAspectRatio = width / height;

      width = targetWidth;
      height = width / originalAspectRatio;
      return new ImageRun({
        data: await fetch(imgUrl).then((response) => response.blob()),
        transformation: {
          width: width,
          height: height,
        },
      });
    },
    async createDoc() {
      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph("Hello World"),
              new Paragraph({
                children: [
                  await this.createImageRun(
                    "https://images.pexels.com/photos/9882510/pexels-photo-9882510.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                  ),
                ],
              }),
            ],
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "test.docx");
      });
    },
  },
};
</script>

<style></style>
