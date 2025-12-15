// Google Ads конверсии через GTM
// Старый код отслеживания через gtag удален - теперь все конверсии идут через GTM

export const trackWhatsAppClick = () => {
  if (typeof window.gtag === 'function') {
    // Переход в Whatsapp
    window.gtag('event', 'conversion', {
      'send_to': 'AW-7098454688/0Mo4CKCl57gaEKnjw8U-'
    });
  }
};

// Автоматическое отслеживание всех ссылок на WhatsApp
export const initAnalytics = () => {
  // Отслеживание кликов по WhatsApp
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a[href*="wa.me"]');
    if (target) {
      trackWhatsAppClick();
    }
  });

  // Отслеживание форм теперь через GTM в компонентах
  // Старый автоматический обработчик удален
};
