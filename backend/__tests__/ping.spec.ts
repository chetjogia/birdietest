import app from "../src/application";
import request from "supertest";
import db from "../db";

describe("Get Handler Test Suite", () => {
  afterAll(() => db.end());
  it("Get Distinct Users", async () => {
    const response = await request(app).get('/distinctusers')
    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual({success: true, payload: expect.any(Array)})
  });

  it("Get events by user ID", async () => {
    const response = await request(app).get('/events/df50cac5-293c-490d-a06c-ee26796f850d')
    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual({success: true, payload: expect.any(Array)})
  })

  it("Get Distinct Events by User ID", async () => {
    const response = await request(app).get('/distinctevents/df50cac5-293c-490d-a06c-ee26796f850d')
    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual({success: true, payload: expect.any(Array)})
  })

  it("Get Distinct care givers by User ID", async () => {
    const response = await request(app).get('/distinctcaregivers/df50cac5-293c-490d-a06c-ee26796f850d')
    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual({success: true, payload: expect.any(Array)})
  })

});
