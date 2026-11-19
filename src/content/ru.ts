import type { Dictionary } from './types'

export const ru: Dictionary = {
  meta: {
    title: 'Анатолий Чернов — мобильная и десктоп-разработка',
    description:
      'Разработчик ПО: Flutter, десктоп (Tauri, Wails) и веб. Портфолио и контакты — Telegram.',
  },
  header: {
    navLabel: 'Основная навигация',
    navProjects: 'проекты',
    navStack: 'стек',
    navContact: 'контакты',
    telegram: 'Telegram',
    openPalette: 'Палитра команд',
    brandAria: 'Анатолий Чернов — на главную',
  },
  hero: {
    windowTitle: '~/whoami',
    command: '$ whoami',
    name: 'Анатолий Чернов',
    role: 'Flutter / Tauri / Wails разработчик',
    tagline:
      'Пишу приложения на заказ — мобильные, десктоп и веб: CRM, учёт, производство, онлайн и офлайн.',
    telegram: 'Написать в Telegram',
    github: 'GitHub',
  },
  about: {
    prompt: '~/about',
    command: 'cat about.md',
    paragraphs: [
      'Я Анатолий, делаю приложения под задачу: мобильные на Flutter, десктопные на Tauri и Wails, веб на Vue. Чаще всего это рабочие инструменты: учёт, склад, производство, отчётность, CRM.',
      'Веду задачу от сценария до релиза: уточняю, как приложением будут пользоваться, собираю прототип, довожу до сборки и поддерживаю после запуска. Умею делать оффлайн приложения с локальной базой.',
      'Мои продукты Fastik, Cut Stock и Дневник питания выложены в открытый доступ: их можно скачать и попробовать ниже.',
    ],
    stats: [{ value: '3', label: 'приложения в открытом доступе' }],
  },
  services: {
    prompt: '~/services',
    command: 'ls services/',
    items: [
      {
        name: 'mobile/',
        description: 'Мобильные приложения на Flutter',
      },
      {
        name: 'desktop/',
        description: 'Десктоп: Tauri, Wails, Windows и Linux',
      },
      {
        name: 'web/',
        description: 'Веб: фронтенд и бэкенд',
      },
      {
        name: 'support/',
        description: 'Доработка и сопровождение существующих продуктов',
      },
    ],
  },
  projects: {
    prompt: '~/projects',
    command: 'ls projects/',
    items: {
      diary: {
        name: 'Дневник питания',
        platformLabel: 'Мобильное · Flutter',
        description:
          'Учёт еды с локальной базой и веб-базой продуктов. Офлайн-первый дневник без лишнего шума.',
        screenshotAlt: 'Скриншот приложения Дневник питания',
        placeholder: 'screenshot pending — diary',
        links: {
          download: 'Скачать',
          repo: 'Репозиторий',
          store: 'Магазин',
        },
      },
      fastik: {
        name: 'Fastik',
        platformLabel: 'Десктоп · Tauri',
        description:
          'Локальный поиск по имени и содержимому: операторы И / ИЛИ / НЕ, фильтры, индексация. Читает PDF, Excel, Word, HTML.',
        screenshotAlt: 'Скриншот приложения Fastik',
        placeholder: 'screenshot pending — fastik',
        links: {
          download: 'Скачать',
          repo: 'Репозиторий',
          store: 'Магазин',
        },
      },
      cutstock: {
        name: 'Cut Stock',
        platformLabel: 'Десктоп · Windows',
        description:
          'Помощник технолога: лист, пруток, труба, фасонный прокат. Допуски и посадки ISO 286 / ГОСТ 25346, справочники, сохранённые расчёты.',
        screenshotAlt: 'Скриншот приложения Cut Stock',
        placeholder: 'screenshot pending — cut stock',
        links: {
          download: 'Скачать',
          repo: 'Репозиторий',
          store: 'Магазин',
        },
      },
    },
    release: {
      version: 'v{version}',
      size: '{size} МБ',
      os: {
        windows: 'Windows',
        android: 'Android',
      },
    },
    installNote: {
      summary: 'Предупреждение при запуске?',
      windows:
        'Файл не подписан сертификатом. Windows SmartScreen может показать предупреждение — нажмите «Подробнее», затем «Выполнить в любом случае».',
      android:
        'Разрешите установку из неизвестных источников для браузера или файлового менеджера. Play Protect может запросить подтверждение.',
      sha256: 'SHA-256',
    },
    gallery: {
      open: 'Открыть скриншот',
      close: 'Закрыть',
      prev: 'Предыдущий скриншот',
      next: 'Следующий скриншот',
      thumb: 'Скриншот {n}',
      of: '{name}: скриншот {n} из {total}',
    },
  },
  stack: {
    prompt: '~/stack',
    command: 'cat stack.txt',
    groups: {
      mobile: 'Mobile',
      desktop: 'Desktop',
      web: 'Web',
      backend: 'Backend / Tools',
    },
  },
  contact: {
    prompt: '~/contact',
    command: './connect',
    windowTitle: 'contact.sh',
    heading: 'Готов обсудить задачу',
    lead: 'Коротко опишите, что нужно — отвечу в Telegram.',
    telegramCommand: 'contact --telegram @anatoli_chernov',
    github: 'github.com/TolyaChernov',
  },
  footer: {
    copyright: '© {year} Анатолий Чернов',
    source: 'исходники сайта',
    exit: 'exit 0',
  },
  palette: {
    title: 'Палитра команд',
    placeholder: 'Найти раздел или действие…',
    empty: 'Ничего не найдено',
    hint: '↑↓ выбрать · Enter открыть · Esc закрыть',
    closeKey: 'Esc',
    items: {
      projects: 'Перейти к проектам',
      stack: 'Перейти к стеку',
      contact: 'Перейти к контактам',
      telegram: 'Открыть Telegram',
      github: 'Открыть GitHub',
      langRu: 'Язык: русский',
      langEn: 'Язык: English',
    },
  },
  a11y: {
    skip: 'К содержимому',
    langSwitch: 'Выбор языка',
    closePalette: 'Закрыть палитру',
    newTab: '(откроется в новой вкладке)',
  },
  notFound: {
    title: '404 — страница не найдена',
    message: 'Такого пути нет. Вернитесь на главную.',
    home: 'На главную',
  },
}
