const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "BLApproval",
  tableName: "bl_approvals",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    requestedAt: {
      type: "timestamp",
      createDate: true,
      name: "requested_at",
    },
    changes: {
      type: "json",
      nullable: false,
      
    },

    status: {
      type: "enum",
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    reviewedAt: {
      type: "timestamp",
      nullable: true,
      name: "reviewed_at",
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      eager: true,
      joinColumn: {
        name: "user_id",
      },
      onDelete: "CASCADE",
    },
    requestedBy: {
      type: "many-to-one",
      target: "User",
      eager: true,
      joinColumn: {
        name: "requested_by_id",
      },
      onDelete: "CASCADE",
    },
    reviewedBy: {
      type: "many-to-one",
      target: "User",
      nullable: true,
      eager: true,
      joinColumn: {
        name: "reviewed_by_id",
      },
      onDelete: "SET NULL",
    },
    transaction: {
      type: "many-to-one",
      target: "BLTransaction",
      joinColumn: {
        name: "transaction_id",
      },
      onDelete: "CASCADE",
    },
  },
});
