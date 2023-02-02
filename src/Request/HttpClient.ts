import * as https from "https";

export default class HttpClient {
  async call(options): Promise<any> {
    // throw new Error("Not implemented");
    return new Promise(function () {
      const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);
        console.log("headers: ", res.headers);
        res.on("data", (d) => {
          process.stdout.write(d);
        });
      });
      req.on("error", (error) => {
        console.error(error, "error");
      });

      req.write(options.data);
      req.end();
    });

    // return new Promise(function (resolve, reject) {
    //   const req = https.request(options, (res) => {
    //     console.log(`statusCode: ${res.statusCode}`);
    //     console.log("headers: ", res.headers);
    //     let body = "";
    //     res.on("data", (chunk) => {
    //       process.stdout.write(chunk);
    //       try {
    //         body = JSON.parse(Buffer.concat([chunk]).toString());
    //       } catch (e) {
    //         reject(e);
    //       }
    //     });
    //     res.on("end", function () {
    //       resolve(body);
    //     });
    //   });
    //   req.on("error", (error) => {
    //     console.error(error, "error");
    //   });
    //
    //   req.write(options.data);
    //   req.end();
    // });
  }
}
