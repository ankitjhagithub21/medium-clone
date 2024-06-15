const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append("upload_preset", "medium-clone");
    formData.append("api_key", import.meta.env.VITE_API_KEY);
  
    const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData
    });
  
    const data = await res.json();
    if (!data) {
      throw new Error("Error uploading image.");
    }
  
    const imageData = {
      publicId: data.public_id,
      url: data.secure_url
    };
  
    return imageData;
  }
  
  export default uploadImage;
  