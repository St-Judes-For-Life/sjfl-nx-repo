import {
  get as idbGet,
  set as idbSet,
  del as idbDel,
  clear as idbClear,
} from 'idb-keyval';
import { AsyncStorage } from '../interfaces/AsyncStorage';

export class IdbStorage implements AsyncStorage {
  get<T>(key: string) {
    return idbGet<T>(key);
  }
  set<T>(key: string, value: T): Promise<void> {
    return idbSet(key, value);
  }
  delete(key: string): Promise<void> {
    return idbDel(key);
  }
  reset(): Promise<void> {
    return idbClear();
  }
}
