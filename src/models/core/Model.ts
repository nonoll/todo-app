import { uuidv4 } from '@/libs/functions'

export abstract class Model<M = unknown, D = unknown> {
  protected uuid: string = uuidv4()
  abstract state: unknown

  constructor (data?: D) {
    if (data) {
      this.fromVo(data)
    }
  }

  abstract fromVo (vo?: D): unknown

  abstract toVo (vo?: D): M
}
