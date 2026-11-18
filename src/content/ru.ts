import type { Dictionary } from './types'

/** TODO(owner): проверить и поправить все тексты о себе */
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
    role: 'software developer',
    tagline:
      'Делаю мобильные и десктоп-приложения. Веб — тоже, но акцент на клиентах под рукой.',
    telegram: 'Написать в Telegram',
    github: 'GitHub',
  },
  about: {
    prompt: '~/about',
    command: 'cat about.md',
    paragraphs: [
      // TODO(owner)
      'Пишу приложения, которыми пользуюсь сам: поиск по файлам, калькуляторы заготовок, дневник питания.',
      'Опыт больше трёх лет. Предпочитаю локальные и офлайн-первые продукты, где данные остаются у пользователя.',
      'Веб знаю и делаю, но в фокусе — Flutter и десктоп на Tauri / Wails.',
    ],
    stats: [
      { value: '3+', label: 'года опыта' }, // TODO(owner)
      { value: '3', label: 'платформы' }, // mobile / desktop / web
      { value: 'PDF→XLSX', label: 'парсеры в Fastik' },
    ],
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
          // TODO(owner)
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
          // TODO(owner)
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
        platformLabel: 'Десктоп · Windows / Linux',
        description:
          // TODO(owner)
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
  },
  notFound: {
    title: '404 — страница не найдена',
    message: 'Такого пути нет. Вернитесь на главную.',
    home: 'На главную',
  },
}
