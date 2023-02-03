export default class Phone {
  protected landline?: string;
  protected mobile?: string;
  protected fax?: string;

  constructor(props) {
    this.landline = props.landline;
    this.mobile = props.mobile;
    this.fax = props.fax;
  }
}
export const PhoneParams ={
  landline: 'landline',
  mobile:'mobile',
  fax:'fax'
}
