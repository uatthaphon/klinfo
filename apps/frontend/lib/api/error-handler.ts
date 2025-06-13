export function mapAuthErrorCode(
  code: string,
  t: (key: string) => string,
): { field?: string; message: string } | null {
  switch (code) {
    case 'AUTH_EMAIL_ALREADY_REGISTERED':
      return {
        field: 'email',
        message: t('auth.errorCodes.AUTH_EMAIL_ALREADY_REGISTERED'),
      };
    case 'AUTH_WEAK_PASSWORD':
      return {
        field: 'password',
        message: t('auth.errorCodes.AUTH_WEAK_PASSWORD'),
      };
    case 'AUTH_USER_NOT_FOUND':
      return {
        field: 'email',
        message: t('auth.errorCodes.AUTH_USER_NOT_FOUND'),
      };
    case 'AUTH_INVALID_CREDENTIALS':
      return {
        field: 'password',
        message: t('auth.errorCodes.AUTH_INVALID_CREDENTIALS'),
      };
    default:
      return null;
  }
}

export const mapSignupErrorCode = mapAuthErrorCode;
export const mapLoginErrorCode = mapAuthErrorCode;
