const request = require("supertest");
const app = require("./app");

describe("get toutube videos", () => {
  test("/search", (done) => {
    request(app)
      .get("/api/search")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        res.body.items.length > 0;
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
