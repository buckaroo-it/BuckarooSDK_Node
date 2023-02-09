// import IPerson from "../../../Models/IPerson";
import Model from "../../../Models/Model";

export default class Person {
    category: string = '';
    gender: string = '';
    initials?: string;
    name?: string;
    firstName: string = '';
    lastName: string = '';
    birthDate?: string;
    placeOfBirth?: string;
    constructor(data) {
        Model.setParameters(this,data)
    }

}
