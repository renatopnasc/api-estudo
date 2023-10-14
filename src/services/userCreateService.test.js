const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("UserCreateService", () => {
  let userRepository = null;
  let userCreateService = null;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepository);
  });

  test("user should be create", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123",
    };

    const userCreated = await userCreateService.execute(user);

    expect(userCreated).toHaveProperty("id");
  });

  test("user must not be created with an email already registered", async () => {
    const user1 = {
      name: "User Test 1",
      email: "user@email.com",
      password: "123",
    };

    const user2 = {
      name: "User Test 2",
      email: "user@email.com",
      password: "123",
    };

    await userCreateService.execute(user1);
    await expect(userCreateService.execute(user2)).rejects.toEqual(
      new AppError("E-mail already registered")
    );
  });
});
