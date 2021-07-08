const layout = require('../../layout');
const { getError } = require('../../helpers');

module.exports = ({ req, errors }) => {
  return layout({
    content: `
    <div>
      Your user id is: ${req.session.userId}
      <form method="POST">
        <input name="email" placeholder="Email" />
        ${getError(errors, 'email')}
        <input name="password" placeholder="Password" />
        ${getError(errors, 'password')}
        <input name="passwordConfirmation" placeholder="Password confirmation" />
        ${getError(errors, 'passwordConfirmation')}
        <button>Sign up</button>
      </form>
    </div>
    `,
  });
};
