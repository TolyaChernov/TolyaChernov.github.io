import type { Dictionary } from './types'

export const ru: Dictionary = {
  meta: {
    title: 'Анатолий Чернов — приложения для Windows, Linux и Android',
    description:
      'Собственные приложения: Cut Stock, Fastik, Дневник питания. Скачать и связаться в Telegram.',
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
    role: 'Windows · Linux · Android',
    tagline:
      'Разрабатываю приложения для Windows, Linux и Android. Здесь собраны мои проекты — от инженерных расчётов и поиска по файлам до дневника питания.',
    projects: 'Посмотреть проекты',
    github: 'GitHub',
  },
  about: {
    prompt: '~/about',
    command: 'cat about.md',
    paragraphs: [
      'Я Анатолий. Разрабатываю собственные мобильные и десктопные приложения. Среди моих проектов — инженерные инструменты, локальный поиск по файлам и дневник питания. Мне интересны приложения, которые могут работать офлайн и хранить данные локально.',
    ],
  },
  projects: {
    prompt: '~/projects',
    command: 'ls projects/',
    items: {
      diary: {
        name: 'Дневник питания',
        platformLabel: 'Android',
        description:
          'Запись приёмов пищи и учёт калорий с локальным хранением данных.',
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
        platformLabel: 'Windows',
        description:
          'Поиск файлов по имени и содержимому, в том числе в PDF, Word и Excel.',
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
        platformLabel: 'Windows',
        description:
          'Инженерные расчёты для листа, прутка, трубы и фасонного проката, справочник допусков и посадок.',
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
    heading: 'Связаться со мной',
    lead: 'Есть вопрос по приложению или идея для совместного проекта? Напишите мне в Telegram',
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
