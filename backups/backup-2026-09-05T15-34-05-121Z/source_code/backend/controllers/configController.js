const { SUPPORT_PHONE } = require('../config/constants');

exports.get = (req, res) => {
  res.json({
    supportPhone: SUPPORT_PHONE,
    appName: 'Bharat Darshan',
    problemStatement: 'SIH 26197',
  });
};
