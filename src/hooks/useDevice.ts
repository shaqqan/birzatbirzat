export const useDevice = () => {
  const isMobile = window.innerWidth < 1024;
  // const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
  const isDesktop = window.innerWidth >= 1024;
  return { isMobile, isDesktop };
};
