export class ServiceParameter {
    key:string
    [data:string]:any
    constructor(data,key) {
        this.key = key
        this[key] = data
    }
    setKeys(keys:{[key:string]:string}){
        for (const keysKey in keys) {
            if (this[this.key][keysKey]) {
                delete Object.assign(this[this.key], { [keys[keysKey] ]: this[this.key][keysKey] })[keysKey]
            }
        }
    }
    setGroupType(type){
        this.groupType = () => type
    }
    groupType = () => ''
    groupId: () => string | number = () => ''
    setGroupId(id){
        this.groupId = () => id
    }
    getData():any {
        return this[this.key]
    }
}