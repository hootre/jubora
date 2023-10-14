import { sha1 } from 'crypto-hash';

export const uploadImage = async (file, folder = 'jubora_board') => {
  // folder = jubora_order, jubora_templates, jubora_board,
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', folder);
  return await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL + '/upload', {
    method: 'POST',
    body: data,
  })
    .then((response) => {
      // reponse가 ok가 아닐 때
      if (!response.ok) {
        throw new Error(`${response.status} 에러 발생`);
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error) => {
      throw console.error(`이런 에러 발생 : ${error.message}`);
    });
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
    .then((data) => data)
    .catch((error) => {
      throw console.error(`deleteImage Error : ${error.message}`);
    });
};
