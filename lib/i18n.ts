// Language configuration for AgriSathi
// Extensible structure to support multiple languages

export type Language = 'en' | 'hi';

export const LANGUAGES = {
  en: { name: 'English', nativeName: 'English' },
  hi: { name: 'Hindi', nativeName: 'हिंदी' },
};

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      posts: 'Posts',
      marketplace: 'Marketplace',
      weather: 'Weather',
      communities: 'Communities',
      expertTalk: 'Expert Talk',
      schemes: 'Schemes',
      workers: 'Workers',
      myProducts: 'My Products',
      settings: 'Settings',
      help: 'Help',
      dashboard: 'Dashboard',
      government: 'Government',
      weatherAlerts: 'Weather Alerts',
      farmers: 'Farmers',
      rentalTool: 'Rental Tool',
      crops: 'Crops',
      marketplace: 'MarketPlace',
      signOut: 'Sign Out',
    },
    // Posts
    posts: {
      createPost: 'Create Post',
      postText: 'What\'s on your mind?',
      selectType: 'Select Post Type',
      general: 'General Share',
      selling: 'Selling Crop/Animal',
      question: 'Ask Question',
      farmingTips: 'Farming Tips',
      uploadImage: 'Upload Image',
      uploadVideo: 'Upload Video',
      share: 'Share Post',
      cancel: 'Cancel',
      like: 'Like',
      likes: 'Likes',
      comment: 'Comment',
      comments: 'Comments',
      share: 'Share',
      follow: 'Follow',
      following: 'Following',
      explorePeople: 'Explore more people',
    },
    // Settings
    settings: {
      account: 'Account',
      notifications: 'Notifications',
      privacy: 'Privacy & Safety',
      language: 'Language',
      theme: 'Theme',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      selectLanguage: 'Select Language',
    },
    // Common
    common: {
      loading: 'Loading...',
      error: 'Something went wrong',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      search: 'Search',
    },
  },
  hi: {
    // Navigation
    nav: {
      home: 'होम',
      posts: 'पोस्ट',
      marketplace: 'बाजार',
      weather: 'मौसम',
      communities: 'समुदाय',
      expertTalk: 'विशेषज्ञ परामर्श',
      schemes: 'योजनाएं',
      workers: 'कार्यकर्ता',
      myProducts: 'मेरे उत्पाद',
      settings: 'सेटिंग्स',
      help: 'मदद',
      dashboard: 'डैशबोर्ड',
      government: 'सरकारी',
      weatherAlerts: 'मौसम सतर्कता',
      farmers: 'किसान',
      rentalTool: 'किराये का उपकरण',
      crops: 'फसलें',
      marketplace: 'बाजार',
      signOut: 'लॉग आउट',
    },
    // Posts
    posts: {
      createPost: 'पोस्ट बनाएं',
      postText: 'आपके मन में क्या है?',
      selectType: 'पोस्ट प्रकार चुनें',
      general: 'सामान्य साझा करना',
      selling: 'फसल/जानवर बेचना',
      question: 'प्रश्न पूछें',
      farmingTips: 'कृषि सुझाव',
      uploadImage: 'इमेज अपलोड करें',
      uploadVideo: 'वीडियो अपलोड करें',
      share: 'पोस्ट साझा करें',
      cancel: 'रद्द करें',
      like: 'पसंद',
      likes: 'पसंद',
      comment: 'टिप्पणी',
      comments: 'टिप्पणियां',
      share: 'साझा करें',
      follow: 'फॉलो करें',
      following: 'फॉलो कर रहे हैं',
      explorePeople: 'और लोगों को खोजें',
    },
    // Settings
    settings: {
      account: 'खाता',
      notifications: 'सूचनाएं',
      privacy: 'गोपनीयता और सुरक्षा',
      language: 'भाषा',
      theme: 'थीम',
      lightMode: 'लाइट मोड',
      darkMode: 'डार्क मोड',
      selectLanguage: 'भाषा चुनें',
    },
    // Common
    common: {
      loading: 'लोड हो रहा है...',
      error: 'कुछ गलत हुआ',
      success: 'सफल',
      cancel: 'रद्द करें',
      save: 'सहेजें',
      delete: 'हटाएं',
      edit: 'संपादित करें',
      search: 'खोजें',
    },
  },
};

export const getTranslation = (lang: Language, key: string): string => {
  const keys = key.split('.');
  let value: any = translations[lang];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
};
