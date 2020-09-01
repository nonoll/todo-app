import { onBeforeUnmount, reactive } from '@vue/composition-api'
import { LocalStorage } from '@/libs/web/LocalStorage'

export const useLocalStorage = (useDestroy = true) => {
  const storage = new LocalStorage()

  if (useDestroy) {
    onBeforeUnmount(() => storage.destroy())
  }

  return {
    storage,
    StorageRemaining: LocalStorage.StorageRemaining,
    isSupport: LocalStorage.isSupport
  }
}

export interface ILocalStorageState {
  storageRemaining: number | boolean;
  data: string;
}

export const useLocalStorageByKey = (key: string, useDestroy = true) => {
  const storageKey = key
  const storage = new LocalStorage()
  const state = reactive({
    storageRemaining: 0,
    data: storage.getItem(storageKey) || ''
  }) as ILocalStorageState

  const setItem = (value: string) => storage.setItem(storageKey, value)
  const appendItem = (value: string) => setItem(state.data + value)
  const getItem = () => storage.getItem(storageKey)
  const deleteItem = () => storage.removeItem(storageKey)

  storage.subscribe(storageKey, ({ value }) => {
    state.data = value
  })

  if (useDestroy) {
    onBeforeUnmount(() => storage.destroy())
  }

  return {
    state,
    storage,
    setItem,
    appendItem,
    getItem,
    deleteItem
  }
}
