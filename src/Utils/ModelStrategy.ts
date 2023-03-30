import {ServiceParameters} from "./ServiceParameters";
type keys<T> = {[k in keyof T]?:string};
type keyLoop<T> = {[k in keyof T]?: T[k] extends object | undefined ?
    T[k] extends Array<infer Item> | undefined ? keyLoop<Item> : keyLoop<T[k]>
    :string};

export class ModelStrategy<Type extends object> extends ServiceParameters<Type>{
    private _groupTypes?
    private _keys?
    private _countable?

    constructor(data:Type) {
        super(data)
    }
    get groupTypes():keys<Type> {
        return this._groupTypes;
    }
    get keys(): keyLoop<Type> {
        return this._keys;
    }
    get countable(): Array<keyof Type> {
        return this._countable;
    }
    set groupTypes(value:keys<Type>) {
        this._groupTypes = value;
    }
    set keys(value: keyLoop<Type>) {
        this._keys = value;
    }
    set countable(value: Array<keyof Type>) {
        this._countable = value;
    }
    format(data){
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
        return ServiceParameters.formatData(data)
    }
}