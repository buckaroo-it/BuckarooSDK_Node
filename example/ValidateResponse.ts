import {ReplyHandler} from "../src/Handlers/Reply/ReplyHandler";

const buckarooClient  = require('./BuckarooClient')

const JsonDATA = '{"Key":"5340604668D74435AA344E1428ED1292","Invoice":"62d68b6c8ab0c","ServiceCode":"ideal","Status":{"Code":{"Code":190,"Description":"Success"},"SubCode":{"Code":"S001","Description":"Transaction successfully processed"},"DateTime":"2022-07-19T12:46:12"},"IsTest":true,"Order":"ORDER_NO_62d68b6ca2df3","Currency":"EUR","AmountDebit":10.1,"TransactionType":"C021","Services":[{"Name":"ideal","Action":null,"Parameters":[{"Name":"consumerIssuer","Value":"ABN AMRO"},{"Name":"transactionId","Value":"0000000000000001"},{"Name":"consumerName","Value":"J. de Tèster"},{"Name":"consumerIBAN","Value":"NL44RABO0123456789"},{"Name":"consumerBIC","Value":"RABONL2U"}],"VersionAsProperty":2}],"CustomParameters":null,"AdditionalParameters":{"List":[{"Name":"initiated_by_magento","Value":"1"},{"Name":"service_action","Value":"something"}]},"MutationType":1,"RelatedTransactions":null,"IsCancelable":false,"IssuingCountry":null,"StartRecurrent":false,"Recurring":false,"CustomerName":"J. de Tèster","PayerHash":"2d26d34584a4eafeeaa97eed10cfdae22ae64cdce1649a80a55fafca8850e3e22cb32eb7c8fc95ef0c6f96669a21651d4734cc568816f9bd59c2092911e6c0da","PaymentKey":"AEC974D455FF4A4B9B4C21E437A04838","Description":null}'
const auth_header = 'hmac N8hyQHxZ9W:swtPNR5+XSxKBYUJIWpJ8W/zDcZVuUJGn5kUR0HJEZg=:d550afab01d74207ad75f4ffe3e76beb:1686733946';

const url = 'https://buckaroo.dev/push'

//Validate Json Response
let replyHandler = new ReplyHandler(buckarooClient().getCredentials(),JsonDATA,auth_header,url)
replyHandler.validate()
replyHandler.isValid // Returns true or false

const HttpData = `ADD_service_action=1&brq_amount=10.10&brq_currency=EUR&brq_customer_name=J.+de+T%C3%A8ster&brq_invoicenumber=5fe146d9f7b198&brq_ordernumber=5fe146d9f78dd8&brq_payer_hash=2d26d34584a4eafeeaa97eed10cfdae22ae64cdce1649a80a55fafca8850e3e22cb32eb7c8fc95ef0c6f96669a21651d4734cc568816f9bd59c2092911e6c0da&brq_payment=82F023D0AE17443C9C674E8DEFE5279B&brq_payment_method=ideal&brq_SERVICE_ideal_consumerBIC=RABONL2U&brq_SERVICE_ideal_consumerIBAN=NL44RABO0123456789&brq_SERVICE_ideal_consumerIssuer=ABN+AMRO&brq_SERVICE_ideal_consumerName=J.+de+T%C3%A8ster&brq_SERVICE_ideal_transactionId=0000000000000001&brq_statuscode=190&brq_statuscode_detail=S001&brq_statusmessage=Transaction+successfully+processed&brq_test=true&brq_timestamp=2023-06-14+12%3A30%3A06&brq_transactions=85A3373B1A284B8F8E1D175CA5C0273B&brq_websitekey=N8hyQHxZ9W&brq_signature=62be159a87975a45d7b025cfbbff968c2dc8b9a1`


//Validate Http Response

replyHandler = new ReplyHandler(buckarooClient().getCredentials(),HttpData)
replyHandler.validate()
replyHandler.isValid // Returns true or false
