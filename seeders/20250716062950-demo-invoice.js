"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("invoice", [
      {
        id: "b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e",
        companyId: "d1e2f3a4-b5c6-4d8e-9f0a-b1c2d3e4f5a6", // Yara
        orderId: "f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c", // Yara Order 1
        invoiceNumber: "INV-2025-001",
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        modifiedBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479", // Yara admin
      },
      {
        id: "e3f4a5b6-c7d8-4e9f-0a1b-2c3d4e5f6a7b",
        companyId: "d1e2f3a4-b5c6-4d8e-9f0a-b1c2d3e4f5a6", // Yara
        orderId: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d", // Yara Order 2
        invoiceNumber: "INV-2025-002",
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        modifiedBy: "6ba7b810-9dad-11d1-80b4-00c04fd430c8", // Yara manager
      },
      {
        id: "c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f",
        companyId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", // BASF
        orderId: "d7e8f9a0-b1c2-4d3e-4f5a-6b7c8d9e0f1a", // BASF Order
        invoiceNumber: "INV-2024-003",
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        modifiedBy: "9b2d5e8f-3c4a-4b6d-8e9f-1a2b3c4d5e6f", // BASF admin
      },
    ]);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("invoice", {
      id: [
        "b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e",
        "e3f4a5b6-c7d8-4e9f-0a1b-2c3d4e5f6a7b",
        "c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f",
      ],
    });
  },
};
