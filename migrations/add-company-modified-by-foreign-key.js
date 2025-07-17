"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("company", {
      fields: ["modifiedBy"],
      type: "foreign key",
      name: "company_modifiedBy_fkey",
      references: {
        table: "user",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("company", "company_modifiedBy_fkey");
  },
};
