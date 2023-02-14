import api from "../index";
import { issuers , pay} from '../PaymentMethods/Ideal/Ideal'
import { uniqid } from "../Utils/Functions";

let simplePayload = {
  returnURL: "https://example.com/return",
  invoice: uniqid(),
  amountDebit: 10.1,
  issuer: "ABNANL2A",
}
describe('testing Ideal methods', () => {
  test('Issuers', async() => {
      await issuers()
        .then(r => {
          expect(r.data).toBeDefined();
          expect(r.statusCode).toBeGreaterThanOrEqual(200);
          expect(r.statusCode).toBeLessThan(300);
        })
    });
  test('Pay Simple Payload', async() => {
    await pay(simplePayload)
      .then(r => {
        expect(r.data).toBeDefined();
        expect(r.statusCode).toBeGreaterThanOrEqual(200);
        expect(r.statusCode).toBeLessThan(300);
      })
  });
});
