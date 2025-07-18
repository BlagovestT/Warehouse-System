"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  up: async (queryInterface, _Sequelize) => {
    const existingRecords = await queryInterface.sequelize.query(
      "SELECT COUNT(*) as count FROM company",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (existingRecords[0].count > 0) {
      console.log("Business partners data already exists, skipping seed...");
      return;
    }

    await queryInterface.bulkInsert("company", [
      {
        id: "d1e2f3a4-b5c6-4d8e-9f0a-b1c2d3e4f5a6",
        name: "Yara",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        modifiedBy: null, // Yara admin
      },
      {
        id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        name: "BASF",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        modifiedBy: null, // BASF admin
      },
    ]);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("company", {
      id: [
        "d1e2f3a4-b5c6-4d8e-9f0a-b1c2d3e4f5a6",
        "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      ],
    });
  },
};
