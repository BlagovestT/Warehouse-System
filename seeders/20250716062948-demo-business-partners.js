"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  up: async (queryInterface, _Sequelize) => {
    const existingRecords = await queryInterface.sequelize.query(
      "SELECT COUNT(*) as count FROM business_partners",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (existingRecords[0].count > 0) {
      console.log("Business partners data already exists, skipping seed...");
      return;
    }

    await queryInterface.bulkInsert("business_partners", [
      {
        id: "8f14e45f-ceea-467a-9a0d-e7ac2e9b4e12",
        companyId: "d1e2f3a4-b5c6-4d8e-9f0a-b1c2d3e4f5a6", // Yara
        name: "Nordic Fertilizer Co.",
        email: "contact@nordicfert.com",
        type: "customer",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        modifiedBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479", // Yara admin
      },
      {
        id: "b3c7d4e5-6f8a-4b9c-8d1e-2f3a4b5c6d7e",
        companyId: "d1e2f3a4-b5c6-4d8e-9f0a-b1c2d3e4f5a6", // Yara
        name: "Chemical Supply Group",
        email: "orders@chemsupply.com",
        type: "supplier",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        modifiedBy: "6ba7b810-9dad-11d1-80b4-00c04fd430c8", // Yara manager
      },
      {
        id: "e4f7a8b9-c2d3-4e5f-6a7b-8c9d0e1f2a3b",
        companyId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", // BASF
        name: "Agricultural Solutions Ltd",
        email: "info@agrisolutions.com",
        type: "customer",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        modifiedBy: "9b2d5e8f-3c4a-4b6d-8e9f-1a2b3c4d5e6f", // BASF admin
      },
    ]);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete("business_partners", {
      id: [
        "8f14e45f-ceea-467a-9a0d-e7ac2e9b4e12",
        "b3c7d4e5-6f8a-4b9c-8d1e-2f3a4b5c6d7e",
        "e4f7a8b9-c2d3-4e5f-6a7b-8c9d0e1f2a3b",
      ],
    });
  },
};
