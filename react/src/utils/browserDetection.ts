export const testIsIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
};

export const isPhone = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const isFacebookBrowser = (): boolean => {
  const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
  return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
};

export const isInstagramBrowser = (): boolean => {
  const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
  return (ua.indexOf("Instagram") > -1);
};

export const isSnapchatBrowser = (): boolean => {
  const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
  return (ua.indexOf("Snapchat") > -1);
};

export const isSocialBrowser = (): boolean => {
  return isFacebookBrowser() || isInstagramBrowser() || isSnapchatBrowser();
};

export const getSocialBrowserName = (): string => {
  if (isFacebookBrowser()) return 'Facebook';
  if (isInstagramBrowser()) return 'Instagram';  
  if (isSnapchatBrowser()) return 'Snapchat';
  return '';
};

export const isAndroid = (): boolean => {
  return isPhone() && !testIsIOS();
};

export const isIOS = (): boolean => {
  return testIsIOS();
}; 