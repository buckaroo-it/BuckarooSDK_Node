enum Endpoints {
    LIVE = 'https://checkout.buckaroo.nl',
    TEST = 'https://testcheckout.buckaroo.nl'
}
enum RequestTypePaths {
    Data = '/json/DataRequest',
    Transaction = '/json/Transaction'
}
export { RequestTypePaths }
export default Endpoints
