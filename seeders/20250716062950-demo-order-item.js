"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("order_item", [
      {
        id: "f0a1b2c3-d4e5-4f6a-7b8c-9d0e1f2a3b4c",
        orderId: "f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c", // Yara Order 1
        productId: "a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d", // NPK Fertilizer
        quantity: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        modifiedBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479", // Yara admin
      },
      {
        id: "a5b6c7d8-e9f0-4a1b-2c3d-4e5f6a7b8c9d",
        orderId: "f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c", // Yara Order 1
        productId: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e", // Liquid Nitrogen
        quantity: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        modifiedBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479", // Yara admin
      },
      {
        id: "d0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a",
        orderId: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d", // Yara Order 2
        productId: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e", // Liquid Nitrogen
        quantity: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        modifiedBy: "6ba7b810-9dad-11d1-80b4-00c04fd430c8", // Yara manager
      },
      {
        id: "b7c8d9e0-f1a2-4b3c-4d5e-6f7a8b9c0d1e",
        orderId: "d7e8f9a0-b1c2-4d3e-4f5a-6b7c8d9e0f1a", // BASF Order
        productId: "e8f9a0b1-c2d3-4e5f-6a7b-8c9d0e1f2a3b", // Phosphate Rock
        quantity: 75,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        modifiedBy: "9b2d5e8f-3c4a-4b6d-8e9f-1a2b3c4d5e6f", // BASF admin
      },
      {
        id: "e2f3a4b5-c6d7-4e8f-9a0b-1c2d3e4f5a6b",
        orderId: "d7e8f9a0-b1c2-4d3e-4f5a-6b7c8d9e0f1a", // BASF Order
        productId: "c4d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f", // Chemical Solvent
        quantity: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        modifiedBy: "9b2d5e8f-3c4a-4b6d-8e9f-1a2b3c4d5e6f", // BASF admin
      },
    ]);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("order_item", {
      id: [
        "f0a1b2c3-d4e5-4f6a-7b8c-9d0e1f2a3b4c",
        "a5b6c7d8-e9f0-4a1b-2c3d-4e5f6a7b8c9d",
        "d0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a",
        "b7c8d9e0-f1a2-4b3c-4d5e-6f7a8b9c0d1e",
        "e2f3a4b5-c6d7-4e8f-9a0b-1c2d3e4f5a6b",
      ],
    });
  },
};
