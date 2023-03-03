export class ServiceParameter {
    constructor(data, dataKey, groupType = '') {
        this[dataKey] = data
        this.setGroupType(groupType)
    }
    private setObjectKeys(keys: { [key: string]: string }) {
        for (const keysKey in keys) {
            if (this[keysKey]) {
                delete Object.assign(this, { [keys[keysKey]]: this[keysKey] })[keysKey]
            }
        }
    }
    setKeys(keys: { [key: string]: any }) {
        for (const pkey in this) {
            if (typeof this[pkey] === 'object') {
                if (Array.isArray(this[pkey])) {
                    for (const arrayKey in this[pkey]) {
                        this.setObjectKeys.call(this[pkey][arrayKey], keys)
                    }
                } else {
                    this.setObjectKeys.call(this[pkey], keys)
                }
            } else if (typeof this[pkey] !== 'function') {
                this.setObjectKeys.call(this, keys)
            }
        }
    }

    groupType: () => string = () => ''
    setGroupType(type) {
        this.groupType = () => type
    }
    groupId: () => string | number = () => ''
    setGroupId(id) {
        this.groupId = () => id
    }
    makeCountable(parameterKey) {
        for (const argumentsKey in this[parameterKey]) {
            this[parameterKey][argumentsKey].groupId = () => parseInt(argumentsKey) + 1
        }
    }
}
