import { existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
let failed = 0

function ok(msg) {
  console.log(`ok  ${msg}`)
}

function fail(msg) {
  console.error(`FAIL ${msg}`)
  failed += 1
}

function mustExist(rel) {
  const path = join(dist, rel)
  if (existsSync(path)) ok(`exists ${rel}`)
  else fail(`missing ${rel}`)
  return path
}

function read(rel) {
  return readFileSync(join(dist, rel), 'utf8')
}

mustExist('index.html')
mustExist('en/index.html')
mustExist('sitemap.xml')
mustExist('og.png')
mustExist('projects/diary.webp')

const ru = read('index.html')
const en = read('en/index.html')
const sitemap = read('sitemap.xml')

if (ru.includes('lang="ru"')) ok('ru html lang')
else fail('ru html lang')

if (en.includes('lang="en"')) ok('en html lang')
else fail('en html lang')

if (ru.includes('Анатолий Чернов')) ok('ru hero name prerendered')
else fail('ru hero name missing from prerender')

if (en.includes('Anatoly Chernov')) ok('en hero name prerendered')
else fail('en hero name missing from prerender')

for (const [label, html] of [
  ['ru', ru],
  ['en', en],
]) {
  if (
    html.includes('hreflang="ru"') &&
    html.includes('hreflang="en"') &&
    html.includes('hreflang="x-default"')
  ) {
    ok(`${label} hreflang links`)
  } else {
    fail(`${label} hreflang links`)
  }

  if (html.includes('rel="canonical"')) ok(`${label} canonical`)
  else fail(`${label} canonical`)

  const match = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  )
  if (!match) {
    fail(`${label} json-ld missing`)
    continue
  }
  try {
    const data = JSON.parse(match[1])
    if (data['@graph']?.some((n) => n['@type'] === 'Person'))
      ok(`${label} json-ld Person`)
    else fail(`${label} json-ld Person`)
    if (data['@graph']?.some((n) => n['@type'] === 'SoftwareApplication')) {
      ok(`${label} json-ld SoftwareApplication`)
    } else {
      fail(`${label} json-ld SoftwareApplication`)
    }
  } catch (e) {
    fail(`${label} json-ld parse: ${e.message}`)
  }
}

if (
  sitemap.includes('https://tolyachernov.github.io/') &&
  sitemap.includes('https://tolyachernov.github.io/en/')
) {
  ok('sitemap urls')
} else {
  fail('sitemap urls')
}

if (failed) {
  console.error(`\n${failed} check(s) failed`)
  process.exit(1)
}

console.log('\nverify-dist passed')
