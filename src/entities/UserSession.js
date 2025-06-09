const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "UserSession",
  tableName: "user_sessions",
  columns: {
    sessionId: {
      type: "uuid",
      primary: true,
      generated: "uuid",
      name: "session_id",
    },
    mobile: {
      type: "varchar",
      length: 13,
      nullable: false,
    },
    accessToken: {
      type: "varchar",
      length: 512,
      nullable: false,
      unique: true,
      name: "access_token",
    },
    refreshToken: {
      type: "varchar",
      length: 512,
      nullable: true,
      name: "refresh_token",
    },
    deviceInfo: {
      type: "varchar",
      length: 255,
      nullable: true,
      name: "device_info",
    },
    ipAddress: {
      type: "varchar",
      length: 45,
      nullable: true,
      name: "ip_address",
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
      name: "created_at",
    },
    expiresAt: {
      type: "timestamp",
      nullable: false,
      name: "expires_at",
    },
    revokedAt: {
      type: "timestamp",
      nullable: true,
      name: "revoked_at",
    },
    revokedByIp: {
      type: "varchar",
      length: 45,
      nullable: true,
      name: "revoked_by_ip",
    },
    replacedByToken: {
      type: "varchar",
      length: 512,
      nullable: true,
      name: "replaced_by_token",
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
