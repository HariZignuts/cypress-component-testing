import { faker } from "@faker-js/faker";
import type { User } from "../../../src/types/user";

export function createUser(overrides: Partial<User> = {}): User {
  return {
    id: faker.number.int(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    ...overrides,
  };
}

export function createUsers(count = 3): User[] {
  return Array.from({ length: count }, () => createUser());
}
