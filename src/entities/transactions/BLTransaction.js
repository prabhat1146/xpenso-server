const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "BLTransaction",
  tableName: "bl_transactions",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    amount: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: false,
    },
    currency: {
      type: "varchar",
      length: 10,
      default: "INR",
    },
    status: {
      type: "enum",
      enum: ["pending", "active", "completed", "cancelled"],
      default: "pending",
    },
    remarks: {
      type: "text",
      nullable: true,
    },
    createdAt: {
      type: "timestamp",
      precision: 3, // milliseconds
      default: () => "CURRENT_TIMESTAMP(3)",
      createDate: true,
      name: "created_at",
    },
    updatedAt: {
      type: "timestamp",
      precision: 3,
      default: () => "CURRENT_TIMESTAMP(3)",
      onUpdate: "CURRENT_TIMESTAMP(3)",
      updateDate: true,
      name: "updated_at",
    },
  },
  relations: {
    borrower: {
      type: "many-to-one",
      target: "User",
      eager: true,
      joinColumn: {
        name: "borrower_id",
      },
      onDelete: "CASCADE",
    },
    lender: {
      type: "many-to-one",
      target: "User",
      eager: true,
      joinColumn: {
        name: "lender_id",
      },
      onDelete: "CASCADE",
    },
    approvals: {
      type: "one-to-many",
      target: "BLApproval",
      inverseSide: "transaction",
      cascade: true,
    },
  },
});
