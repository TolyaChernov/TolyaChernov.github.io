# tolyachernov.github.io

Персональный лендинг Анатолия Чернова. Vue 3 + TypeScript + Vite. Деплой на GitHub Pages.

Сайт: https://tolyachernov.github.io/

## Запуск

```bash
npm ci
npm run dev
```

Сборка:

```bash
npm run build
npm run preview
```

`build` гоняет `vue-tsc --noEmit` и затем Vite.

## Структура

```
src/
  components/   # секции и UI
  composables/  # useLang, useTyping, useReveal
  content/      # ru.ts, en.ts, projects.ts, stack.ts
  styles/       # tokens.css, base.css
  assets/projects/  # скриншоты *.webp / *.png
public/         # favicon, robots, sitemap, 404
.github/workflows/deploy.yml
```

## Языки (RU / EN)

Словари в `src/content/ru.ts` и `en.ts` с общим типом `Dictionary`. Язык по умолчанию: `navigator.language` (`ru*` → ru, иначе en), сохраняется в `localStorage`.

Ограничение статического хостинга: поисковики индексируют мета-теги из `index.html` (русские). Английские title/description выставляются скриптом при переключении языка.

## Проекты и скриншоты

Данные: `src/content/projects.ts`. Тексты: `projects.items` в словарях.

Чтобы добавить скриншот:

1. Положите WebP (предпочтительно) или PNG в `src/assets/projects/`
2. Имя файла должно совпадать с `screenshot.file` (например `fastik.webp`)
3. Укажите реальные `width` / `height`
4. Заполните `links.download` / `repo` / `store`, если нужны кнопки

Пока файла нет, показывается терминальная заглушка. Сборка при отсутствии файлов не падает.

Новый проект: добавьте запись в `projects` (`as const`) и тексты в оба словаря. TypeScript потребует оба языка.

## Аналитика (Umami Cloud)

1. Зарегистрируйте сайт в Umami Cloud
2. В репозитории GitHub: Settings → Secrets and variables → Actions → Variables
3. Добавьте `VITE_ANALYTICS_ID` = website id
4. Пересоберите / задеплойте

Если переменная пуста или включён Do Not Track, скрипт не грузится. Cookie-баннер не нужен.

## OG-картинка

Исходник: `design/og-source.svg` (1200×630). Экспортируйте в `public/og.png`:

```bash
# пример с resvg, если установлен
resvg design/og-source.svg public/og.png -w 1200 -h 630
```

Или откройте SVG в браузере / Inkscape и сохраните PNG. Пока файла нет, соцсети могут не показать превью.

## Публикация на GitHub Pages

1. Создайте репозиторий `TolyaChernov/TolyaChernov.github.io`
2. Settings → Pages → Source: **GitHub Actions**
3. Запушьте код в `main` (нужен `package-lock.json` для `npm ci`)
4. Дождитесь workflow **Deploy to GitHub Pages**

`vite.config.ts` использует `base: '/'` — это корректно для user site `*.github.io`.

## Lighthouse

После `npm run preview`:

```bash
npx lighthouse http://localhost:4173 --preset=desktop --only-categories=performance,accessibility,best-practices,seo
npx lighthouse http://localhost:4173 --form-factor=mobile --screenEmulation.mobile --only-categories=performance,accessibility,best-practices,seo
```

Цель: ≥ 90 по всем четырём категориям.
