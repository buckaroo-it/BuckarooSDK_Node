import { ServiceParameters } from './ServiceParameters'
type keyLoop<T, Possible> = {
    [k in keyof T]?: T[k] extends object | undefined
        ? T[k] extends Array<infer Item> | undefined
            ? keyLoop<Item, Possible> | Possible
            : keyLoop<T[k], Possible> | Possible
        : Possible
}

export  class ModelStrategy<Type extends object> extends ServiceParameters<Type> {
    private _groupTypes?
    private _keys?
    private _countable?

    constructor(data: Type) {
        super(data)
    }
    get groupTypes(): keyLoop<Type, string> {
        return this._groupTypes
    }
    set groupTypes(value: keyLoop<Type, string>) {
        this._groupTypes = value
    }
    get keys(): keyLoop<Type, string | false> {
        return this._keys
    }
    set keys(value: keyLoop<Type, string | boolean>) {
        this._keys = value
    }
    get countable(): Array<keyof Type> {
        return this._countable
    }
    set countable(value: Array<keyof Type>) {
        this._countable = value
    }
    addKeys(newKey: keyLoop<Type, string>) {
        const stack = [[this._keys, newKey]]
        while (stack.length) {
            const [currentNewKey, currentKey] = stack.pop()!
            for (const [key, value] of Object.entries(currentKey)) {
                if (value instanceof Object && currentNewKey[key]) {
                    stack.push([currentNewKey[key], value])
                } else {
                    currentNewKey[key] ??= value
                }
            }
        }
    }
    format(data) {
        this.setData(data)

        if (this._groupTypes) {
            this.setGroupTypes(this._groupTypes)
        }
        if (this._keys) {
            this.setKeys(this._keys)
        }
        if (this._countable) {
            this.setCountable(this._countable)
        }
        return ServiceParameters.formatData(this.data)
    }
}
