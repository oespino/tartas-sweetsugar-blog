// Genera public/sitemap.xml a partir de las páginas del sitio y de los posts de /posts.
// Se ejecuta automáticamente antes de cada build (script "prebuild" de package.json).
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const SITE_URL = 'https://www.sweet-sugar.es'
const postsDirectory = path.join(process.cwd(), 'posts')
const outputFile = path.join(process.cwd(), 'public', 'sitemap.xml')

function toDay(date) {
    // gray-matter devuelve un string si la fecha va entre comillas y un Date si no
    const value = date instanceof Date ? date.toISOString() : String(date || '')
    return /^\d{4}-\d{2}-\d{2}/.test(value) ? value.slice(0, 10) : ''
}

function escapeXml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

const posts = fs.readdirSync(postsDirectory)
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
        const { data } = matter(fs.readFileSync(path.join(postsDirectory, fileName), 'utf8'))
        return { id: fileName.replace(/\.md$/, ''), lastmod: toDay(data.date) }
    })
    .sort((a, b) => a.id.localeCompare(b.id))

// La portada y el recetario cambian cuando se publica una receta nueva
const newestPostDate = posts.map(post => post.lastmod).filter(Boolean).sort().pop() || ''

const urls = [
    { path: '/', lastmod: newestPostDate },
    { path: '/recetario', lastmod: newestPostDate },
    { path: '/sobre-mi', lastmod: '' },
    ...posts.map(post => ({ path: `/post/${post.id}`, lastmod: post.lastmod }))
]

const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(url => [
        '  <url>',
        `    <loc>${escapeXml(SITE_URL + (url.path === '/' ? '/' : url.path))}</loc>`,
        ...(url.lastmod ? [`    <lastmod>${url.lastmod}</lastmod>`] : []),
        '  </url>'
    ].join('\n')),
    '</urlset>',
    ''
].join('\n')

fs.writeFileSync(outputFile, xml)
console.log(`sitemap.xml generado con ${urls.length} URLs (${posts.length} recetas)`)
