export default class Parameters{
    public parameterList: {}[] = [];

    constructor(pay,data) {
        this.setUp(pay,data)
    }

    setUp(pay,data){
        for (const payKey in pay) {
            let param = { name:'', value:'', groupType:'', groupID:''}
            if(data[payKey]){
                param.name = payKey;
                param.value = data[payKey]
                param.groupType = ''
                param.groupID = ''
                this.parameterList.push(param)
            }
        }
    }
}