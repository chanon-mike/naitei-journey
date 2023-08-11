import { GA_MEASUREMENT_ID } from './envValues';

export const pageview = (path: string) => {
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
  });
};
