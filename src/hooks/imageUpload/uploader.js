import { sha1 } from 'crypto-hash';

export const uploadImage = async (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);
  return await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL + '/upload', {
    method: 'POST',
    body: data,
  })
    .then((res) => res.json())
    .then((data) => data);
};

export const deleteImage = async (public_id) => {
  const data = new FormData();
  const timestamp = new Date().getTime();
  const string = `public_id=${public_id}&timestamp=${timestamp}${process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET}`;
  const signature = await sha1(string);
  data.append('public_id', public_id);
  data.append('signature', signature);
  data.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
  data.append('timestamp', timestamp);
  return await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL + '/destroy', {
    method: 'POST',
    body: data,
  })
    .then((data) => console.log(data))
    .catch((error) => {
      throw console.log(`deleteImage Error : ${error.message}`);
    });
};
