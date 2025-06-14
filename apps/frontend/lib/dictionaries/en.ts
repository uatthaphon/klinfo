export default {
  Dashboard: 'Dashboard',
  common: {
    clinics: 'Clinics',
    appName: 'Klinfo',
    terms: 'Terms',
    privacy: 'Privacy',
    contact: 'Contact',
    rightsReserved: '© 2023 Klinfo. All rights reserved.',
  },
  pricing: {
    choosePlan: 'Choose the right plan for you',
    monthly: 'Monthly',
    yearly: 'Yearly',
    save: 'Save 20%',
    clinicsTrust: '1K+ clinics trust us',
    cancelAnytime: 'Cancel any time, without any hassle',
    contactSales: 'Contact Sale',
    getPlan: 'Get {{plan}} Plan',
    infoLabel: '{{info}}',
    tooltipText: '{{tooltip}}',
    plan: {
      free: 'Free',
      standard: 'Standard',
      pro: 'Pro',
      premium: 'Premium',
    },
    info: {
      free: '20 patients / month',
      standard: 'Unlimited patients',
      pro: 'Everything in Standard',
      premium: 'Up to 3 branches',
    },
    tooltips: {
      free: 'Best for solo clinics just getting started',
      standard: 'Ideal for small clinics with a few staff',
      pro: 'Best for growing clinics that need more features',
      premium: 'Perfect for clinics with multiple branches. Additional branches may incur extra fees.',
    },
    perMonth: '/mo',
    features: {
      queueManagement: 'Queue management',
      patientList: 'Patient list',
      visitTracking: 'Visit tracking',
      orderFinalization: 'Order finalization by staff',
      billing: 'Billing and payment handling',
      mcGenerator: 'MC generator',
      followUp: 'Follow-up management',
      mcTemplates: 'MC templates',
      consultationTemplates: 'Consultation templates',
      prescriptionTemplates: 'Prescription templates',
      oneUser: '1 Owner + 1 Clinic Member (Doctor or Staff)',
      staff3: '1 Owner + up to 3 Clinic Members',
      unlimitedStaff: '1 Owner + Unlimited Clinic Members',
      secureLogin: 'Secure login access',
      roleAccess: 'Role-based access controls',
      insights: 'Reports & Insights',
      export: 'Report export (Excel / PDF)',
      multiBranch: 'Multi-branch',
      multiBranchLimit: 'Multi-branch (up to 3)',
    },
  },
  auth: {
    welcomeBack: 'Welcome back',
    loginToAccount: 'Login to your Klinfo account',
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    password: 'Password',
    forgotPassword: 'Forgot your password?',
    login: 'Login',
    noAccount: "Don't have an account?",
    signup: 'Sign up',
    agree: 'By clicking continue, you agree to our',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    and: 'and',
    resetPasswordTitle: 'Reset your password',
    resetPasswordDescription: "Enter your email address and we'll send you instructions to reset your password.",
    continue: 'Continue',
    backToLogin: 'Back to login',
    createAccount: 'Create an account',
    signupToAccount: 'Signup to your Klinfo account',
    name: 'Name',
    namePlaceholder: 'Enter your name',
    haveAccount: 'Already have an account?',
    confirmPassword: 'Confirm password',
    requiredField: 'This field is required.',
    invalidEmail: 'Invalid email address.',
    passwordTooShort: 'Password must be at least 6 characters.',
    passwordsDoNotMatch: 'Passwords do not match.',
    loading: 'Signing up...',
    errorCodes: {
      EMAIL_ALREADY_EXISTS: 'This email is already registered.',
      INVALID_CREDENTIALS: 'Incorrect email or password.',
      USER_NOT_FOUND: 'User not found.',
      WEAK_PASSWORD: 'Password is too weak.',
      AUTH_EMAIL_ALREADY_REGISTERED: 'This email is already registered.',
      AUTH_INVALID_CREDENTIALS: 'Incorrect email or password.',
      AUTH_USER_NOT_FOUND: 'User not found.',
      AUTH_WEAK_PASSWORD: 'Password is too weak.',
      AUTH_INVALID_TOKEN: 'Invalid token.',
      AUTH_RESET_EMAIL_SENT: 'Password reset email sent.',
      UNKNOWN: 'Something went wrong. Please try again.',
    },
  },
  user: {
    upgradePro: 'Upgrade to Pro',
    account: 'Account',
    billing: 'Billing',
    notifications: 'Notifications',
    logout: 'Log out',
  },
  onboarding: {
    accountCreated: 'Welcome, {{name}}! Your account has been created.',
    proceedToVerification: 'Proceed to Email Verification',
    proceedToDashboard: 'Proceed to Dashboard',
    verificationNotice:
      "We've sent a verification email to {{email}}. You can log in now, but please verify to use all features.",
    continueSetup: 'Continue Setup',
    verifyEmail: 'Please verify your email address to activate your account.',
    resendEmail: 'Resend email',
    resendEmailSuccess: 'Verification email sent.',
    resendEmailError: 'Could not send verification email.',
    goToLogin: 'Go to Login',
    firstTimeSetup: 'First-time setup',
    clinicName: 'Clinic name',
    timezone: 'Timezone',
    language: 'Language',
    inviteTeamOptional: 'Invite team (optional)',
    setupServicesOptional: 'Setup services/products (optional)',
    saveContinue: 'Save and continue',
    nextSteps: 'Next Steps',
    verifyEmailAddress: 'Verify your email address',
    completeClinicSetup: 'Complete your clinic setup',
    startAddingPatients: 'Start adding patients and queue',
    quickTip: 'Quick Tip',
    completeProfileTip:
      'Complete your profile and clinic settings to get the most out of Klinfo. You can always update these settings later.',
    setupDescription: "Let's set up your clinic profile to get you started quickly.",
    clinicDetails: 'Clinic Details',
    teamMembers: 'Clinic Members',
    services: 'Services',
    inviteTeamMembers: 'Invite a Clinic Member',
    inviteTeamDescription: 'You can invite 1 clinic member on the free plan. To invite more, please upgrade your plan.',
    singleMemberNotice: 'Your account will be the first member. You can invite more when you upgrade your plan.',
    addMember: 'Add Clinic Member',
    servicesTitle: 'Services & Treatments',
    servicesDescription: 'Add the services your clinic offers to patients.',
    price: '(฿) Price',
    addAnotherTeamMember: 'Add Another Clinic Member',
    addAnotherService: 'Add Another Service',
    finishSetup: 'Finish Setup',
    nextStep: 'Next Step',
    skipForNow: 'Skip for now',
    previousStep: 'Previous Step',
    address: 'Address',
    phone: 'Phone Number',
    city: 'City',
    state: 'State',
    zip: 'ZIP Code',
    role: 'Role',
    roleStaff: 'Staff',
    languageThai: 'Thai',
    languageEnglish: 'English',
    loading: 'Loading...',
    roles: {
      doctor: 'Doctor',
      staff: 'Staff',
    },
    timezones: {
      bangkok: 'Asia/Bangkok',
      singapore: 'Asia/Singapore',
      kualaLumpur: 'Asia/Kuala_Lumpur',
      jakarta: 'Asia/Jakarta',
    },
    verificationEmailSent: "We've sent a verification email to {{email}}.",
    verificationEmailNotReceived: "Didn't receive an email?",
    emailNotVerifiedBanner: 'Your email is not verified. Some actions are disabled until you verify it.',
    verifyBeforeClinic: 'Please verify your email first to create a clinic.',
    resendVerificationEmail: 'Resend Verification Email',
    cta: {
      title: 'Welcome to Klinfo!',
      description:
        "You haven't created or joined any clinic yet. Let's get you started with setting up your first clinic.",
      managePatientsTitle: 'Manage Patients',
      managePatientsDesc: 'Keep track of patient records and history',
      queueManagementTitle: 'Queue management',
      queueManagementDesc: "Organize your clinic's daily queue",
      handleBillingTitle: 'Handle Billing',
      handleBillingDesc: 'Generate receipts and track payments',
      createClinic: 'Create Your Clinic',
      needHelp: 'Need help?',
      contactSupport: 'Contact our support team',
      welcome: 'Welcome to Klinfo!',
      joinClinic: 'Join Existing Clinic',
      viewPricing: 'View Pricing',
      faqLink: 'Check our FAQ',
    },
  },
  joinClinicPage: {
    title: 'Join an Existing Clinic',
    description: 'Ask a clinic owner to invite you using your email. Once invited, the clinic will appear here.',
    backToDashboard: 'Back to Dashboard',
  },
} as const;
