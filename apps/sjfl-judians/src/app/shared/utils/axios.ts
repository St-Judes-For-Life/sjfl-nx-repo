import { RequestService } from '@sjfl/data';

export const ClientRequestService = new RequestService(
  'CLIENT',
  import.meta.env.VITE_CLIENT_API_BASE_URL
).instance;
