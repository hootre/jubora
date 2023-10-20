import { sha1 } from 'crypto-hash';
import toast from 'react-hot-toast';

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
        toast.error('이미지 업로드 실패');
        throw console.error(`${response.status} 에러 발생`);
      }
      return response.json();
    })
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
    .then((response) => {
      // reponse가 ok가 아닐 때
      if (!response.ok) {
        toast.error('이미지 삭제 실패');
        throw console.error(`${response.status} 에러 발생`);
      }
      return response.json();
    })
    .then((data) => data);
};
