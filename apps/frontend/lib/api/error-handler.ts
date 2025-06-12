export function mapSignupErrorCode(
  code: string,
  t: (key: string) => string,
): { field?: string; message: string } | null {
  switch (code) {
    case 'auth.emailAlreadyRegistered':
      return { field: 'email', message: t('auth.errorCodes.EMAIL_ALREADY_EXISTS') };
    case 'auth.weakPassword':
      return { field: 'password', message: t('auth.errorCodes.WEAK_PASSWORD') };
    default:
      return null;
  }
}
