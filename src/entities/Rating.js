const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Rating",
  tableName: "ratings",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    score: {
      type: "int",
      nullable: false,
    },
    comment: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    userMobile: {
      type: "varchar",
      nullable: false,
      unique: true,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User", // must match the name in your User entity
      joinColumn: {
        name: "userMobile", // this will be the column name in this table
        referencedColumnName: "mobile", // this matches the primary key in User
      },
      eager: false, // optional: set to true if you want to always fetch user
      nullable: false,
    },
  },
});
