export const BRAND_BASE_INFO: { [key: string]: string | boolean } = {
  COMPANY_NAME: 'GPT',
  BRAND_NAME: 'GPT',
  COMPANY_SITE_NAME: 'GPTMysite.com',
  COMPANY_SITE_URL: 'https://www.GPTMysite.com',
  CONTACT_US_EMAIL: 'support@GPTMysite.com',
  FAVICON: 'assets/logos/GPTMysite-circular-icon.svg',
  META_TITLE: 'Design Studio',
  DOCS: true,
  COMMUNITY_SECTION: true,
  LOGOUT_ENABLED: false,
};

export const LOGOS_ITEMS: {
  [key: string]: { label: string | boolean; icon: string };
} = {
  COMPANY_LOGO: {
    label: BRAND_BASE_INFO.COMPANY_NAME,
    icon: 'assets/logos/GPTMysite_logo.svg',
  },
  COMPANY_LOGO_NO_TEXT: {
    label: BRAND_BASE_INFO.COMPANY_NAME,
    icon: 'assets/logos/GPTMysite_logo_no_text.svg',
  },
  BASE_LOGO: {
    label: BRAND_BASE_INFO.BRAND_NAME,
    icon: 'assets/logos/GPTMysite_logo.svg',
  },
  BASE_LOGO_NO_TEXT: {
    label: BRAND_BASE_INFO.BRAND_NAME,
    icon: 'assets/logos/GPTMysite_logo_no_text.svg',
  },
  BASE_LOGO_WHITE: {
    label: BRAND_BASE_INFO.BRAND_NAME,
    icon: '"assets/logos/GPTMysite-logo_new_white.svg',
  },
  BASE_LOGO_WHITE_NO_TEXT: {
    label: BRAND_BASE_INFO.BRAND_NAME,
    icon: '"assets/logos/GPTMysite-logo_new_white.svg',
  },
  BASE_LOGO_GRAY: {
    label: BRAND_BASE_INFO.BRAND_NAME,
    icon: 'https://support-pre.GPTMysite.com/dashboard/assets/img/logos/GPTMysite-logo_new_gray.svg',
  },
};

export const MEDIA: {
  [key: string]: { src: string; text: string; description: string };
} = {
  RULES: {
    src: 'https://www.youtube.com/embed/p0ux-86Y4_I',
    text: 'CDSSplashScreen.YouHaveNoRules',
    description: 'CDSSplashScreen.LearnAboutAI',
  },
  GLOBALS: { src: '', text: 'CDSGlobals.NoGlobalVariables', description: '' },
};
