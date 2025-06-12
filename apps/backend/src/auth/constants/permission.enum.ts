export enum Permission {
  // Queue & Visit
  QueueManage = 'QUEUE_MANAGE',
  QueueInputVitals = 'QUEUE_INPUT_VITALS',

  // Patient
  PatientManage = 'PATIENT_MANAGE',

  // Consultation
  ConsultationStart = 'CONSULTATION_START',

  // Orders & Billing
  OrderFinalize = 'ORDER_FINALIZE',
  BillingHandle = 'BILLING_HANDLE',

  // Medical Certificates (MC)
  McGenerate = 'MC_GENERATE',
  McTemplateCustomize = 'MC_TEMPLATE_CUSTOMIZE',

  // Templates
  ConsultationTemplateCustomize = 'CONSULTATION_TEMPLATE_CUSTOMIZE',
  PrescriptionTemplateCustomize = 'PRESCRIPTION_TEMPLATE_CUSTOMIZE',

  // Settings
  SettingsView = 'SETTINGS_VIEW',
  StaffManage = 'STAFF_MANAGE',
  GlobalSettingsAccess = 'GLOBAL_SETTINGS_ACCESS',

  // Reports
  ReportsView = 'REPORTS_VIEW',
  ReportIncome = 'REPORT_INCOME',
  ReportPatientDemographics = 'REPORT_PATIENT_DEMOGRAPHICS',
  ReportNewVsReturning = 'REPORT_NEW_VS_RETURNING',
  ReportServicesUsage = 'REPORT_SERVICES_USAGE',
  ReportDoctorActivity = 'REPORT_DOCTOR_ACTIVITY',
  ReportStaffActivity = 'REPORT_STAFF_ACTIVITY',
  ReportQueueActivity = 'REPORT_QUEUE_ACTIVITY',
  ReportDailySummary = 'REPORT_DAILY_SUMMARY',
  ReportActivityLogs = 'REPORT_ACTIVITY_LOGS',
  ReportPaymentBreakdown = 'REPORT_PAYMENT_BREAKDOWN',

  // Logs & Subscription
  ActivityLogsView = 'ACTIVITY_LOGS_VIEW',
  SubscriptionManage = 'SUBSCRIPTION_MANAGE',

  // Multi-branch
  BranchSupportAccess = 'BRANCH_SUPPORT_ACCESS',
}
