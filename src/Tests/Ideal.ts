import { issuers , pay , refund ,payRemainder } from '../PaymentMethods/Ideal/Ideal'
import { uniqid } from "../Utils/Functions";


describe('testing Ideal methods', () => {
  test('Issuers', async() => {
      await issuers()
        .then(r => {
          expect(r.data).toBeDefined();
          expect(r.statusCode).toBeGreaterThanOrEqual(200);
          expect(r.statusCode).toBeLessThan(300);
          console.log(r.data)
        })
    });
  test('Pay Simple Payload', async() => {
    await create_ideal_Payment()
      .then(r => {
        expect(r.data).toBeDefined();
        expect(r.statusCode).toBeGreaterThanOrEqual(200);
        expect(r.statusCode).toBeLessThan(300);
        expect(r.data.Status.Code.Code).toBe(791);
        console.log(r.data)
      })
  });
//Not Working
  // test('PayRemainder', async() => {
  //   payRemainder(simplePayload)
  //     .then(r => {
  //       console.log(r)
  //       expect(r.data).toBeDefined();
  //       expect(r.statusCode).toBeGreaterThanOrEqual(200);
  //       expect(r.statusCode).toBeLessThan(300);
  //       console.log(r.data)
  //     })
  // })
  test('Refund', async() => {
    await create_ideal_Refund()
      .then(r => {
        expect(r.data).toBeDefined();
        expect(r.statusCode).toBeGreaterThanOrEqual(200);
        expect(r.statusCode).toBeLessThan(300);
        expect(r.data.Status.Code.Code).toBeGreaterThan(490);
      })
  })
});



function create_ideal_Payment() {

  return pay({
    invoice: uniqid(),
    amountDebit: 10.1,
    issuer: "ABNANL2A",
    pushURL: "https://buckaroo.nextto.dev/push",
    returnURL: "https://buckaroo.nextto.dev/return",
    clientIP: {
      address: "123.456.789.123",
      type: 0
    },
    additionalParameters: {
      initiated_by_magento: 1,
      service_action: "something"
    }
  })
}

function create_ideal_Refund() {

  return refund({
    invoice: "testinvoice 123",
    originalTransactionKey: "4E8BD922192746C3918BF4077CXXXXXX",
    amountCredit: 1.23,
    clientIP: {
      address: "123.456.789.123",
      type: 0
    },
    additionalParameters: {
      initiated_by_magento: "1",
      service_action: "something"
    }
  })
}