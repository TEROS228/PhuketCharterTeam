// Google Ads конверсии

export const trackWhatsAppClick = () => {
  if (typeof window.gtag === 'function') {
    // Переход в Whatsapp
    window.gtag('event', 'conversion', {
      'send_to': 'AW-7098454688/0Mo4CKCl57gaEKnjw8U-'
    });
  }
};

export const trackEmailSubmit = () => {
  if (typeof window.gtag === 'function') {
    // Контакт (отправка формы)
    window.gtag('event', 'conversion', {
      'send_to': 'AW-16788812201/ZqKGCLjwlNEbEKnjw8U-'
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

  // Отслеживание отправки всех форм с задержкой
  document.addEventListener('submit', (e) => {
    const form = e.target;
    if (form.tagName === 'FORM' && form.action.includes('formsubmit.co')) {
      e.preventDefault(); // Останавливаем отправку

      trackEmailSubmit(); // Отправляем конверсию

      // Даем время Google Ads отправить данные (300ms), затем отправляем форму
      setTimeout(() => {
        form.submit();
      }, 300);
    }
  });
};
