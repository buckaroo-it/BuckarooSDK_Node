import * as https from "https";

export default class HttpClient {
  async call(options): Promise<any> {
    return new Promise(function (resolve, reject) {
      const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);
        console.log("headers: ", res.headers);
        let body = "";
        res.on("data", (chunk) => {
          process.stdout.write(chunk);
          try {
            body = JSON.parse(Buffer.concat([chunk]).toString());
          } catch (e) {
            reject(e);
          }
        });
        res.on("end", function () {
          resolve(body);
        });
      });
      req.on("error", (error) => {
        console.error(error, "error");
      });
      if(options.data){
        console.log(JSON.stringify(options.data),options.data.services)
        req.write(JSON.stringify(options.data));
      }
      req.end();
    });
  }
}
