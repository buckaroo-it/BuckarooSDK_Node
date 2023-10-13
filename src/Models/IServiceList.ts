import { Model } from './Model';
import { IParameter, Parameter } from './IParameters';

export interface IService {
    name: string;
    action?: string;
    version?: number;
    parameters?: IParameter[];
}
export class Service extends Model implements IService {
    constructor(data: IService) {
        super(data);
    }
    set action(value: string) {
        this.set('action', value);
    }
    set name(value: string) {
        this.set('name', value);
    }
    set version(value: number) {
        this.set('version', value);
    }
    set parameters(value: IParameter[]) {
        this.set(
            'parameters',
            value.map((parameter) => new Parameter(parameter))
        );
    }
}
export class ServiceList extends Model {
    constructor(...list: IService[]) {
        super({ list: list });
    }
    get list(): Service[] {
        return this.get('serviceList');
    }
    set list(services: IService[]) {
        this.set(
            'serviceList',
            services.map((service) => new Service(service))
        );
    }
    addService(service: IService) {
        if (this.getService(service.name)) {
            this.list[this.list.findIndex((s) => s.name === service.name)] = new Service(service);
        }else
            this.list.push(new Service(service));
    }
    getService(name: string) {
        return this.list.find((service) => service.name.toLowerCase() === name.toLowerCase());
    }
}
