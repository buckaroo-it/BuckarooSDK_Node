enum Endpoints {
    LIVE = 'https://checkout.buckaroo.nl',
    TEST = 'https://testcheckout.buckaroo.nl',
}
export enum RequestTypes {
    Data = '/json/DataRequest',
    Transaction = '/json/Transaction',
    BatchData = '/json/batch/DataRequests',
    BatchTransaction = '/json/batch/Transactions',
}
export default Endpoints;
