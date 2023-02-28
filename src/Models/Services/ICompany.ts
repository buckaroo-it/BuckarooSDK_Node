import IPerson from './IPerson'

export default interface ICompany extends IPerson {
    companyName?: string
    vatApplicable?: boolean
    varNumber?: string
    chamberOfCommerce?: string
}
