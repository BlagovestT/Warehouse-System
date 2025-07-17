"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("user", [
      {
        id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        companyId: "d1e2f3a4-b5c6-4d8e-9f0a-b1c2d3e4f5a6", // Yara
        username: "admin",
        email: "admin@yara.com",
        password: "admin4o",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        companyId: "d1e2f3a4-b5c6-4d8e-9f0a-b1c2d3e4f5a6", // Yara
        username: "manager",
        email: "manager@yara.com",
        password: "yaraIsTheBest1",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: "9b2d5e8f-3c4a-4b6d-8e9f-1a2b3c4d5e6f",
        companyId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", // BASF
        username: "admin",
        email: "admin@basf.com",
        password: "admin123",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("user", {
      id: [
        "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        "9b2d5e8f-3c4a-4b6d-8e9f-1a2b3c4d5e6f",
      ],
    });
  },
};
