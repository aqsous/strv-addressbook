import axios from 'axios';

export function uploadImage(file, onUploadProgress) {
  const formData = new FormData();
  formData.append('image', file);
  return axios.post('file/imageUpload', formData, {
    onUploadProgress,
  });
}

export function saveMedia(fileUrl, contentType, type) {
  return axios.post('admin/medias', {
    type,
    contentType,
    originalUrl: fileUrl,
  });
}
