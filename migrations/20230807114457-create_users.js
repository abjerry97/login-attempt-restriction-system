'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      authKey: {
        type: Sequelize.STRING,
      },
      managerId: {
        field: 'manager_id',
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      lname: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.INTEGER,
      },
      dob: {
        type: Sequelize.INTEGER,
      },
      passwordHash: {
        type: Sequelize.STRING,
      },
      passwordResetToken: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      phone: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      pin: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      country: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      role: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      dateBannedUntil: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      avatar: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      idEMerchant: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      countryCode: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      idTimezone: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      streetName: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      streetNumber: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      postCode: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      city: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      optionalAddress: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      notifications: {
        type: Sequelize.INTEGER,
      },
      depositLimit: {
        type: Sequelize.INTEGER,
      },
      cid: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      idReferral: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      idMaster: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      hadReferralDiscount: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      language: {
        type: Sequelize.STRING,
      },
      timezoneApproved: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      visitToken: {
        field: 'visit_token',
        allowNull: true,
        type: Sequelize.STRING,
      },
      migrate: {
        type: Sequelize.INTEGER,
      },
      trxId: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      idReferralUser: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      fromWhere: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      resetPassword: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      commissionReferral: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      commissionAgent: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      type: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      emailVerified: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      phoneVerified: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      tokenVerify: {
        defaultValue: null,
        type: Sequelize.STRING,
      },
      createdAt: {
        field: 'created_at',
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: true,
        type: Sequelize.DATE,
      },
      deletedAt: {
        field: 'deleted_at',
        allowNull: true,
        type: Sequelize.DATE,
      },
      password: {
        type: Sequelize.STRING,
      },      
    })

    await queryInterface.addConstraint('User', {
      type: 'unique',
      fields: ['email', 'phone'],
      name: 'UNIQUE_USER_EMAIL_PHONE',
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
