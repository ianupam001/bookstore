import { request } from './instance';

export class BulkOps {
  static bulkImport(payload: any) {
    return request({
      method: 'POST',
      url: '/bulk-import',
      data: payload,
    });
  }
}
