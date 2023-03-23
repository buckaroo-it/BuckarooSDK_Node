import IArticle from '../../../Models/Services/IArticle';
export interface IAfterPayArticle extends IArticle {
    identifier: string;
    description: string;
    vatPercentage: Number;
    quantity: Number;
    imageUrl?: string;
    url?: string;
    type?: 'PhysicalArticle' | 'DigitalArticle' | 'Giftcard' | 'Discount' | 'ShippingFee' | 'Surcharge' | 'Info' | 'ShippingFees';
    unitCode?: string;
    marketPlaceSellerId?: string;
    refundType?: 'Return' | 'Refund';
}
export declare const AfterPayArticle: (articles: any) => import("../../../Utils/ServiceParameter").ServiceParameters;
