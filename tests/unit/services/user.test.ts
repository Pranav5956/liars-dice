import {
  describe,
  expect,
  test,
  afterEach,
  beforeAll,
  afterAll,
} from "@jest/globals";
import * as UserService from "../../../src/services/user";
import { connect, closeDatabase, clearDatabase } from "../../db.helper";

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

const userId = "1234";
const email = "user@example.com";
const displayName = "User";

const altUserId = "123456";
const altEmail = "otheruser@example.com";
const altDisplayName = "Other user";

describe("Creating new user", () => {
  test("should resolve with user object", async () => {
    const user = await UserService.createNewUser(userId, email, displayName);

    expect(user.userId).toEqual(userId);
    expect(user.displayName).toEqual(displayName);
    expect(user.email).toEqual(email);
  });

  test("should reject on same user id", async () => {
    await UserService.createNewUser(userId, email, displayName);
    await expect(
      UserService.createNewUser(userId, altEmail, altDisplayName)
    ).rejects.toThrow();
  });

  test("should reject on same email id", async () => {
    await UserService.createNewUser(userId, email, displayName);
    await expect(
      UserService.createNewUser(altUserId, email, altDisplayName)
    ).rejects.toThrow();
  });

  test("should reject on same display name", async () => {
    await UserService.createNewUser(userId, email, displayName);
    await expect(
      UserService.createNewUser(altUserId, altEmail, displayName)
    ).rejects.toThrow();
  });
});

describe("Finding user", () => {
  test("should resolve to user with existing user id", async () => {
    await UserService.createNewUser(userId, email, displayName);
    const user = await UserService.getUser(userId);
    expect(user).not.toEqual(null);
  });

  test("should resolve to null with non-existing user id", async () => {
    await UserService.createNewUser(userId, email, displayName);
    const user = await UserService.getUser(altUserId);
    expect(user).toEqual(null);
  });
});

describe("Updating user", () => {
  test("should resolve with updated user", async () => {
    await UserService.createNewUser(userId, email, displayName);
    const user = await UserService.updateUser(userId, { email: altEmail });
    expect(user).not.toEqual(null);
    expect(user!.email).not.toEqual(email);
    expect(user!.email).toEqual(altEmail);
  });

  test("should reject on updating to duplicate display name", async () => {
    await UserService.createNewUser(userId, email, displayName);
    await UserService.createNewUser(altUserId, altEmail, altDisplayName);
    await expect(
      UserService.updateUser(userId, {
        displayName: altDisplayName,
      })
    ).rejects.toThrow();
  });

  test("should reject on updating to duplicate email", async () => {
    await UserService.createNewUser(userId, email, displayName);
    await UserService.createNewUser(altUserId, altEmail, altDisplayName);
    await expect(
      UserService.updateUser(userId, { email: altEmail })
    ).rejects.toThrow();
  });
});
