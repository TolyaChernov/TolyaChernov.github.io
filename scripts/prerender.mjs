import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dist = join(root, 'dist')
const distSsr = join(root, 'dist-ssr')

const templatePath = join(dist, 'index.html')
if (!existsSync(templatePath)) {
  console.error('Missing dist/index.html — run vite build first')
  process.exit(1)
}

const serverEntryCandidates = [
  join(distSsr, 'entry-server.js'),
  join(distSsr, 'src', 'entry-server.js'),
]

const serverEntry = serverEntryCandidates.find((p) => existsSync(p))
if (!serverEntry) {
  console.error('Missing SSR bundle in dist-ssr/')
  process.exit(1)
}

if (existsSync(join(distSsr, 'assets'))) {
  mkdirSync(join(dist, 'assets'), { recursive: true })
  cpSync(join(distSsr, 'assets'), join(dist, 'assets'), { recursive: true })
}

const { render } = await import(pathToFileURL(serverEntry).href)
const template = readFileSync(templatePath, 'utf8')

const langs = ['ru', 'en']
const pages = {}

for (const lang of langs) {
  const { html, head, jsonLd } = await render(lang)
  pages[lang] = { html, head, jsonLd }
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function inject(lang) {
  const { html, head, jsonLd } = pages[lang]
  const ruUrl = pages.ru.head.url
  const enUrl = pages.en.head.url
  const json = JSON.stringify(jsonLd).replace(/</g, '\\u003c')

  let out = template
  out = out.replace(/<html\s+lang="[^"]*"/, `<html lang="${head.lang}"`)
  out = out.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(head.title)}</title>`,
  )
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapeHtml(head.description)}" />`,
  )
  out = out.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${head.url}" />`,
  )
  out = out.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${head.url}" />`,
  )
  out = out.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${escapeHtml(head.title)}" />`,
  )
  out = out.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${escapeHtml(head.description)}" />`,
  )
  out = out.replace(
    /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:locale" content="${head.locale}" />`,
  )
  out = out.replace(
    /<meta\s+property="og:locale:alternate"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:locale:alternate" content="${head.alternateLocale}" />`,
  )
  out = out.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${escapeHtml(head.title)}" />`,
  )
  out = out.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${escapeHtml(head.description)}" />`,
  )

  const hreflang = [
    `<link rel="alternate" hreflang="ru" href="${ruUrl}" />`,
    `<link rel="alternate" hreflang="en" href="${enUrl}" />`,
    `<link rel="alternate" hreflang="x-default" href="${ruUrl}" />`,
  ].join('\n    ')

  out = out.replace(
    /<!--app-hreflang-->[\s\S]*?<!--\/app-hreflang-->/,
    `<!--app-hreflang-->\n    ${hreflang}\n    <!--/app-hreflang-->`,
  )

  out = out.replace(
    /<!--app-jsonld-->[\s\S]*?<!--\/app-jsonld-->/,
    `<!--app-jsonld-->\n    <script type="application/ld+json">${json}</script>\n    <!--/app-jsonld-->`,
  )

  out = out.replace(
    /<!--app-html-->[\s\S]*?<!--\/app-html-->/,
    `<!--app-html-->${html}<!--/app-html-->`,
  )

  return out
}

writeFileSync(join(dist, 'index.html'), inject('ru'))
mkdirSync(join(dist, 'en'), { recursive: true })
writeFileSync(join(dist, 'en', 'index.html'), inject('en'))

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${pages.ru.head.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="ru" href="${pages.ru.head.url}" />
    <xhtml:link rel="alternate" hreflang="en" href="${pages.en.head.url}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${pages.ru.head.url}" />
  </url>
  <url>
    <loc>${pages.en.head.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="ru" href="${pages.ru.head.url}" />
    <xhtml:link rel="alternate" hreflang="en" href="${pages.en.head.url}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${pages.ru.head.url}" />
  </url>
</urlset>
`

writeFileSync(join(dist, 'sitemap.xml'), sitemap)
console.log('Prerendered / and /en/')
