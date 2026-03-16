export default function resizeImageIfNeeded(file, maxWidth = 1000) {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();
  
      reader.onload = (e) => {
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const scale = img.width > maxWidth ? maxWidth / img.width : 1;
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob((blob) => {
            const resizedFile = new File([blob], file.name.replace(/\.[^.]+$/, ".webp"), {
              type: "image/webp",
            });
            resolve(resizedFile);
          }, "image/webp", 0.75);
        };
        img.src = e.target.result;
      };
  
      reader.readAsDataURL(file);
    });
}