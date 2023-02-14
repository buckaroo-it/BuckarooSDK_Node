import IPerson from './IPerson'

export default interface Company extends IPerson {
  companyName?: string
  vatApplicable?: boolean
  varNumber?: string
  chamberOfCommerce?: string
}
