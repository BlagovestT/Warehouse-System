"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  up: async (queryInterface, _Sequelize) => {
    const existingRecords = await queryInterface.sequelize.query(
      "SELECT COUNT(*) as count FROM warehouse",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (existingRecords[0].count > 0) {
      console.log("Business partners data already exists, skipping seed...");
      return;
    }

    await queryInterface.bulkInsert("warehouse", [
      {
        id: "c8d9e0f1-2a3b-4c5d-6e7f-8a9b0c1d2e3f",
        companyId: "d1e2f3a4-b5c6-4d8e-9f0a-b1c2d3e4f5a6", // Yara
        supportType: "solid",
        name: "Yara Main Warehouse",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        modifiedBy: "f47ac10b-58cc-4372-a567-0e02b2c3d479", // Yara admin
      },
      {
        id: "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a",
        companyId: "d1e2f3a4-b5c6-4d8e-9f0a-b1c2d3e4f5a6", // Yara
        supportType: "liquid",
        name: "Yara Liquid Storage",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        modifiedBy: "6ba7b810-9dad-11d1-80b4-00c04fd430c8", // Yara manager
      },
      {
        id: "f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c",
        companyId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", // BASF
        supportType: "mixed",
        name: "BASF Central Hub",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        modifiedBy: "9b2d5e8f-3c4a-4b6d-8e9f-1a2b3c4d5e6f", // BASF admin
      },
    ]);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("warehouse", {
      id: [
        "c8d9e0f1-2a3b-4c5d-6e7f-8a9b0c1d2e3f",
        "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a",
        "f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c",
      ],
    });
  },
};
