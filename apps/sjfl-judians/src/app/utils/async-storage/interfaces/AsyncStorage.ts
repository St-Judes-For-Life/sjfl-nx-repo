import { Maybe } from '../../../models/maybe.model';

export interface AsyncStorage {
  set<T>(key: string, value: T): Promise<void>;
  get<T>(key: string): Promise<Maybe<T>>;
  delete(key: string): Promise<void>;
  reset(): Promise<void>;
}
