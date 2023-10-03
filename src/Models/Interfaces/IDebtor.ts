import { Model } from '../Model'

export default interface IDebtor {
    code: string
}
export class Debtor extends Model {
    set code(value: string) {
        this.set('code', value)
    }
}
