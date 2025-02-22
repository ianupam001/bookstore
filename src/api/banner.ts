import { request } from './instance';

export class Banners {
  static uploadBanner(
    file: File,
    name: string,
    page: string,
    isVerified: boolean = false,
    status: 'active' | 'banned' = 'active'
  ) {
    const formData = new FormData();
    formData.append('banner', file);
    formData.append('name', name);
    formData.append('page', page);
    formData.append('isVerified', String(isVerified));
    formData.append('status', status);

    return request({
      method: 'POST',
      url: `banners/upload`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static getBannersByPage(page: string) {
    return request({
      method: 'GET',
      url: `banners/${page}`,
    });
  }

  static updateBanner(id: string, formData: FormData) {
    console.log([...formData.entries()]); // Log FormData entries for debugging
    return request({
      method: 'PATCH',
      url: `banners/edit/${id}`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static deleteBanner(id: string) {
    console.log(id);
    return request({
      method: 'DELETE',
      url: `banners/delete/${id}`,
    });
  }
}
