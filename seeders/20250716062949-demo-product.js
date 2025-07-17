"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("product", [
      {
        id: "a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d",
        companyId: "d1e2f3a4-b5c6-4d8e-9f0a-b1c2d3e4f5a6", // Yara
        name: "NPK Fertilizer 20-20-20",
        price: 45.99,
        type: "solid",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        modifiedBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479", // Yara admin
      },
      {
        id: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
        companyId: "d1e2f3a4-b5c6-4d8e-9f0a-b1c2d3e4f5a6", // Yara
        name: "Liquid Nitrogen Solution",
        price: 32.5,
        type: "liquid",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        modifiedBy: "6ba7b810-9dad-11d1-80b4-00c04fd430c8", // Yara manager
      },
      {
        id: "e8f9a0b1-c2d3-4e5f-6a7b-8c9d0e1f2a3b",
        companyId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", // BASF
        name: "Phosphate Rock",
        price: 28.75,
        type: "solid",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        modifiedBy: "9b2d5e8f-3c4a-4b6d-8e9f-1a2b3c4d5e6f", // BASF admin
      },
      {
        id: "c4d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f",
        companyId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", // BASF
        name: "Chemical Solvent X1",
        price: 156.0,
        type: "liquid",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        modifiedBy: "9b2d5e8f-3c4a-4b6d-8e9f-1a2b3c4d5e6f", // BASF admin
      },
    ]);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("product", {
      id: [
        "a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d",
        "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
        "e8f9a0b1-c2d3-4e5f-6a7b-8c9d0e1f2a3b",
        "c4d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f",
      ],
    });
  },
};
