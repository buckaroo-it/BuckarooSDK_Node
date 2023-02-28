
export default interface IRatePlan {
    add?:{
        startDate:string
        endDate?:string
        ratePlanCode:string
    }
    update?:{
        startDate:string
        endDate?:string
        ratePlanGuid:string
        charge:{
            ratePlanChargeCode?:string
            vatPercentage?:Number
            ratePlanChargeGuid?:string
            baseNumberOfUnits?:string | Number
            pricePerUnit?:Number
        }
    }
}

class AddRatePlan {
    startDate:string;
    endDate:string
    ratePlanCode:string
    constructor(data) {
        this.startDate = data.startDate
        this.endDate = data.endDate
        this.ratePlanCode = data.ratePlanCode
    }
    groupType(){
        return 'AddRatePlan'
    }

}

class Charge {
    constructor(charge) {
        for (const chargeKey in charge) {
            this[chargeKey] = charge[chargeKey]
        }
    }
    groupType(){
        return 'UpdateRatePlanCharge'
    }

}

class UpdateRatePlan {
    update: {
        startDate: string;
        endDate?: string;
        ratePlanGuid: string;
        charge: Charge
    };

    constructor(update: any) {
        this.update = update
        this.update.charge = new Charge(update.charge)
    }
    groupType(){
        return 'UpdateRatePlan'
    }
}


export class RatePlan {
    private add?:AddRatePlan
    private update?:UpdateRatePlan;
    constructor(data) {
        if(data.add){
            this.add = new AddRatePlan(data.add)
        }
        if(data.update){
            this.update = new UpdateRatePlan(data.update)
        }

    }
}