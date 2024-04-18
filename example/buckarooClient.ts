import Buckaroo from "@buckaroo/buckaroo_sdk";

const buckaroo = Buckaroo.InitializeClient(
    {
        secretKey: process.env.BPE_SECRET_KEY || "",
        websiteKey: process.env.BPE_WEBSITE_KEY || "",
    },
    {
        mode: "TEST",
        currency: "EUR",
        returnURL: "https://example.com/return",
        pushURL: "https://example.com/push",
    }
);

export default buckaroo;
