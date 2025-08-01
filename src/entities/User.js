const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      type: "int", // ✅ Use string "int", not Number
      primary: true,
      nullable:false,
      unique:true,
      generated: true,
      
    },
    mobile: {
      type: String,
      unique: true,
      nullable: true,
      primary:false
    },
    mobileOTP: {
      type: String,
      nullable: true,
    },
    mobileOTPGeneratedAt: {
      type: String,
      nullable: true,
    },
    mobileOTPExpiresAt: {
      type: String,
      nullable: true,
    },
    isMobileVerified: {
      type: Boolean,
      default: false,
      nullable: false,
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
      nullable: true,
    },
    emailOTP: {
      type: String,
      nullable: true,
    },
    emailOTPGeneratedAt: {
      type: String,
      nullable: true,
    },
    emailOTPExpiresAt: {
      type: String,
      nullable: true,
    },
     
    isEmailVerified: {
      type: Boolean,
      default: false,
      nullable: false,
    },
    passwordHash: {
      type: String,
      nullable: false,
    },
    status: {
      type: "enum",
      enum: ["Active", "Inactive"],
      default: "Active",
      nullable: false,
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
