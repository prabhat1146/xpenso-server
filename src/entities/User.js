const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    mobile: {
      type: String,
      primary: true,
    },
    mobileOTP: {
      type: String,
      primary: false,
      nullable: true,
    },
    isMobileVerified: {
      type: Boolean,
      primary: false,
      default:false,
      nullable:false
    },
    firstName: {
      type: String,
      nullable: false,
    },
    middleName: {
      type: String,
      nullable: true,
    },
    lastName: {
      type: String,
      nullable: false,
    },
    email: {
      type: String,
      unique: true,
      nullable: false,
    },
    isEmailVerified: {
      type: Boolean,
      unique: false,
      nullable: false,
      default:false
    },
    passwordHash: {
      type: String,
      nullable: false,
    },
    status: {
      type: "enum",
      enum:['Active','Inactive'],
      nullable: false,
      default:"Active",
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
});
