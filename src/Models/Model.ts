import { Str } from '../Utils/Functions'
export class Model {
    [key: keyof any]: any
    constructor(...args: any[]) {
        this.initialize(...args)
    }
    initialize(data?: any) {
        if (data instanceof Object && !Array.isArray(data)) {
            if (data.constructor === this.constructor) {
                this.setDataProperties(data)
            } else this.setOwnProperties(data)
        }
    }
    protected setOwnProperties(
        data: object = {},
        properties: { [key: string]: PropertyDescriptor } = this.getAllPropertyDescriptors()
    ) {
        for (const key in properties) {
            if (properties[key].set) {
                let value = data[key] ?? properties[key].get?.call(this)
                if (value !== undefined) this[key] = value
            }
        }
        return this
    }
    protected setDataProperties(data: object = {}) {
        for (const dataKey in data) {
            if (data.hasOwnProperty(dataKey) && data[dataKey] !== undefined)
                this.set(dataKey, data[dataKey])
        }
        return this
    }
    protected privateName(name: string): string {
        return Str.ucfirst(name)
    }
    protected publicName(name: string): string {
        return Str.lcfirst(name)
    }
    protected getAllPropertyDescriptors(
        descriptors = {},
        root = Model.prototype
    ): { [p: string]: PropertyDescriptor } {
        // Loop through the prototype chain
        let currentObj = Object.getPrototypeOf(this)
        while (currentObj !== root) {
            const currentDescriptors = Object.getOwnPropertyDescriptors(currentObj)

            // Merge the descriptors into the result
            descriptors = { ...currentDescriptors, ...descriptors }

            // Move up the prototype chain
            currentObj = Object.getPrototypeOf(currentObj)
        }
        return descriptors
    }
    protected defineProperty(name: string, value: any, hidden: boolean = false) {
        let privateName = this.privateName(name)
        Object.defineProperty(this, privateName, {
            value,
            writable: true,
            enumerable: !hidden,
            configurable: true
        })
        let publicName = this.publicName(name)
        Object.defineProperty(this, publicName, {
            get: () => value,
            set: this.has(publicName)?.set ?? ((value) => this.set(publicName, value, hidden)),
            enumerable: false,
            configurable: true
        })
    }
    set(name: string, value: any, hidden: boolean = false): this {
        this.defineProperty(name, value, hidden)
        return this
    }
    get(prop: string): any {
        return this.has(prop)?.get?.call(this)
    }
    has(prop: string, model = this): PropertyDescriptor | undefined {
        return getObjectProperty(model, prop, Model.prototype)
    }
    getData(callBack?: ((this: any, key: string, value: any) => any) | undefined): {
        [key: string]: any
    } {
        return JSON.parse(JSON.stringify(this), callBack)
    }
}

export class JsonModel extends Model {
    constructor(data: object) {
        super(data)
    }
    initialize(data?: any) {
        this.setDataProperties(data)
    }

    set(key: string, value: any) {
        Object.defineProperty(this, Str.lcfirst(key), {
            get: this.get.bind(this, value),
            enumerable: true
        })
        return this
    }
    get(value: any) {
        if (Array.isArray(value)) {
            return value.map((v) => new JsonModel(v))
        }
        if (value instanceof Object) {
            return new JsonModel(value)
        }
        if (value === null) {
            return undefined
        }
        return value
    }
}
export function getObjectProperty(object: object, property: string, root: any = null) {
    if (object !== root) {
        return (
            Object.getOwnPropertyDescriptor(object, property) ??
            getObjectProperty(Object.getPrototypeOf(object), property, root)
        )
    }
}
