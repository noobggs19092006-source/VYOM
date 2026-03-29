import axios from 'axios';
import FormData from 'form-data';

export const uploadToImgbb = async (buffer, originalName) => {
  try {
    const form = new FormData();
    form.append('image', buffer, { filename: originalName });
    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, form, {
      headers: {
        ...form.getHeaders()
      }
    });
    return response.data.data.display_url;
  } catch (error) {
    console.error('ImgBB Upload Error:', error?.response?.data || error.message);
    throw new Error('Image upload failed');
  }
};
