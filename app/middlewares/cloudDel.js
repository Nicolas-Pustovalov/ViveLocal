module.exports =  async (data) => {
    const key = data.split('/')[data.split('/').length-1].split('.')[0];
    await cloudinary.uploader.destroy(key);
    return;        
  }