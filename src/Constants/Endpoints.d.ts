declare enum Endpoints {
    LIVE = "https://checkout.buckaroo.nl/",
    TEST = "https://testcheckout.buckaroo.nl/"
}
declare enum RequestType {
    Data = 1,
    Transaction = 2
}
export { RequestType };
export default Endpoints;
