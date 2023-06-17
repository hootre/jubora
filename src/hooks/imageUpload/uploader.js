export const uploadImage = async (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);
  return fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL + '/upload', {
    method: 'POST',
    body: data,
  })
    .then((res) => res.json())
    .then((data) => data);
};

export const deleteImage = async (public_id) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);
  data.append('public_id', public_id);
  return fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL + '/destroy', {
    method: 'POST',
    body: data,
  }).then((data) => console.log('이미지 삭제 성공'));
};
