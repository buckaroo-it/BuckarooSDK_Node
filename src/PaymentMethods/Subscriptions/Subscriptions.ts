import BuckarooClient from "../../BuckarooClient";
import PayPayload from "../../Models/PayPayload";
import PaymentMethod from "../PaymentMethod";
import SubscriptionsModel from "./Models/Subscriptions";
import Payload from "../../Models/Payload";

export default class Subscriptions extends PaymentMethod {
  protected requiredConfigFields: Array<string> = [];
  public serviceVersion = 1;
  constructor(api: BuckarooClient) {
    super(api);
    this.paymentName = "Subscriptions";
    this.requiredConfigFields = this.requiredConfigFields.concat(
      this.requiredFields
    );
  }
  async create(model?) {
    return this.api.client.post(
      new Payload().setServices(
        model,
        this.paymentName,
        this.serviceVersion,
        "CreateSubscription",
        new SubscriptionsModel()
      ),
      this.api.client.getDataRequestUrl()
    );
  }

  async createCombined(model?) {
    return this.api.client.post(
      new Payload().setServices(
        model,
        this.paymentName,
        this.serviceVersion,
        "CreateCombinedSubscription",
        new SubscriptionsModel()
      ),
      this.api.client.getDataRequestUrl()
    );
  }

  async manually(model?) {
    return this.api.client.post(
      new PayPayload(model, this, "Pay", new SubscriptionsModel()),
      this.api.client.getTransactionUrl()
    );
  }
  async combine(model?) {
    return this.api.client.post(
      new PayPayload(model, this, "Pay", new SubscriptionsModel()),
      this.api.client.getTransactionUrl()
    );
  }
  async update(model?) {
    return this.api.client.post(
      new PayPayload(model, this, "Pay", new SubscriptionsModel()),
      this.api.client.getTransactionUrl()
    );
  }

  async stop(model?) {
    return this.api.client.post(
      new PayPayload(model, this, "Pay", new SubscriptionsModel()),
      this.api.client.getTransactionUrl()
    );
  }
  async info(model?) {
    return this.api.client.post(
      new PayPayload(model, this, "Pay", new SubscriptionsModel()),
      this.api.client.getTransactionUrl()
    );
  }
  async deletePaymentConfig(model?) {
    return this.api.client.post(
      new PayPayload(model, this, "Pay", new SubscriptionsModel()),
      this.api.client.getTransactionUrl()
    );
  }
  async pause(model?) {
    return this.api.client.post(
      new PayPayload(model, this, "Pay", new SubscriptionsModel()),
      this.api.client.getTransactionUrl()
    );
  }
  async resume(model?) {
    return this.api.client.post(
      new PayPayload(model, this, "Pay", new SubscriptionsModel()),
      this.api.client.getTransactionUrl()
    );
  }
}
