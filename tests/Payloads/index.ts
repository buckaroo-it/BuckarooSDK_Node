import { merge } from 'lodash';
import {
    uniqid,
    getIPAddress,
    RecipientCategory,
    IPerson,
    ICompany,
    IAddress,
    IArticle,
    IPhone,
    Gender,
    IRequest,
} from '../../src';

import {
    TestPerson,
    TestCompany,
    TestAddress,
    TestArticle,
    TestPhone,
    TestEmail,
    TestBankAccount,
    TestCustomer,
    TestIp,
} from '../Models/index';

function removeNestedKeys<T extends object>(obj: T, keysToRemove: string[]): T {
    const copy = JSON.parse(JSON.stringify(obj)); // deep copy

    for (const key of keysToRemove) {
        delete copy[key];
        for (const k in copy) {
            if (typeof copy[k] === 'object' && copy[k] !== null) {
                copy[k] = removeNestedKeys(copy[k], [key]);
            }
        }
    }

    return copy;
}

// ------------------------
// Component Payloads
// ------------------------

export function createBillingPayload(overrides: any = {}, exclude: string[] = []) {
    const payload = {
        recipient: TestPerson,
        address: TestAddress,
        phone: TestPhone,
        email: TestEmail,
    };

    const clean = removeNestedKeys(payload, exclude);
    return merge({}, clean, overrides);
}

export function createShippingPayload(overrides: any = {}, exclude: string[] = []) {
    const payload = {
        recipient: TestPerson,
        address: TestAddress,
        email: 'shipping@buckaroo.nl',
    };

    const clean = removeNestedKeys(payload, exclude);
    return merge({}, clean, overrides);
}

export function createAddressPayload(overrides: any = {}, exclude: string[] = []) {
    const payload = {
        address: TestAddress,
    };

    const clean = removeNestedKeys(payload, exclude);
    return merge({}, clean, overrides);
}

export function createCustomerPayload(overrides: any = {}, exclude: string[] = []) {
    const payload = {
        customer: TestCustomer,
    };

    const clean = removeNestedKeys(payload, exclude);
    return merge({}, clean, overrides);
}

export function createArticlesPayload(overrides: Partial<IArticle>[] = [], exclude: string[] = []): IArticle[] {
    const articles: IArticle[] = [
        TestArticle,
        {
            ...TestArticle,
            identifier: 'DEF456',
            description: 'Second Product',
            price: 20.1,
            quantity: 1,
        },
    ];

    const cleaned = articles.map((article) => removeNestedKeys(article, exclude));
    return merge([], cleaned, overrides);
}

// ------------------------
// Base Payload Generator
// ------------------------

export function createBasePayload<T extends IRequest>(
    overrides: Partial<T> = {},
    include: {
        billing?: boolean | { overrides?: any; exclude?: string[] };
        shipping?: boolean | { overrides?: any; exclude?: string[] };
        articles?: boolean | { overrides?: Partial<IArticle>[]; exclude?: string[] };
    } = {},
    exclude: string[] = []
): T {
    const basePayload: Partial<IRequest> = {
        clientIP: TestIp,
        invoice: uniqid(),
        order: uniqid(),
        currency: 'EUR',
        amountDebit: 100.3,
        description: 'Buckaroo Node SDK Test Transaction',
    };

    if (include.billing) {
        const billingConfig = typeof include.billing === 'object' ? include.billing : {};
        basePayload.billing = createBillingPayload(billingConfig.overrides, billingConfig.exclude);
    }

    if (include.shipping) {
        const shippingConfig = typeof include.shipping === 'object' ? include.shipping : {};
        basePayload.shipping = createShippingPayload(shippingConfig.overrides, shippingConfig.exclude);
    }

    if (include.articles) {
        const articlesConfig = typeof include.articles === 'object' ? include.articles : {};
        basePayload.articles = createArticlesPayload(articlesConfig.overrides, articlesConfig.exclude);
    }

    const payload = removeNestedKeys(basePayload, exclude);
    return merge({}, payload, overrides) as T;
}

export function createRefundPayload<T extends object>(overrides: Partial<T> = {}, exclude: string[] = []): T {
    const refundPayload: Partial<IRequest> = {
        invoice: uniqid(),
        amountCredit: 0.01,
        description: 'Buckaroo Node SDK Refund Transaction Test',
    };

    const rpayload = removeNestedKeys(refundPayload, exclude);
    return merge({}, rpayload, overrides) as T;
}

export const getServiceParameter = (response: any, name: string): string => {
    const param = (response.getServices()?.[0]?.parameters as { name: string; value: any }[] | undefined)?.find(
        (p) => p.name === name
    );
    return String(param?.value ?? '');
};

export const formatDate = (date: Date) => date.toISOString().split('T')[0];
