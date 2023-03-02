
export class ServiceParameter {
    [data:string]:any
    constructor(data,type = '',key?) {
        if(typeof key !== 'undefined'){
            this[key] = data
        }else {
            this.data = data
        }
        this.groupType = () => type
    }
    groupType = () => ''
    groupId = () => ''
    getData(){
        return this
    }
}