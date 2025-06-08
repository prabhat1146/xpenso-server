const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Transaction",
  tableName: "transactions",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    mobile: {
      type: "varchar",
      length: 20,
      nullable: false,
    },
    categoryId: {
      type: "int",
      nullable: true,
      name: "category_id",
    },
    modeId: {
      type: "int",
      nullable: true,
      name: "mode_id",
    },
    amount: {
      type: "numeric",
      precision: 12,
      scale: 2,
      nullable: false,
    },
    note: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    transactionDate: {
      type: "date",
      nullable: false,
      name: "transaction_date",
    },
    isDeleted: {
      type: "boolean",
      default: false,
      name: "is_deleted",
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
      name: "created_at",
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
      name: "updated_at",
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: {
        name: "mobile",
        referencedColumnName: "mobile",
      },
      onDelete: "CASCADE",
    },
    category: {
      type: "many-to-one",
      target: "Category",
      joinColumn: {
        name: "category_id",
        referencedColumnName: "id",
      },
      onDelete: "SET NULL",
    },
    mode: {
      type: "many-to-one",
      target: "Mode",
      joinColumn: {
        name: "mode_id",
        referencedColumnName: "id",
      },
      onDelete: "SET NULL",
    },
  },
});
