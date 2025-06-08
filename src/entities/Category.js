const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Category",
  tableName: "categories",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    mobile: {
      type: "varchar",
      length: 20,
      nullable: true,
    },
    name: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    type: {
      type: "enum",
      enum: ["income", "expense", "transfer"],
      nullable: false,
    },
    icon: {
      type: "varchar",
      length: 255,
      nullable: true,
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
    isDeleted: {
      type: "boolean",
      default: false,
      name: "is_deleted",
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
  },
});
