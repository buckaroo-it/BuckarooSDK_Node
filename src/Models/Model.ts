type PartialRecord<K extends keyof any, T> = {
    [P in K]?: T
}

export default class Model {
    setParameters(data) {
        /** Go through model to check which parameter to set,
         * delete if optional with no value,
         * rewrite if new data is set,
         * throw error if missing required parameter
         * and ignore function parameters
         */

        // for (const key in this) {
        //   if(typeof this[key] !== 'function') {
        //     //checkIfMissingRequired
        //     if(typeof this[key] === 'undefined' && typeof data[key] === 'undefined'){
        //       throw new Error('Missing Requird Parameter:' + key + ' in ' + this.constructor.name)
        //     //checkIfOptionalToDelete
        //     }else if (typeof data[key] === 'undefined') {
        //       if(String(this[key]) === '') {
        //         delete this[key]
        //       }
        //     } else{
        //       this[key] = data[key]
        //     }
        //   }
        // }
        for (const key in this) {
            if (typeof this[key] === 'undefined') {
                throw new Error('Missing Requird Parameter:' + key + ' in ' + this.constructor.name)
            }
        }
        return this
    }

    setKeys(keys: PartialRecord<keyof typeof this, string>) {
        /** Go through keys and change names in model if it exists **/
        for (const thisKey in keys) {
            if (this[thisKey]) {
                // @ts-ignore
                delete Object.assign(this, { [keys[thisKey]]: this[thisKey] })[thisKey]
            }
        }
        return this
    }
}
