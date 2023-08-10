module.exports.USER_ROLE = {
    ROLE_USER: 10,
    ROLE_ADMIN: 20,
  };
  
  module.exports.USER_FROM_WHERE = {
    FROM_WEBSITE: 0,
    FROM_MOBILE: 1,
    FROM_AGENT: 2,
    FROM_ADMIN: 3,
  };
  
  module.exports.USER_TYPE = {
    TYPE_USER: 10,
    TYPE_REFERRAL: 20,
    TYPE_AGENT: 30,
    TYPE_INFLUENCE: 40,
  };
  
  module.exports.USER_STATUS = {
    STATUS_DELETED: 0,
    STATUS_ACTIVE: 10,
    STATUS_BANNED: 20,
    STATUS_SELF_EXCLUSION: 30,
  };
  
  module.exports.USER_GENDER = {
    GENDER_MALE: 10,
    GENDER_FEMALE: 20,
  };
  
  module.exports.USER_NOTIFICATIONS = {
    NOTIFICATIONS_ALL: 0,
    NOTIFICATIONS_SOME: 1,
  };
  
  module.exports.USER_TIMEZONE = {
    TIMEZONE_APPROVED: 10,
    TIMEZONE_DISAPPROVED: 20,
    TIMEZONE_UNCHECKED: 0,
  };
  
  module.exports.USER_DEFAULT_ATTRIBUTES = {
    TIMEZONE_DEFAULT: 'W. Central Africa Standard Time',
    LANGUAGE_DEFAULT: 'en',
    COUNTRY_DEFAULT: 'NG',
    COUNTRY_CODE_DEFAULT: '+234',
    PASSWORD_DEFAULT: 'migrate!user',
    DOB_DEFAULT: '01/01/1980',
    EMAIL_DEFAULT: '',
    VERIFY_PHONE: 'phone',
    VERIFY_EMAIL: 'email',
  };
  