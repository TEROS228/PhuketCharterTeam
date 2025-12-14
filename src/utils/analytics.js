// Google Ads конверсии

export const trackWhatsAppClick = () => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-16788812201/0Mo4CKCl57gaEKnjw8U-'
    });
  }
};

export const trackEmailSubmit = () => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-16788812201/email_submit',
      'event_category': 'engagement',
      'event_label': 'Email Form Submit'
    });
  }
};

// Автоматическое отслеживание всех ссылок на WhatsApp и отправок форм
export const initAnalytics = () => {
  // Отслеживание кликов по WhatsApp
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a[href*="wa.me"]');
    if (target) {
      trackWhatsAppClick();
    }
  });

  // Отслеживание отправки всех форм
  document.addEventListener('submit', (e) => {
    const form = e.target;
    if (form.tagName === 'FORM' && form.action.includes('formsubmit.co')) {
      trackEmailSubmit();
    }
  });
};
