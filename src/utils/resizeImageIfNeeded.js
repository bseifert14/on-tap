// utils/resizeImageIfNeeded.js
export default function resizeImageIfNeeded(file, maxWidth = 1280) {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();
  
      reader.onload = (e) => {
        img.onload = () => {
          if (img.width <= maxWidth) return resolve(file);
  
          const canvas = document.createElement("canvas");
          const scale = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scale;
  
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
          canvas.toBlob((blob) => {
            const resizedFile = new File([blob], file.name, { type: file.type });
            resolve(resizedFile);
          }, file.type);
        };
        img.src = e.target.result;
      };
  
      reader.readAsDataURL(file);
    });
  }
  