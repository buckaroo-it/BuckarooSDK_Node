import { IIn3Article } from './Article';
import { ServiceParameter } from '../../../Models';

export class Refund extends ServiceParameter {
    set merchantImageUrl(value: string) {
        this.set('merchantImageUrl', value);
    }

    set summaryImageUrl(value: string) {
        this.set('summaryImageUrl', value);
    }

    set articles(value: IIn3Article[]) {
        this.set('article', value);
    }
}
