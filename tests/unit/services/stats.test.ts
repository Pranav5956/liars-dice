import {
  describe,
  expect,
  test,
  afterEach,
  beforeAll,
  afterAll,
} from "@jest/globals";
import * as StatsService from "../../../src/services/stats";
import * as UserService from "../../../src/services/user";
import { connect, closeDatabase, clearDatabase } from "../../db.helper";

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

const userId = "1234";
const email = "user@example.com";
const displayName = "User";

describe("Creating new user", () => {
  test("should create corresponding stats object", async () => {
    const user = await UserService.createNewUser(userId, email, displayName);
    const stats = await StatsService.getStats(user._id);

    expect(stats).not.toEqual(null);
    expect(stats!.user).toEqual(user._id);
  });
});
