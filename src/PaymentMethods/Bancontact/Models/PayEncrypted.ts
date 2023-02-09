import PayForm from "../../../Models/PayForm";
export default class PayEncrypted extends PayForm {

    encryptedCardData : string|object = { encryptedCardData : ''}
    description? :string

}