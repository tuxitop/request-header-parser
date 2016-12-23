/* jshint esversion:6 */
const supertest = require('supertest');
const app = require('../app.js');

describe("API response", () => {
    let request;
    beforeEach(() => {
        request = supertest(app)
            .get("/api/whoami")
            .set("User-Agent", "Mozilla/5.0 (Cool Tuxitop OS) AppleWebKit/537.36")
            .set("Accept-Language", "en-US,en;q=0.8");
    });

    it("returns a json", (done) => {
        request.expect("Content-Type", /json/).end(done);
    });

    it("return with 200 status code", (done) => {
        request.expect(200).end(done);
    });

    it("request has the correct keys", (done) => {
        request.expect((res) => {
            if (!res.body.hasOwnProperty("ipaddress")) {
                throw new Error("Expected to find the 'ipaddress' property");
            }
            if (!res.body.hasOwnProperty("language")) {
                throw new Error("Expected to find the 'language' property");
            }
            if (!res.body.hasOwnProperty("software")) {
                throw new Error("Expected to find the 'software' property");
            }
        }).end(done);
    });

    it("returns the correct language", (done) => {
        request.set("Accept-Language", "Tuxitop-lang,en;q=0.8")
            .expect((res) => {
                if (res.body.language !== "Tuxitop-lang") {
                    throw new Error("Expected to get Tuxitop-lang as the language");
                }
        }).end(done);
    });

    it("returns the correct software", (done) => {
        request.set("User-Agent", "Mozilla/5.0 (Cool Tuxitop OS) AppleWebKit/537.36")
            .expect((res) => {
                if (res.body.software !== "Cool Tuxitop OS") {
                    throw new Error("Expected to get 'Cool Tuxitop OS' as the software");
                }
        }).end(done);
    });

    it("returns 'Unknown' for an invalid user-agent string", (done) => {
        request.set("User-Agent", "Mozilla/5.0")
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res) => {
                if (res.body.software !== "Unknown") {
                    throw new Error("Expected to get 'Unknown' as the software. Found: " + res.body.software);
                }
        }).end(done);
    });
});
