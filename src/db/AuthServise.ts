const jwt = require('jsonwebtoken');

class AuthService {
  private generateToken(user) {
    const data =  {
      _id: user._id,
      name: user.name,
      email: user.email
    };
    const signature = process.env.JWTSECRET;
    const expiration = '1h';

    return jwt.sign({ data, }, signature, { expiresIn: expiration });
  }
}