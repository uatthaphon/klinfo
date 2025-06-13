import { HttpStatus } from '@nestjs/common';
export const ResponseMeta = {
  Auth: {
    EmailAlreadyRegistered: {
      code: 'AUTH_EMAIL_ALREADY_REGISTERED',
      message: 'Email is already registered',
      statusCode: HttpStatus.BAD_REQUEST,
    },
    SignupSuccess: {
      code: 'AUTH_SIGNUP_SUCCESS',
      message: 'Signed up successfully',
      statusCode: HttpStatus.CREATED,
    },
    LoginSuccess: {
      code: 'AUTH_LOGIN_SUCCESS',
      message: 'Logged in successfully',
      statusCode: HttpStatus.OK,
    },
    InvalidCredentials: {
      code: 'AUTH_INVALID_CREDENTIALS',
      message: 'Invalid credentials',
      statusCode: HttpStatus.UNAUTHORIZED,
    },
    PasswordResetSuccess: {
      code: 'AUTH_PASSWORD_RESET_SUCCESS',
      message: 'Password has been reset',
      statusCode: HttpStatus.OK,
    },
    ResetEmailSent: {
      code: 'AUTH_RESET_EMAIL_SENT',
      message: 'Password reset email sent',
      statusCode: HttpStatus.OK,
    },
    UserNotFound: {
      code: 'AUTH_USER_NOT_FOUND',
      message: 'User not found',
      statusCode: HttpStatus.BAD_REQUEST,
    },
    InvalidResetToken: {
      code: 'AUTH_INVALID_TOKEN',
      message: 'Invalid email or token',
      statusCode: HttpStatus.UNAUTHORIZED,
    },
  },
};
