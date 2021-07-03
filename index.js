const express = require('express');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cookieSession({
    keys: ['lasgfosahf'],
  })
);

app.get('/signup', (req, res) => {
  console.log(req.body);
  res.send(`
  <div>
    Your user id is: ${req.session.userId}
    <form method="POST">
      <input name="email" placeholder="Email" />
      <input name="password" placeholder="Password" />
      <input name="passwordConfirmation" placeholder="Password confirmation" />
      <button>Sign up</button>
    </form>
  </div>
  `);
});

app.post('/signup', async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send('Email in use');
  }

  if (password != passwordConfirmation) {
    return res.send('Passwords must match');
  }

  const user = await usersRepo.create({ email, password });

  // Store the user id inside the users cookie
  req.session.userId = user.id;

  res.send('account created');
});

app.get('/signout', (req, res) => {
  req.session = null;
  res.send('You are logged out');
});

app.get('signin', (req, res) => {
  res.send(`
  <div>
    <form method="POST">
      <input name="email" placeholder="Email" />
      <input name="password" placeholder="Password" />
      <button>Sign in</button>
    </form>
  </div>
  `);
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  const user = usersRepo.getOneBy({ email });

  if (!user) {
    return res.send('Email not found');
  }

  if (user.password !== password) {
    return res.send('Invalid password');
  }

  // This is what makes the user authenticated
  req.session.userId = user.id;

  res.send('You are signed in');
});

app.listen(3000, () => {
  console.log('listening');
});
