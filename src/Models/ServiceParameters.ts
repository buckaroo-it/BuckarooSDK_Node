import { Model } from './Model';
import { DataFormatter } from '../Utils/Functions';
import { IParameter } from './IParameters';

export class ServiceParameter extends Model {
    toParameterList(): IParameter[] {
        return DataFormatter.serviceParametersMap(this.getData(), this.getGroups(), this.getCountable());
    }

    protected getGroups(groups: { [key: Capitalize<string>]: Capitalize<string> } = {}) {
        return groups;
    }

    protected getCountable(countable: Capitalize<string>[] = []) {
        return countable;
    }

    protected getAllPropertyDescriptors(
        descriptors = {},
        root: Model = ServiceParameter.prototype
    ): { [p: string]: PropertyDescriptor } {
        return super.getAllPropertyDescriptors(descriptors, root);
    }
}
