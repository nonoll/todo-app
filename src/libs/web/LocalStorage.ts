export const enum EventType {
  setItem = 'setItem',
  removeItem = 'removeItem',
  clear = 'clear',
  storage = 'storage'
}

export interface ILocalStorageEvent {
  type: EventType;
  key: string;
  value: string;
}

export class LocalStorage {
  private storage: Storage;
  private eventListeners = new Map<string, Function>();

  constructor() {
    if (!LocalStorage.isSupport()) {
      throw new Error('Error...');
    }

    this.storage = window.localStorage;

    this.onStorageListener = this.onStorageListener.bind(this);
    window.addEventListener('storage', this.onStorageListener);
  }

  static isSupport(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  // https://coderwall.com/p/4rsq1w/check-your-html5-local-storage-usage
  // https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API
  // https://developers.google.com/web/updates/2017/08/estimating-available-storage-space
  // navigator.storage.estimate().then(res => console.log(res));
  static StorageRemaining(): Promise<boolean | number> {
    return new Promise(resolve => {
      if (!LocalStorage.isSupport()) {
        return resolve(false);
      }

      const navigator = window.navigator as any;
      let storageInfo = null;

      if (navigator.webkitTemporaryStorage) {
        storageInfo = navigator.webkitTemporaryStorage;
      } else if (navigator.webkitPersistentStorage) {
        storageInfo = navigator.webkitPersistentStorage;
      } else if ((window as any).webkitStorageInfo) {
        storageInfo = (window as any).webkitStorageInfo;
      }

      if (!storageInfo) {
        if (!navigator.storage) {
          return resolve(true);
        }
        navigator.storage
          .estimate()
          .then(({ qouta, usage }: { qouta: number; usage: number }) => resolve(qouta - usage))
          .catch(() => resolve(false));
        return;
      }

      storageInfo.queryUsageAndQuota(
        (usage: number, qouta: number) => resolve(qouta - usage),
        () => resolve(false)
      );
    });
  }

  private onStorageListener(e: StorageEvent): void {
    const { key, newValue: value } = e;
    this.eventListeners.forEach((_: unknown, listenerKey: string) => {
      const listener = this.eventListeners.get(listenerKey);
      if (listener) {
        listener({ type: EventType.storage, key, value });
      }
    });
  }

  subscribe(key: string, listener: (e: ILocalStorageEvent) => void): void {
    this.eventListeners.set(key, listener);
  }

  unsubscribe(key: string): void {
    this.eventListeners.delete(key);
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
    const listener = this.eventListeners.get(key);
    if (listener) {
      listener({ type: EventType.setItem, key, value });
    }
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
    const listener = this.eventListeners.get(key);
    if (listener) {
      listener({ type: EventType.removeItem, key, value: '' });
    }
  }

  clear(): void {
    this.storage.clear();
    this.eventListeners.forEach((_, key) => {
      const listener = this.eventListeners.get(key);
      if (listener) {
        listener({ type: EventType.clear, key, value: '' });
      }
    });
  }

  destroy(): void {
    this.eventListeners.forEach((_, key) => this.unsubscribe(key));
    window.removeEventListener('storage', this.onStorageListener);
  }
}
