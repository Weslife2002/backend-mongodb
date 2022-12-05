/* eslint-disable import/extensions */
import mannageAccountSessions from '../utils/manageAccountSessions.js';

const passportController = {
  handleSession: (req, res) => {
    const { email } = req.session.passport.user;
    req.session.user = { email };
    delete req.session.passport;
    mannageAccountSessions(req);
    res.status(200).send({
      message: 'Successful authentication!',
      data: {
        user: req.session.user,
      },
    });
  },
};

export default passportController;
