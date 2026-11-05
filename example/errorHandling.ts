import { AuthenticationError, BuckarooApiError, ParameterValidationError } from '@buckaroo/buckaroo_sdk';
import buckarooClient from './buckarooClient';

(async () => {
    try {
        const response = await buckarooClient
            .method('ideal')
            .pay({
                amountDebit: 10.1,
                invoice: 'Error handling example',
            })
            .request();

        // Buckaroo answered: a declined or rejected payment is a normal response, not an error
        if (response.isSuccess()) {
            console.log('Paid', response.getTransactionKey());
        } else if (response.hasRedirect()) {
            console.log('Redirect the customer to', response.getRedirectUrl());
        } else {
            console.warn('Payment not successful:', response.getStatusCode(), response.getErrorMessage());
        }
    } catch (error) {
        // The request itself failed
        if (error instanceof ParameterValidationError) {
            console.error('Invalid input:', error.parameterName, error.message);
        } else if (error instanceof AuthenticationError) {
            console.error('Check the website key and secret key:', error.httpStatus);
        } else if (error instanceof BuckarooApiError) {
            console.error('Buckaroo API error:', error.httpStatus, error.body);
        } else {
            throw error;
        }
    }
})();
