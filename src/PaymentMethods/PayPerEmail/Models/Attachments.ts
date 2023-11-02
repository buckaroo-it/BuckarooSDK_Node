import { Model } from '../../../Models';

export interface IAttachments {
    name: string;
}

export class Attachments extends Model implements IAttachments {
    set name(value: string) {
        this.set('attachment', value);
    }
}
