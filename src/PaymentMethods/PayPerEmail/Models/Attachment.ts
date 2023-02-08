import Model from "../../../Models/Model";

export default class Attachment extends Model {
  name?: string;
  constructor(data) {
    super();
    this.name = data.name;
    this.setKeys({
      name: "attachment",
    });
  }
}
