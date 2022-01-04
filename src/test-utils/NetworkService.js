export class StorageService {
  constructor() {
    this.token = null;
    this.user = {};
  }

  setAccessToken(token) {
    this.token = `Bearer ${token}`;
  }

  clearAccessToken() {
    this.token = null;
  }

  getAccessToken() {
    return this.token;
  }
}

export const storageService = new StorageService();
