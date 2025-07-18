"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  up: async (queryInterface, _Sequelize) => {
    const existingRecords = await queryInterface.sequelize.query(
      "SELECT COUNT(*) as count FROM order",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (existingRecords[0].count > 0) {
      console.log("Business partners data already exists, skipping seed...");
      return;
    }

    await queryInterface.bulkInsert("order", [
      {
        id: "f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c",
        companyId: "d1e2f3a4-b5c6-4d8e-9f0a-b1c2d3e4f5a6", // Yara
        warehouseId: "c8d9e0f1-2a3b-4c5d-6e7f-8a9b0c1d2e3f", // Yara Main Warehouse
        businessPartnerId: "8f14e45f-ceea-467a-9a0d-e7ac2e9b4e12", // Nordic Fertilizer Co.
        orderNumber: "ORD-2024-001",
        type: "shipment",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        modifiedBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479", // Yara admin
      },
      {
        id: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
        companyId: "d1e2f3a4-b5c6-4d8e-9f0a-b1c2d3e4f5a6", // Yara
        warehouseId: "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a", // Yara Liquid Storage
        businessPartnerId: "b3c7d4e5-6f8a-4b9c-8d1e-2f3a4b5c6d7e", // Chemical Supply Group
        orderNumber: "ORD-2024-002",
        type: "delivery",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        modifiedBy: "6ba7b810-9dad-11d1-80b4-00c04fd430c8", // Yara manager
      },
      {
        id: "d7e8f9a0-b1c2-4d3e-4f5a-6b7c8d9e0f1a",
        companyId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", // BASF
        warehouseId: "f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c", // BASF Central Hub
        businessPartnerId: "e4f7a8b9-c2d3-4e5f-6a7b-8c9d0e1f2a3b", // Agricultural Solutions Ltd
        orderNumber: "ORD-2024-003",
        type: "shipment",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        modifiedBy: "9b2d5e8f-3c4a-4b6d-8e9f-1a2b3c4d5e6f", // BASF admin
      },
    ]);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("order", {
      id: [
        "f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c",
        "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
        "d7e8f9a0-b1c2-4d3e-4f5a-6b7c8d9e0f1a",
      ],
    });
  },
};
