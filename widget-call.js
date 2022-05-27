function widgetCall() {
  'use strict';

  /* ПАРАМЕТРЫ */

  var statusWidget = {
    version: "0.3.2018",
    mobile: true,
    desktop: true,
    onlyMode: false, // true - показывается только Phone и WhatsApp. false - дополнительно отображается Tg и Viber
    onlyModePhoneLeft: true, // true - показывать номер телефона слева, false - справа
    hint: "whatsApp", // false - отключено, "whatsApp" - включено для WhatsApp, "call" - включено для мобильного номера
  };
  var phoneNumber = {
    mobile: "+123 45 678 9123",
    desktop: "+123 45 678 9123",
  };
  var viberLink = {
    /*
    * viber://add?number=НОМЕР_БЕЗ_ЗНАКА_+
    * или
    * viber://chat?number=НОМЕР_СО_ЗНАКОМ_+
    * */
    mobile: "viber://chat?number=+12345678901",
    desktop: "viber://chat?number=+12345678901",
  };
  var tgLink = {
    mobile: "tg://resolve?domain=username", // Только если на устройстве установлен Telegram: tg://resolve?domain=user_name
    desktop: "https://tele.gs/username", // Универсально: ссылку t.me и telegram.me нужно заменить на https://tele.gs/NIKNAME
  };
  var whatsAppLink = {
    mobile: "https://api.whatsapp.com/send?phone=PHONE&text=MESSAGE",
    desktop: "https://web.whatsapp.com/send?phone=PHONE&text=MESSAGE",
  };
  var textHint = {
    call: 'Need Help? <strong>Chat with us</strong>',
    viber: 'Need Help? <strong>Chat with us</strong>',
    tg: 'Need Help? <strong>Chat with us</strong>',
    whatsApp: 'Need Help? <strong>Chat with us</strong>',
  };
  var visualSettingWidget = {
    // Показать виджет после прокрутки страницы на NN процентов
    showPercent: {
      mobile: 15,
      desktop: 0,
    },
    // Скорость анимации появления виджета в секундах
    showSpeed: {
      mobile: 2,
      desktop: 2,
    },
    // Если меньше 100 - виджет станет темнее, если больше 100 - виджет станет светлее
    hoverEffectCall: {
      mobile: 125,
      desktop: 125,
      customColorMobile: null, // Свой цвет или null, если должны работать настройки изменения яркости
      customColorDesktop: null,
    },
    // Если меньше 100 - виджет станет темнее, если больше 100 - виджет станет светлее
    hoverEffectViber: {
      mobile: 125,
      desktop: 125,
      customColorMobile: null, // Свой цвет или null, если должны работать настройки изменения яркости
      customColorDesktop: null,
    },
    // Если меньше 100 - виджет станет темнее, если больше 100 - виджет станет светлее
    hoverEffectTg: {
      mobile: 115,
      desktop: 115,
      customColorMobile: null, // Свой цвет или null, если должны работать настройки изменения яркости
      customColorDesktop: null,
    },
    // Если меньше 100 - виджет станет темнее, если больше 100 - виджет станет светлее
    hoverEffectWhatsApp: {
      mobile: 125,
      desktop: 125,
      customColorMobile: null, // Свой цвет или null, если должны работать настройки изменения яркости
      customColorDesktop: "rgb(8, 168, 74)",
    },
  };
  var getHeightScreen = document.documentElement.clientHeight >= 622 ? "75px" : "50px"; // 622 - высота iPhone 8 Pluse
  var targetAnalytics = {
    phone: {
      yandexNameTarget: "phone",
      googleAct: "phone-act",
      googleCat: "phone-cat",
    },
    viber: {
      yandexNameTarget: "viber",
      googleAct: "viber-act",
      googleCat: "viber-cat",
    },
    tg: {
      yandexNameTarget: "telegram",
      googleAct: "telegram-act",
      googleCat: "telegram-cat",
    },
    whatsApp: {
      yandexNameTarget: "whatsapp",
      googleAct: "whatsapp-act",
      googleCat: "whatsapp-cat",
    },
  };
  var reactionList = {
    phone: [
      "tel:",
    ],
    viber: [
      "viber://",
    ],
    tg: [
      "tg://", "//t.me", "//telegram.me", "//tele.gs",
    ],
    whatsApp: [
      "whatsapp.com/send",
    ],
  };

  /* АЛГОРИТМ РАБОТЫ */

  var isMobile = (/iphone|ipod|ipad|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));

  if (isMobile && !statusWidget.mobile) {
    return false;
  } else if (!isMobile && !statusWidget.desktop) {
    return false;
  }

  phoneNumber = isMobile ? phoneNumber.mobile : phoneNumber.desktop;
  whatsAppLink = isMobile ? whatsAppLink.mobile : whatsAppLink.desktop;
  viberLink = isMobile ? viberLink.mobile : viberLink.desktop;
  tgLink = isMobile ? tgLink.mobile : tgLink.desktop;
  visualSettingWidget.showPercent = isMobile ? visualSettingWidget.showPercent.mobile : visualSettingWidget.showPercent.desktop;
  visualSettingWidget.showSpeed = isMobile ? visualSettingWidget.showSpeed.mobile : visualSettingWidget.showSpeed.desktop;
  visualSettingWidget.hoverEffectCall = isMobile ? (visualSettingWidget.hoverEffectCall.customColorMobile !== null ? visualSettingWidget.hoverEffectCall.customColorMobile : visualSettingWidget.hoverEffectCall.mobile) : (visualSettingWidget.hoverEffectCall.customColorDesktop !== null ? visualSettingWidget.hoverEffectCall.customColorDesktop : visualSettingWidget.hoverEffectCall.desktop);
  visualSettingWidget.hoverEffectViber = isMobile ? (visualSettingWidget.hoverEffectViber.customColorMobile !== null ? visualSettingWidget.hoverEffectViber.customColorMobile : visualSettingWidget.hoverEffectViber.mobile) : (visualSettingWidget.hoverEffectViber.customColorDesktop !== null ? visualSettingWidget.hoverEffectViber.customColorDesktop : visualSettingWidget.hoverEffectViber.desktop);
  visualSettingWidget.hoverEffectTg = isMobile ? (visualSettingWidget.hoverEffectTg.customColorMobile !== null ? visualSettingWidget.hoverEffectTg.customColorMobile : visualSettingWidget.hoverEffectTg.mobile) : (visualSettingWidget.hoverEffectTg.customColorDesktop !== null ? visualSettingWidget.hoverEffectTg.customColorDesktop : visualSettingWidget.hoverEffectTg.desktop);
  visualSettingWidget.hoverEffectWhatsApp = isMobile ? (visualSettingWidget.hoverEffectWhatsApp.customColorMobile !== null ? visualSettingWidget.hoverEffectWhatsApp.customColorMobile : visualSettingWidget.hoverEffectWhatsApp.mobile) : (visualSettingWidget.hoverEffectWhatsApp.customColorDesktop !== null ? visualSettingWidget.hoverEffectWhatsApp.customColorDesktop : visualSettingWidget.hoverEffectWhatsApp.desktop);

  var $body = $('body');

  var hoverColorCall = String(visualSettingWidget.hoverEffectCall).search(/\D/) === -1 ? 'filter: brightness(' + visualSettingWidget.hoverEffectCall + '%)' : 'background-color: ' + visualSettingWidget.hoverEffectCall + ' !important';
  var hoverColorViber = String(visualSettingWidget.hoverEffectViber).search(/\D/) === -1 ? 'filter: brightness(' + visualSettingWidget.hoverEffectViber + '%)' : 'background-color: ' + visualSettingWidget.hoverEffectViber + ' !important';
  var hoverColorTg = String(visualSettingWidget.hoverEffectTg).search(/\D/) === -1 ? 'filter: brightness(' + visualSettingWidget.hoverEffectTg + '%)' : 'background-color: ' + visualSettingWidget.hoverEffectTg + ' !important';
  var hoverColorWhatsApp = String(visualSettingWidget.hoverEffectWhatsApp).search(/\D/) === -1 ? 'filter: brightness(' + visualSettingWidget.hoverEffectWhatsApp + '%)' : 'background-color: ' + visualSettingWidget.hoverEffectWhatsApp + ' !important';
  var hoverColorIsSvg = String(visualSettingWidget.hoverEffectWhatsApp).search(/\D/) === -1 ? '#4caf50' : visualSettingWidget.hoverEffectWhatsApp;

  var style = null;
  var element = null;

  if (statusWidget.onlyMode === true) {
    style = isMobile ? '<style type="text/css">.whatsapp {order: ' + (statusWidget.onlyModePhoneLeft ? 2 : 1) + ';}.widget-whatsapp-cell, .widget-whatsapp-cell_bottom { width : 100%; height : ' + getHeightScreen + ';}.widget-whatsapp-cell { display : flex; position : fixed; color : white; bottom : 0; z-index : 1000; text-align : center; vertical-align : middle; font-size : 90%; font-family: Arial; font-weight : bold;}.widget-whatsapp-cell, .widget-whatsapp-cell a {color : white !important;}.widget-whatsapp-cell a { display : block; width : 50%; height : 100%; text-decoration : none; transition-duration : .3s;}.widget-whatsapp-cell a.call:hover {' + hoverColorCall + ';}.widget-whatsapp-cell a.whatsapp:hover {' + hoverColorWhatsApp + ';}.widget-whatsapp-cell a:first-child { background-color : rgb(1, 194, 74);}.widget-whatsapp-cell a:last-child { background-color : rgb(0, 131, 52);}.widget-whatsapp-cell a .cont.icon.text { display : inline-flex; height : inherit; align-items : center;}.widget-whatsapp-cell a .cont.icon.text .icon { margin-right : 10px;}.widget-whatsapp-cell a svg { vertical-align : middle;}.widget-whatsapp-cell a:first-child svg { height : 25px;}.widget-whatsapp-cell a:last-child svg { height : 20px;}.widget-whatsapp-cell p {margin: 0 auto !important;}</style>' : '<style type="text/css">.widget-whatsapp-cell { display : block; position : fixed; color : white; height : 56px; width : 56px; bottom : 115px; right : 40px; z-index : 1000; text-align : center;}.widget-whatsapp-cell a { display : block; height : 100%; width : 100%; text-decoration : none; border-radius : 100%; box-shadow : 0 0 15px rgb(0, 0, 0, .45); transition-duration : .3s;}.widget-whatsapp-cell a.call:hover {' + hoverColorCall + ';}.widget-whatsapp-cell a.whatsapp:hover {' + hoverColorWhatsApp + ';}.widget-whatsapp-cell a .cont.icon.text { display : inline-flex; height : inherit; align-items : center;}.widget-whatsapp-cell a .cont.icon.text svg { vertical-align : middle;}.widget-whatsapp-cell a:first-child { background-color : rgb(43, 118, 144);}.widget-whatsapp-cell a:last-child { background-color : rgb(1, 194, 74); margin-top : 30px;}.widget-whatsapp-cell a:first-child .cont.icon.text svg { height : 25px;}.widget-whatsapp-cell a:last-child .cont.icon.text svg { height : 30px;}</style>';
    element = isMobile ? '<div class="widget-whatsapp-cell" style="opacity: 0;"><a class="whatsapp" href="' + whatsAppLink + '" target="_blank"><div class="cont icon text"><div class="icon"><!--?xml version="1.0" encoding="UTF-8"?--><svg enable-background="new 0 0 24 24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m20.52 3.449c-2.28-2.204-5.28-3.449-8.475-3.449-9.17 0-14.928 9.935-10.349 17.838l-1.696 6.162 6.335-1.652c2.76 1.491 5.021 1.359 5.716 1.447 10.633 0 15.926-12.864 8.454-20.307z" fill="#eceff1"></path><path d="m12.067 21.751-.006-.001h-.016c-3.182 0-5.215-1.507-5.415-1.594l-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-8.793 10.745-13.19 16.963-6.975 6.203 6.15 1.848 16.875-7.026 16.875z" fill="#4caf50" class="fill_color_hover"></path><path d="m17.507 14.307-.009.075c-.301-.15-1.767-.867-2.04-.966-.613-.227-.44-.036-1.617 1.312-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.293-.506.32-.578.878-1.634.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.576-.05-.997-.042-1.368.344-1.614 1.774-1.207 3.604.174 5.55 2.714 3.552 4.16 4.206 6.804 5.114.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z" fill="#fafafa"></path></svg></div><div class="text"><p>WhatsApp</p></div></div></a><a class="call" href="tel:' + phoneNumber.replace(/ /g, '') + '" target="_self"><div class="cont icon text"><div class="icon"><!--?xml version="1.0" encoding="UTF-8"?--><svg viewBox="0 0 516 516" xmlns="http://www.w3.org/2000/svg" version="1.1"><g><path d="M503.05 409.127 L446.289 371.283 395.83 337.65 C386.092 331.171 373.005 333.295 365.816 342.523 L334.593 382.662 C327.886 391.372 315.821 393.875 306.203 388.55 285.017 376.765 259.964 365.669 204.686 310.32 149.408 254.971 138.241 229.989 126.456 208.803 121.131 199.185 123.634 187.12 132.344 180.414 L172.483 149.191 C181.71 142.003 183.835 128.916 177.356 119.177 L144.756 70.272 105.879 11.956 C99.262 2.03 86.016 -0.95 75.786 5.185 L30.95 32.083 C18.833 39.222 9.926 50.75 6.074 64.277 -6.187 108.98 -8.659 207.593 149.381 365.633 307.421 523.673 406.025 521.193 450.728 508.931 464.255 505.08 475.783 496.173 482.922 484.055 L509.82 439.22 C515.956 428.989 512.976 415.744 503.05 409.127 Z" fill="#ffffff" fill-opacity="1" stroke="none"></path><path d="M292.309 81.447 C375.151 81.539 442.286 148.673 442.378 231.516 442.378 236.391 446.33 240.344 451.206 240.344 456.081 240.344 460.034 236.392 460.034 231.516 459.932 138.927 384.899 63.894 292.31 63.792 287.435 63.792 283.482 67.744 283.482 72.62 283.481 77.494 287.433 81.447 292.309 81.447 Z" fill="#ffffff" fill-opacity="1" stroke="none"></path><path d="M292.309 134.412 C345.912 134.475 389.349 177.913 389.412 231.515 389.412 236.39 393.364 240.343 398.24 240.343 403.115 240.343 407.068 236.391 407.068 231.515 406.995 168.166 355.659 116.829 292.309 116.756 287.434 116.756 283.481 120.708 283.481 125.584 283.481 130.46 287.433 134.412 292.309 134.412 Z" fill="#ffffff" fill-opacity="1" stroke="none"></path><path d="M292.309 187.378 C316.674 187.407 336.418 207.151 336.447 231.516 336.447 236.391 340.399 240.344 345.275 240.344 350.15 240.344 354.103 236.392 354.103 231.516 354.064 197.405 326.421 169.762 292.31 169.723 287.435 169.723 283.482 173.675 283.482 178.551 283.481 183.426 287.433 187.378 292.309 187.378 Z" fill="#ffffff" fill-opacity="1" stroke="none"></path></g></svg></div><div class="text"><p>' + phoneNumber + '</p></div></div></a></div><div class="widget-whatsapp-cell_bottom"></div>' : '<div class="widget-whatsapp-cell" style="opacity: 0;"><a class="call" href="tel:' + phoneNumber.replace(/ /g, '') + '" target="_self"><div class="cont icon text"><div class="icon"><!--?xml version="1.0" encoding="UTF-8"?--><svg viewBox="0 0 516 516" xmlns="http://www.w3.org/2000/svg" version="1.1"><g><path d="M503.05 409.127 L446.289 371.283 395.83 337.65 C386.092 331.171 373.005 333.295 365.816 342.523 L334.593 382.662 C327.886 391.372 315.821 393.875 306.203 388.55 285.017 376.765 259.964 365.669 204.686 310.32 149.408 254.971 138.241 229.989 126.456 208.803 121.131 199.185 123.634 187.12 132.344 180.414 L172.483 149.191 C181.71 142.003 183.835 128.916 177.356 119.177 L144.756 70.272 105.879 11.956 C99.262 2.03 86.016 -0.95 75.786 5.185 L30.95 32.083 C18.833 39.222 9.926 50.75 6.074 64.277 -6.187 108.98 -8.659 207.593 149.381 365.633 307.421 523.673 406.025 521.193 450.728 508.931 464.255 505.08 475.783 496.173 482.922 484.055 L509.82 439.22 C515.956 428.989 512.976 415.744 503.05 409.127 Z" fill="#ffffff" fill-opacity="1" stroke="none"></path><path d="M292.309 81.447 C375.151 81.539 442.286 148.673 442.378 231.516 442.378 236.391 446.33 240.344 451.206 240.344 456.081 240.344 460.034 236.392 460.034 231.516 459.932 138.927 384.899 63.894 292.31 63.792 287.435 63.792 283.482 67.744 283.482 72.62 283.481 77.494 287.433 81.447 292.309 81.447 Z" fill="#ffffff" fill-opacity="1" stroke="none"></path><path d="M292.309 134.412 C345.912 134.475 389.349 177.913 389.412 231.515 389.412 236.39 393.364 240.343 398.24 240.343 403.115 240.343 407.068 236.391 407.068 231.515 406.995 168.166 355.659 116.829 292.309 116.756 287.434 116.756 283.481 120.708 283.481 125.584 283.481 130.46 287.433 134.412 292.309 134.412 Z" fill="#ffffff" fill-opacity="1" stroke="none"></path><path d="M292.309 187.378 C316.674 187.407 336.418 207.151 336.447 231.516 336.447 236.391 340.399 240.344 345.275 240.344 350.15 240.344 354.103 236.392 354.103 231.516 354.064 197.405 326.421 169.762 292.31 169.723 287.435 169.723 283.482 173.675 283.482 178.551 283.481 183.426 287.433 187.378 292.309 187.378 Z" fill="#ffffff" fill-opacity="1" stroke="none"></path></g></svg></div></div></a><a class="whatsapp" href="' + whatsAppLink + '" target="_blank"><div class="cont icon text"><div class="icon"><!--?xml version="1.0" encoding="UTF-8"?--><svg enable-background="new 0 0 24 24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m20.52 3.449c-2.28-2.204-5.28-3.449-8.475-3.449-9.17 0-14.928 9.935-10.349 17.838l-1.696 6.162 6.335-1.652c2.76 1.491 5.021 1.359 5.716 1.447 10.633 0 15.926-12.864 8.454-20.307z" fill="#eceff1"></path><path d="m12.067 21.751-.006-.001h-.016c-3.182 0-5.215-1.507-5.415-1.594l-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-8.793 10.745-13.19 16.963-6.975 6.203 6.15 1.848 16.875-7.026 16.875z" fill="rgb(1, 194, 74)" class="fill_color_hover"></path><path d="m17.507 14.307-.009.075c-.301-.15-1.767-.867-2.04-.966-.613-.227-.44-.036-1.617 1.312-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.293-.506.32-.578.878-1.634.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.576-.05-.997-.042-1.368.344-1.614 1.774-1.207 3.604.174 5.55 2.714 3.552 4.16 4.206 6.804 5.114.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z" fill="#fafafa"></path></svg></div></div></a></div>';
  } else {
    style = isMobile ? '<style type="text/css">.widget-whatsapp-cell, .widget-whatsapp-cell_bottom { width : 100%; height : ' + getHeightScreen + ';}.widget-whatsapp-cell { display : flex; position : fixed; color : white; bottom : 0; z-index : 1000; text-align : center; vertical-align : middle; font-size : 90%; font-family: Arial; font-weight : bold;}.widget-whatsapp-cell, .widget-whatsapp-cell a {color : white !important;}.widget-whatsapp-cell a { display : block; width : 50%; height : 100%; text-decoration : none; transition-duration : .3s;}@media (max-width: 374px) {.widget-whatsapp-cell a.call .text .icon {width: 10% !important;}.widget-whatsapp-cell a.call .text .text {width: 90% !important;}}@media (min-width: 374px) and (max-width: 413px){.widget-whatsapp-cell a.call .text .icon {width: 10% !important;}.widget-whatsapp-cell a.call .text .text {width: 90% !important;} .widget-whatsapp-cell p {font-size: 16px;}}@media (min-width: 414px) and (max-width: 1023px) {.widget-whatsapp-cell a.call .text .icon {width: 10% !important;}.widget-whatsapp-cell a.call .text .text {width: 90% !important;} .widget-whatsapp-cell p {font-size: 18px;}}@media (min-width: 1024px) {.widget-whatsapp-cell a:last-child svg {height: 25px !important;}.widget-whatsapp-cell a:last-child p {font-size: 18px;}}.widget-whatsapp-cell a.call:hover {' + hoverColorCall + ';}.widget-whatsapp-cell a.viber:hover {' + hoverColorViber + ';}.widget-whatsapp-cell a.tg:hover {' + hoverColorTg + ';}.widget-whatsapp-cell a.whatsapp:hover {' + hoverColorWhatsApp + ';}.widget-whatsapp-cell a:first-child {background-color : rgb(1, 194, 74);}.widget-whatsapp-cell a:last-child {background-color : rgb(0, 131, 52);}.widget-whatsapp-cell a .cont.icon.text {display : inline-flex; height : inherit; align-items : center;}.widget-whatsapp-cell a .cont.icon.text .icon {/* margin-right : 10px; */}.widget-whatsapp-cell a svg {vertical-align : middle;}.widget-whatsapp-cell a:first-child svg {height : 27px;}.widget-whatsapp-cell a:last-child svg {height : 20px;}.widget-whatsapp-cell p {margin : 0 auto !important;}</style>' : '<style type="text/css">.widget-whatsapp-cell {display : block;position : fixed;color : white;height : 56px;width : 56px;bottom : 222px;right : 25px;z-index : 1000;text-align : center;}.widget-whatsapp-cell a {display : block;height : 100%;width : 100%;text-decoration : none;border-radius : 100%;box-shadow : 0 0 15px rgb(0, 0, 0, .45);transition-duration : .3s;}.widget-whatsapp-cell a.call:hover {' + hoverColorCall + ';}.widget-whatsapp-cell a.viber:hover {' + hoverColorViber + ';}.widget-whatsapp-cell a.tg:hover {' + hoverColorTg + ';}.widget-whatsapp-cell a.whatsapp:hover {' + hoverColorWhatsApp + ';}.widget-whatsapp-cell a .cont.icon.text {display : inline-flex;height : inherit;align-items : center;}.widget-whatsapp-cell a .cont.icon.text svg {vertical-align : middle;}.widget-whatsapp-cell a:first-child {background-color : rgb(43, 118, 144);}.widget-whatsapp-cell a:last-child {background-color : rgb(1, 194, 74);}.widget-whatsapp-cell a:first-child .cont.icon.text svg {height : 25px;}.widget-whatsapp-cell a:last-child .cont.icon.text svg {height : 30px;}</style>';
    element = isMobile ? '<div class="widget-whatsapp-cell" style="opacity: 0;"><a class="whatsapp" href="' + whatsAppLink + '" target="_blank" style="width: 22%;"><div class="cont icon text"><div class="icon"><!--?xml version="1.0" encoding="UTF-8"?--><svg enable-background="new 0 0 24 24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m20.52 3.449c-2.28-2.204-5.28-3.449-8.475-3.449-9.17 0-14.928 9.935-10.349 17.838l-1.696 6.162 6.335-1.652c2.76 1.491 5.021 1.359 5.716 1.447 10.633 0 15.926-12.864 8.454-20.307z" fill="#eceff1"></path><path d="m12.067 21.751-.006-.001h-.016c-3.182 0-5.215-1.507-5.415-1.594l-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-8.793 10.745-13.19 16.963-6.975 6.203 6.15 1.848 16.875-7.026 16.875z" fill="#4caf50" class="fill_color_hover"></path><path d="m17.507 14.307-.009.075c-.301-.15-1.767-.867-2.04-.966-.613-.227-.44-.036-1.617 1.312-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.293-.506.32-.578.878-1.634.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.576-.05-.997-.042-1.368.344-1.614 1.774-1.207 3.604.174 5.55 2.714 3.552 4.16 4.206 6.804 5.114.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z" fill="#fafafa"></path></svg></div></div></a><a class="tg" href="' + tgLink + '" target="_self" style="width: 22%;background-color: #0088cc;"><div class="cont icon text"><div class="icon"><!--?xml version="1.0" encoding="UTF-8"?--><svg style="width: 100%;height: 25px;vertical-align:middle;" viewBox="0 0 21 18"><g fill="none"><path fill="#ffffff" d="M0.554,7.092 L19.117,0.078 C19.737,-0.156 20.429,0.156 20.663,0.776 C20.745,0.994 20.763,1.23 20.713,1.457 L17.513,16.059 C17.351,16.799 16.62,17.268 15.88,17.105 C15.696,17.065 15.523,16.987 15.37,16.877 L8.997,12.271 C8.614,11.994 8.527,11.458 8.805,11.074 C8.835,11.033 8.869,10.994 8.905,10.958 L15.458,4.661 C15.594,4.53 15.598,4.313 15.467,4.176 C15.354,4.059 15.174,4.037 15.036,4.125 L6.104,9.795 C5.575,10.131 4.922,10.207 4.329,10.002 L0.577,8.704 C0.13,8.55 -0.107,8.061 0.047,7.614 C0.131,7.374 0.316,7.182 0.554,7.092 Z"></path></g></svg></div></div></a><a class="viber" href="' + viberLink + '" target="_self" style="width: 22%;background-color: rgb(104, 90, 176);"><div class="cont icon text"><div class="icon"><!--?xml version="1.0" encoding="UTF-8"?--><svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 631.99 666.43" style="width: 50%;height: 27px;"><defs><style>.cls-1{fill : #fff;}.cls-2 {fill : none; stroke : #fff; stroke-linecap : round; stroke-linejoin : round; stroke-width : 16.86px;}</style></defs><title>Artboard 4</title><path class="cls-1" d="M560.65,65C544.09,49.72,477.17,1.14,328.11.48c0,0-175.78-10.6-261.47,68C18.94,116.19,2.16,186,.39,272.55S-3.67,521.3,152.68,565.28l.15,0-.1,67.11s-1,27.17,16.89,32.71c21.64,6.72,34.34-13.93,55-36.19,11.34-12.22,27-30.17,38.8-43.89,106.93,9,189.17-11.57,198.51-14.61,21.59-7,143.76-22.65,163.63-184.84C646.07,218.4,615.64,112.66,560.65,65Zm18.12,308.58C562,509,462.91,517.51,444.64,523.37c-7.77,2.5-80,20.47-170.83,14.54,0,0-67.68,81.65-88.82,102.88-3.3,3.32-7.18,4.66-9.77,4-3.64-.89-4.64-5.2-4.6-11.5.06-9,.58-111.52.58-111.52s-.08,0,0,0C38.94,485.05,46.65,347,48.15,274.71S63.23,143.2,103.57,103.37c72.48-65.65,221.79-55.84,221.79-55.84,126.09.55,186.51,38.52,200.52,51.24C572.4,138.6,596.1,233.91,578.77,373.54Z"></path><path class="cls-2" d="M389.47,268.77q-2.46-49.59-50.38-52.09"></path><path class="cls-2" d="M432.72,283.27q1-46.2-27.37-77.2c-19-20.74-45.3-32.16-79.05-34.63"></path><path class="cls-2" d="M477,300.59q-.61-80.17-47.91-126.28t-117.65-46.6"></path><path class="cls-1" d="M340.76,381.68s11.85,1,18.23-6.86l12.44-15.65c6-7.76,20.48-12.71,34.66-4.81A366.67,366.67,0,0,1,437,374.1c9.41,6.92,28.68,23,28.74,23,9.18,7.75,11.3,19.13,5.05,31.13,0,.07-.05.19-.05.25a129.81,129.81,0,0,1-25.89,31.88c-.12.06-.12.12-.23.18q-13.38,11.18-26.29,12.71a17.39,17.39,0,0,1-3.84.24,35,35,0,0,1-11.18-1.72l-.28-.41c-13.26-3.74-35.4-13.1-72.27-33.44a430.39,430.39,0,0,1-60.72-40.11,318.31,318.31,0,0,1-27.31-24.22l-.92-.92-.92-.92h0l-.92-.93c-.31-.3-.61-.61-.92-.92a318.31,318.31,0,0,1-24.22-27.31,430.83,430.83,0,0,1-40.11-60.71c-20.34-36.88-29.7-59-33.44-72.28l-.41-.28a35,35,0,0,1-1.71-11.18,16.87,16.87,0,0,1,.23-3.84Q141,181.42,152.12,168c.06-.11.12-.11.18-.23a129.53,129.53,0,0,1,31.88-25.88c.06,0,.18-.06.25-.06,12-6.25,23.38-4.13,31.12,5,.06.06,16.11,19.33,23,28.74a366.67,366.67,0,0,1,19.74,30.94c7.9,14.17,2.95,28.68-4.81,34.66l-15.65,12.44c-7.9,6.38-6.86,18.23-6.86,18.23S254.15,359.57,340.76,381.68Z"></path></svg></div></div></a><a class="call" href="tel:' + phoneNumber.replace(/ /g, '') + '" target="_self" style="width: 70%;"><div class="cont icon text"> <div class="icon" style="margin-right: 8px;"><!--?xml version="1.0" encoding="UTF-8"?--><svg viewBox="0 0 516 516" xmlns="http://www.w3.org/2000/svg" version="1.1"><g><path d="M503.05 409.127 L446.289 371.283 395.83 337.65 C386.092 331.171 373.005 333.295 365.816 342.523 L334.593 382.662 C327.886 391.372 315.821 393.875 306.203 388.55 285.017 376.765 259.964 365.669 204.686 310.32 149.408 254.971 138.241 229.989 126.456 208.803 121.131 199.185 123.634 187.12 132.344 180.414 L172.483 149.191 C181.71 142.003 183.835 128.916 177.356 119.177 L144.756 70.272 105.879 11.956 C99.262 2.03 86.016 -0.95 75.786 5.185 L30.95 32.083 C18.833 39.222 9.926 50.75 6.074 64.277 -6.187 108.98 -8.659 207.593 149.381 365.633 307.421 523.673 406.025 521.193 450.728 508.931 464.255 505.08 475.783 496.173 482.922 484.055 L509.82 439.22 C515.956 428.989 512.976 415.744 503.05 409.127 Z" fill="#ffffff" fill-opacity="1" stroke="none"></path><path d="M292.309 81.447 C375.151 81.539 442.286 148.673 442.378 231.516 442.378 236.391 446.33 240.344 451.206 240.344 456.081 240.344 460.034 236.392 460.034 231.516 459.932 138.927 384.899 63.894 292.31 63.792 287.435 63.792 283.482 67.744 283.482 72.62 283.481 77.494 287.433 81.447 292.309 81.447 Z" fill="#ffffff" fill-opacity="1" stroke="none"></path><path d="M292.309 134.412 C345.912 134.475 389.349 177.913 389.412 231.515 389.412 236.39 393.364 240.343 398.24 240.343 403.115 240.343 407.068 236.391 407.068 231.515 406.995 168.166 355.659 116.829 292.309 116.756 287.434 116.756 283.481 120.708 283.481 125.584 283.481 130.46 287.433 134.412 292.309 134.412 Z" fill="#ffffff" fill-opacity="1" stroke="none"></path><path d="M292.309 187.378 C316.674 187.407 336.418 207.151 336.447 231.516 336.447 236.391 340.399 240.344 345.275 240.344 350.15 240.344 354.103 236.392 354.103 231.516 354.064 197.405 326.421 169.762 292.31 169.723 287.435 169.723 283.482 173.675 283.482 178.551 283.481 183.426 287.433 187.378 292.309 187.378 Z" fill="#ffffff" fill-opacity="1" stroke="none"></path></g></svg></div><div class="text" style="margin-left: 4px;"><p>' + phoneNumber + '</p></div></div></a></div><div class="widget-whatsapp-cell_bottom"></div>' : '<div class="widget-whatsapp-cell" style="opacity: 0;"><a class="call" href="tel:' + phoneNumber.replace(/ /g, '') + '" target="_self"><div class="cont icon text"><div class="icon"><!--?xml version="1.0" encoding="UTF-8"?--><svg viewBox="0 0 516 516" xmlns="http://www.w3.org/2000/svg" version="1.1"><g><path d="M503.05 409.127 L446.289 371.283 395.83 337.65 C386.092 331.171 373.005 333.295 365.816 342.523 L334.593 382.662 C327.886 391.372 315.821 393.875 306.203 388.55 285.017 376.765 259.964 365.669 204.686 310.32 149.408 254.971 138.241 229.989 126.456 208.803 121.131 199.185 123.634 187.12 132.344 180.414 L172.483 149.191 C181.71 142.003 183.835 128.916 177.356 119.177 L144.756 70.272 105.879 11.956 C99.262 2.03 86.016 -0.95 75.786 5.185 L30.95 32.083 C18.833 39.222 9.926 50.75 6.074 64.277 -6.187 108.98 -8.659 207.593 149.381 365.633 307.421 523.673 406.025 521.193 450.728 508.931 464.255 505.08 475.783 496.173 482.922 484.055 L509.82 439.22 C515.956 428.989 512.976 415.744 503.05 409.127 Z" fill="#ffffff" fill-opacity="1" stroke="none"></path><path d="M292.309 81.447 C375.151 81.539 442.286 148.673 442.378 231.516 442.378 236.391 446.33 240.344 451.206 240.344 456.081 240.344 460.034 236.392 460.034 231.516 459.932 138.927 384.899 63.894 292.31 63.792 287.435 63.792 283.482 67.744 283.482 72.62 283.481 77.494 287.433 81.447 292.309 81.447 Z" fill="#ffffff" fill-opacity="1" stroke="none"></path><path d="M292.309 134.412 C345.912 134.475 389.349 177.913 389.412 231.515 389.412 236.39 393.364 240.343 398.24 240.343 403.115 240.343 407.068 236.391 407.068 231.515 406.995 168.166 355.659 116.829 292.309 116.756 287.434 116.756 283.481 120.708 283.481 125.584 283.481 130.46 287.433 134.412 292.309 134.412 Z" fill="#ffffff" fill-opacity="1" stroke="none"></path><path d="M292.309 187.378 C316.674 187.407 336.418 207.151 336.447 231.516 336.447 236.391 340.399 240.344 345.275 240.344 350.15 240.344 354.103 236.392 354.103 231.516 354.064 197.405 326.421 169.762 292.31 169.723 287.435 169.723 283.482 173.675 283.482 178.551 283.481 183.426 287.433 187.378 292.309 187.378 Z" fill="#ffffff" fill-opacity="1" stroke="none"></path></g></svg></div></div></a><a class="viber" href="' + viberLink + '" target="_self" style="background-color: #7360f2; margin-top: 10px;"><div class="cont icon text"><div class="icon"><!--?xml version="1.0" encoding="UTF-8"?--><svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 631.99 666.43" style="width: 55%; margin-top: 2px;"><defs><style>.cls-1 {fill : #fff;}.cls-2 {fill : none;stroke : #fff;stroke-linecap : round;stroke-linejoin : round;stroke-width : 16.86px;}</style></defs><title>Artboard 4</title><path class="cls-1" d="M560.65,65C544.09,49.72,477.17,1.14,328.11.48c0,0-175.78-10.6-261.47,68C18.94,116.19,2.16,186,.39,272.55S-3.67,521.3,152.68,565.28l.15,0-.1,67.11s-1,27.17,16.89,32.71c21.64,6.72,34.34-13.93,55-36.19,11.34-12.22,27-30.17,38.8-43.89,106.93,9,189.17-11.57,198.51-14.61,21.59-7,143.76-22.65,163.63-184.84C646.07,218.4,615.64,112.66,560.65,65Zm18.12,308.58C562,509,462.91,517.51,444.64,523.37c-7.77,2.5-80,20.47-170.83,14.54,0,0-67.68,81.65-88.82,102.88-3.3,3.32-7.18,4.66-9.77,4-3.64-.89-4.64-5.2-4.6-11.5.06-9,.58-111.52.58-111.52s-.08,0,0,0C38.94,485.05,46.65,347,48.15,274.71S63.23,143.2,103.57,103.37c72.48-65.65,221.79-55.84,221.79-55.84,126.09.55,186.51,38.52,200.52,51.24C572.4,138.6,596.1,233.91,578.77,373.54Z"></path><path class="cls-2" d="M389.47,268.77q-2.46-49.59-50.38-52.09"></path><path class="cls-2" d="M432.72,283.27q1-46.2-27.37-77.2c-19-20.74-45.3-32.16-79.05-34.63"></path><path class="cls-2" d="M477,300.59q-.61-80.17-47.91-126.28t-117.65-46.6"></path><path class="cls-1" d="M340.76,381.68s11.85,1,18.23-6.86l12.44-15.65c6-7.76,20.48-12.71,34.66-4.81A366.67,366.67,0,0,1,437,374.1c9.41,6.92,28.68,23,28.74,23,9.18,7.75,11.3,19.13,5.05,31.13,0,.07-.05.19-.05.25a129.81,129.81,0,0,1-25.89,31.88c-.12.06-.12.12-.23.18q-13.38,11.18-26.29,12.71a17.39,17.39,0,0,1-3.84.24,35,35,0,0,1-11.18-1.72l-.28-.41c-13.26-3.74-35.4-13.1-72.27-33.44a430.39,430.39,0,0,1-60.72-40.11,318.31,318.31,0,0,1-27.31-24.22l-.92-.92-.92-.92h0l-.92-.93c-.31-.3-.61-.61-.92-.92a318.31,318.31,0,0,1-24.22-27.31,430.83,430.83,0,0,1-40.11-60.71c-20.34-36.88-29.7-59-33.44-72.28l-.41-.28a35,35,0,0,1-1.71-11.18,16.87,16.87,0,0,1,.23-3.84Q141,181.42,152.12,168c.06-.11.12-.11.18-.23a129.53,129.53,0,0,1,31.88-25.88c.06,0,.18-.06.25-.06,12-6.25,23.38-4.13,31.12,5,.06.06,16.11,19.33,23,28.74a366.67,366.67,0,0,1,19.74,30.94c7.9,14.17,2.95,28.68-4.81,34.66l-15.65,12.44c-7.9,6.38-6.86,18.23-6.86,18.23S254.15,359.57,340.76,381.68Z"></path></svg></div></div></a><a class="tg" href="' + tgLink + '" target="_blank" style="margin-top: 10px;"><div class="cont icon text"><div class="icon"><!--?xml version="1.0" encoding="UTF-8"?--><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" style="width: 100%; height: 57px;"><defs><linearGradient id="tlogo-a" x1="50%" x2="50%" y1="0%" y2="99.258%"><stop offset="0%" stop-color="#2AABEE"></stop><stop offset="100%" stop-color="#229ED9"></stop></linearGradient></defs><g fill="none" fill-rule="evenodd"><circle cx="64" cy="64" r="64" fill="url(#tlogo-a)" fill-rule="nonzero"></circle><path fill="#FFF" fill-rule="nonzero" d="M28.9700376,63.3244248 C47.6273373,55.1957357 60.0684594,49.8368063 66.2934036,47.2476366 C84.0668845,39.855031 87.7600616,38.5708563 90.1672227,38.528 C90.6966555,38.5191258 91.8804274,38.6503351 92.6472251,39.2725385 C93.294694,39.7979149 93.4728387,40.5076237 93.5580865,41.0057381 C93.6433345,41.5038525 93.7494885,42.63857 93.6651041,43.5252052 C92.7019529,53.6451182 88.5344133,78.2034783 86.4142057,89.5379542 C85.5170662,94.3339958 83.750571,95.9420841 82.0403991,96.0994568 C78.3237996,96.4414641 75.5015827,93.6432685 71.9018743,91.2836143 C66.2690414,87.5912212 63.0868492,85.2926952 57.6192095,81.6896017 C51.3004058,77.5256038 55.3966232,75.2369981 58.9976911,71.4967761 C59.9401076,70.5179421 76.3155302,55.6232293 76.6324771,54.2720454 C76.6721165,54.1030573 76.7089039,53.4731496 76.3346867,53.1405352 C75.9604695,52.8079208 75.4081573,52.921662 75.0095933,53.0121213 C74.444641,53.1403447 65.4461175,59.0880351 48.0140228,70.8551922 C45.4598218,72.6091037 43.1463059,73.4636682 41.0734751,73.4188859 C38.7883453,73.3695169 34.3926725,72.1268388 31.1249416,71.0646282 C27.1169366,69.7617838 23.931454,69.0729605 24.208838,66.8603276 C24.3533167,65.7078514 25.9403832,64.5292172 28.9700376,63.3244248 Z"></path></g></svg></div></div></a><a class="whatsapp" href="' + whatsAppLink + '" target="_blank" style="margin-top: 10px;"><div class="cont icon text"><div class="icon"><!--?xml version="1.0" encoding="UTF-8"?--><svg enable-background="new 0 0 24 24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m20.52 3.449c-2.28-2.204-5.28-3.449-8.475-3.449-9.17 0-14.928 9.935-10.349 17.838l-1.696 6.162 6.335-1.652c2.76 1.491 5.021 1.359 5.716 1.447 10.633 0 15.926-12.864 8.454-20.307z" fill="#eceff1"></path><path d="m12.067 21.751-.006-.001h-.016c-3.182 0-5.215-1.507-5.415-1.594l-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-8.793 10.745-13.19 16.963-6.975 6.203 6.15 1.848 16.875-7.026 16.875z" fill="rgb(1, 194, 74)" class="fill_color_hover" style=""></path><path d="m17.507 14.307-.009.075c-.301-.15-1.767-.867-2.04-.966-.613-.227-.44-.036-1.617 1.312-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.293-.506.32-.578.878-1.634.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.576-.05-.997-.042-1.368.344-1.614 1.774-1.207 3.604.174 5.55 2.714 3.552 4.16 4.206 6.804 5.114.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z" fill="#fafafa"></path></svg></div></div></a></div>';
  }

  $('[href*="whatsapp.com/send"]').each(function () {
    var url = $(this).attr('href');

    if (isMobile) {
      $(this).attr('href', url.replace('web.whatsapp.com', 'api.whatsapp.com'));
    } else {
      $(this).attr('href', url.replace('api.whatsapp.com', 'web.whatsapp.com'));
    }
  });

  $body.append(style).append(element);

  if (statusWidget.hint && !isMobile) {
    var getSetting = statusWidget.hint.toLowerCase() === 'whatsapp';
    var $wayWA = $('.widget-whatsapp-cell');
    var styleHint = {
      'display': 'block',
      'position': 'absolute',
      'width': '156px',
      'right': '100%',
      'top': (getSetting ? (statusWidget.onlyMode ? 98 : 211) : 12) + 'px',
      'background-color': '#f5f7f9',
      'font-size': '12px',
      'font-family': 'Arial',
      'color': '#43474e',
      'padding': '7px 7px 7px 7px',
      'margin-right': '7px',
      'letter-spacing': '-.03em',
      'border-radius': '4px',
      '-webkit-border-radius': '4px',
      '-moz-border-radius': '4px',
      'transition': '.4s ease all',
      '-webkit-transition': '.4s ease all',
      '-moz-transition': '.4s ease all',
      'box-sizing': 'border-box',
      '-webkit-box-sizing': 'border-box',
      '-moz-box-sizing': 'border-box',
      'cursor': 'pointer',
    };

    if (getSetting) {
      $wayWA.find('.whatsapp').before('<div class="hint">' + textHint.whatsApp + '</div>');
    } else {
      $wayWA.find('.call').after('<div class="hint">' + textHint.call + '</div>');
    }

    $wayWA.find('.hint').css(styleHint);

    $wayWA.on('click', '.hint', function () {
      var $hintClosest = $(this).closest('.widget-whatsapp-cell');

      if (getSetting) {
        window.open($hintClosest.find('a.whatsapp').attr('href'));
      } else {
        window.location = $hintClosest.find('a.call').attr('href');
      }
    });
  }

  $(document).on('scroll', showWidget);
  showWidget();

  $(document).on('click', 'a', function () {
    for (var i = 0; i < reactionList.phone.length; ++i) {
      if ($(this).attr('href').search(new RegExp(reactionList.phone[i], 'i')) !== -1) {
        sendGoalOnClickNumber('phone');
        break;
      }
    }

    for (var i = 0; i < reactionList.viber.length; ++i) {
      if ($(this).attr('href').search(new RegExp(reactionList.viber[i], 'i')) !== -1) {
        sendGoalOnClickNumber('viber');
        break;
      }
    }

    for (var i = 0; i < reactionList.tg.length; ++i) {
      if ($(this).attr('href').search(new RegExp(reactionList.tg[i], 'i')) !== -1) {
        sendGoalOnClickNumber('tg');
        break;
      }
    }

    for (var i = 0; i < reactionList.whatsApp.length; ++i) {
      if ($(this).attr('href').search(new RegExp(reactionList.whatsApp[i], 'i')) !== -1) {
        sendGoalOnClickNumber('whatsApp');
        break;
      }
    }
  });

  function sendGoalOnClickNumber(txt) {
    setTimeout(function () {
      var ymTarget = null;
      var glActName = null;
      var glCatName = null;
      var YaCounters = Object.keys(Ya._metrika.counters);

      if (txt === 'phone') {
        ymTarget = targetAnalytics.phone.yandexNameTarget;
        glActName = targetAnalytics.phone.googleAct;
        glCatName = targetAnalytics.phone.googleCat;
      }
      if (txt === 'viber') {
        ymTarget = targetAnalytics.viber.yandexNameTarget;
        glActName = targetAnalytics.viber.googleAct;
        glCatName = targetAnalytics.viber.googleCat;
      }
      if (txt === 'tg') {
        ymTarget = targetAnalytics.tg.yandexNameTarget;
        glActName = targetAnalytics.tg.googleAct;
        glCatName = targetAnalytics.tg.googleCat;
      }
      if (txt === 'whatsApp') {
        ymTarget = targetAnalytics.whatsApp.yandexNameTarget;
        glActName = targetAnalytics.whatsApp.googleAct;
        glCatName = targetAnalytics.whatsApp.googleCat;
      }

      if (window.Ya || window.ym) {
        for (var i = 0; i < YaCounters.length; ++i) {
          if (window.Ya) {
            window[`yaCounter${YaCounters[i].replace(':0', '')}`].reachGoal(ymTarget);
            console.log('Цель (Ya) "' + ymTarget + '" передана в счетчик "' + [`yaCounter${YaCounters[i].replace(':0', '')}`] + '"');
          } else if (window.ym) {
            ym((YaCounters[i].replace(':0', '')), 'reachGoal', ymTarget);
            console.log('Цель (ym) "' + ymTarget + '" передана в счетчик "' + (YaCounters[i].replace(':0', '')) + '"');
          }
        }
      }

      if (window.gtag) {
        gtag('event', glActName, {
          'event_category': glCatName,
        });
      } else if (window.ga) {
        ga('send', 'event', {
          'eventCategory': glCatName,
          'eventAction': glActName,
        });
      }
    }, 250);
  }

  $('.widget-whatsapp-cell a.whatsapp').on('mouseover', function () {
    $(this).find('.fill_color_hover').css('fill', hoverColorIsSvg);
  }).on('mouseout', function () {
    $(this).find('.fill_color_hover').css('fill', '');
  });

  function showWidget() {
    var scroll = window.scrollY + $(window).height();
    var heightBody = $body.outerHeight();
    var clientHeight = $(window).height();
    var showElem = heightBody <= clientHeight || (scroll * 1 / heightBody * 100).toFixed(1) >= visualSettingWidget.showPercent;

    if (showElem) {
      $('.widget-whatsapp-cell').animate({
        opacity: 1,
      }, visualSettingWidget.showSpeed * 1000);

      $(document).off('scroll', showWidget);
    }
  }
}

widgetCall();
