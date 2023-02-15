
export default class Pay{
  useMobileView: boolean = false
  constructor (data) {
    this.useMobileView = data.useMobileView ? data.useMobileView : false
  }
}
