 
const { Model, QueryTypes, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const SequelizeAttributes = require("../src/utils/SequelizeAttributes");
const { USER_STATUS, USER_TYPE } = require("../src/constants/ConstUser");
const { SETTING } = require("../src/constants/ConstSetting");
const { getUniqueCodev2 } = require("../src/helpers/Common");
const db = require("./_instance");

class User extends Model {
  id;

  authKey;

  managerId;

  name;

  lname;

  gender;

  dob;

  passwordHash;

  passwordResetToken;

  email;

  phone;

  pin;

  country;

  status;

  title;

  role;

  dateBannedUntil;

  avatar;

  idEMerchant;

  countryCode;

  idTimezone;

  streetName;

  streetNumber;

  postCode;

  city;

  optionalAddress;

  notifications;

  depositLimit;

  cid;

  idReferral;

  idMaster;

  hadReferralDiscount;

  language;

  timezoneApproved;

  visitToken;

  migrate;

  trxId;

  idReferralUser;

  fromWhere;

  resetPassword;

  commissionReferral;

  commissionAgent;

  type;

  emailVerified;

  phoneVerified;

  tokenVerify;

  createdAt;

  updatedAt;

  deletedAt;

  password;

  phoneWithCode;

  timezone;

  bonusDeposit;

  transactions;

  agentTransactions;

  agentName;

  soldTicketCount;

  soldTicketAmount;

  fullName;

  comparePassword = (candidatePassword) => {
    let tempPassword = this.getDataValue("passwordHash");
    return new Promise((resolve, reject) => {
      if (!tempPassword) resolve(false);

      tempPassword = tempPassword.replace("$2y$", "$2b$");
      bcrypt.compare(candidatePassword, tempPassword, function (err, isMatch) {
        if (err) reject(err);
        resolve(isMatch);
      });
    });
  };

  getIdFavoriteGame = async () => {
    return 0;
  };

  generatePasswordResetToken = () => {
    const timestamp = Math.floor(Date.now() / 1000);
    this.passwordResetToken = getUniqueCodev2() + "_" + timestamp.toString();

    return this.passwordResetToken;
  };

  removePasswordResetToken = () => {
    this.passwordResetToken = null;
  };

  generateIdReferral = async () => {
    const lastUser = await User.findOne({
      order: [["id", "DESC"]],
      limit: 1,
    });

    if (lastUser && lastUser.id)
      this.idReferral = (100888 + lastUser.id + 1).toString();

    this.idReferral = (100888 + 1).toString();

    return this.idReferral;
  };

  static findByEmail = async (email, status = USER_STATUS.STATUS_ACTIVE) => {
    const user = await User.findOne({
      where: {
        email: email,
        status: status,
      },
    });
    return user;
  };

  static findByEmailWithPassword = async (
    email,
    status = USER_STATUS.STATUS_ACTIVE
  ) => {
    const user = await User.scope("withPassword").findOne({
      where: { email: email, status: status },
      paranoid: false,
    });
    return user;
  };

  static findByAgentId = async (
    idAgent,
    status = USER_STATUS.STATUS_ACTIVE
  ) => {
    const agent = await User.findOne({
      where: {
        id: idAgent,
        type: USER_TYPE.TYPE_AGENT,
        status: status,
      },
    });

    return agent;
  };

  static findByPhoneWithCode = async (
    phoneWithCode,
    status = USER_STATUS.STATUS_ACTIVE
  ) => {
    if (!phoneWithCode.trim().startsWith("+"))
      phoneWithCode = "+".concat(phoneWithCode);

    const users = await db.sequelize.query(
      'SELECT * FROM user WHERE status = $1 AND CONCAT(countryCode, "", phone) = $2',
      {
        bind: [USER_STATUS.STATUS_ACTIVE, phoneWithCode],
        type: QueryTypes.SELECT,
        model: User,
        mapToModel: true,
      }
    );

    if (!users || users.length <= 0) return null;

    return users[0];
  };

  static isPasswordResetTokenValid = (token) => {
    if (!token) return false;

    const expire = SETTING.passwordResetTokenExpire;
    const parts = token.split("_");
    if (!parts || parts.length === 0) return false;

    const lastPart = parts[parts.length - 1];
    if (!lastPart) return false;

    const timestamp = parseInt(lastPart.toString(), 10);
    if (Number.isNaN(timestamp)) return false;

    return timestamp + expire >= Math.floor(Date.now() / 1000);
  };

  static findByPasswordResetToken = async (token) => {
    if (!User.isPasswordResetTokenValid(token)) return null;

    const user = await User.scope("withPassword").findOne({
      where: {
        passwordResetToken: token,
        status: USER_STATUS.STATUS_ACTIVE,
      },
    });

    return user;
  };
}

User.init(
  {
    ...SequelizeAttributes.User,
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        let full = "";
        if (this.name) full = full.concat(this.name);

        if (this.lname) full = full.concat(this.lname);

        return full;
      },
    },
    phoneWithCode: {
      type: DataTypes.VIRTUAL,
      get() {
        if (this.countryCode && this.phone)
          return this.countryCode.toString().concat(this.phone);

        return null;
      },
    },
  },
  {
    sequelize: db.sequelize,
    paranoid: true,
    defaultScope: {
      attributes: {
        exclude: [
          "password",
          "passwordHash",
          "tokenVerify",
          "authKey",
          "visitToken",
        ],
      },
    },
    scopes: {
      withPassword: {
        attributes: {
          exclude: ["password", "tokenVerify", "authKey"],
        },
      },
    },
    tableName: "user",
  }
);

module.exports= User;
