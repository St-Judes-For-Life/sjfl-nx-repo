import { RequestService } from '@sjfl/data';

export const AdminRequestService = new RequestService(
  'ADMIN',
  import.meta.env.VITE_ADMIN_API_BASE_URL
).instance;
