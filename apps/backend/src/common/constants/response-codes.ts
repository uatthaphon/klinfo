import { HttpStatus } from '@nestjs/common';
export const ResponseMeta = {
  Auth: {
    EmailAlreadyRegistered: {
      code: 'auth.emailAlreadyRegistered',
      message: 'Email is already registered',
      statusCode: HttpStatus.BAD_REQUEST,
    },
    SignupSuccess: {
      code: 'auth.signup.success',
      message: 'Signed up successfully',
      statusCode: HttpStatus.CREATED,
    },
    LoginSuccess: {
      code: 'auth.login.success',
      message: 'Logged in successfully',
      statusCode: HttpStatus.OK,
    },
    InvalidCredentials: {
      code: 'auth.invalidCredentials',
      message: 'Invalid credentials',
      statusCode: HttpStatus.UNAUTHORIZED,
    },
    PasswordResetSuccess: {
      code: 'auth.passwordReset.success',
      message: 'Password has been reset',
      statusCode: HttpStatus.OK,
    },
    InvalidResetToken: {
      code: 'auth.invalidToken',
      message: 'Invalid email or token',
      statusCode: HttpStatus.UNAUTHORIZED,
    },
  },
};
