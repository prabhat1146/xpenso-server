const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Mode",
  tableName: "modes",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,  // auto-increment
    },
    name: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    icon: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    color: {
      type: "varchar",
      length: 50,
      nullable: true,
    },
  },
});
