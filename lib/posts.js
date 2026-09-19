import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import addClasses from './rehypeAddClasses.js'
import rehypeStringify from 'rehype-stringify'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData(sortParam = 'date', sortDir = 'DSC') {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '')

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        // Combine the data with the id
        return {
            id,
            ...matterResult.data
        }
    })
    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a[sortParam] < b[sortParam]) {
            return sortDir === "DSC" ? 1 : -1
        } else {
            return sortDir === "DSC" ? -1 : 1
        }
    })
}

export function getLastPostsData() {
    return getSortedPostsData().slice(0, 7)
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)

    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        };
    });
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(addClasses, {
            h2: 'text-2xl font-bold tracking-wide pt-8 pb-3',
            h3: 'text-xl font-bold pt-6 pb-2',
            p: 'text-lg leading-relaxed py-2',
            ul: 'list-disc list-outside pl-6 space-y-1 marker:text-yellow-800/60',
            ol: 'list-decimal list-outside pl-6 space-y-2 marker:font-bold',
            li: 'text-lg leading-relaxed',
            blockquote: 'italic font-bold text-center p-4'
        })
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    // Combine the data with the id, contentHtml and description (a "description" in the front matter wins)
    return {
        id,
        contentHtml,
        description: buildDescription(matterResult.data.title, matterResult.content),
        ...matterResult.data
    }
}

const MAX_DESCRIPTION_LENGTH = 155
const BRANDS = /^(nutella|kinder|philadelphia|oreo|maría|thermomix|lacasitos)$/i
const UNITS = 'g|gr|gramos|kg|ml|cl|l|litros?|cucharadas?|cucharaditas?|cucharones?|sobres?|paquetes?|botes?|tazas?|vasos?|medidas?|unidades?|uds?'
const SMALL_AMOUNTS = 'pizcas?|pellizcos?|chorritos?|pocos?|puñados?|ramitas?|ramas?|vainas?|trozos?|tiras?'

// Meta description of a recipe. With an ingredient list it is built from the title and the main
// ingredients ("Banoffee. Receta casera paso a paso. Ingredientes: galletas María, mantequilla, ... y más."),
// otherwise the intro paragraph is used.
export function buildDescription(title, markdown) {
    const ingredients = getIngredients(markdown)
    if (ingredients.length === 0) {
        return truncate(getIntro(markdown)) || `${cleanTitle(title)}. Receta casera de Tartas Sweet Sugar.`
    }

    let description = `${cleanTitle(title)}. Receta casera paso a paso. Ingredientes: `
    let added = 0
    for (const ingredient of ingredients) {
        const separator = added === 0 ? '' : ', '
        // keep room for the closing " y más."
        if (description.length + separator.length + ingredient.length > MAX_DESCRIPTION_LENGTH - 8) break
        description += separator + ingredient
        added++
    }
    return description + (added < ingredients.length ? ' y más.' : '.')
}

function cleanTitle(title) {
    return title
        .replace(/^[¡¿\s]+/, '')
        .split(/[!?]/)[0]
        .replace(/[\s.:()]+$/, '')
}

function cleanText(text) {
    return text
        .replace(/<[^>]*>/g, ' ')
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/[*_`>#]/g, '')
        .replace(/\p{Extended_Pictographic}|️|‍/gu, '')
        .replace(/(^|\s)[:;]-?[)(PpDd](?=\s|$)/g, '.')
        .replace(/\s+/g, ' ')
        .replace(/\s+\./g, '.')
        .trim()
}

function truncate(text) {
    if (text.length <= MAX_DESCRIPTION_LENGTH) return text
    const cut = text.slice(0, MAX_DESCRIPTION_LENGTH - 1)
    return cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:.¡!¿?-]+$/, '') + '…'
}

// First text paragraph before the first heading (embeds and other HTML blocks are skipped)
function getIntro(markdown) {
    const beforeFirstHeading = markdown.split(/^##\s/m)[0]
    for (const paragraph of beforeFirstHeading.split(/\r?\n\s*\r?\n/)) {
        if (paragraph.trim().startsWith('<')) continue
        const text = cleanText(paragraph)
        if (text.length >= 40) return text
    }
    return ''
}

// Names of the ingredients listed under the "## INGREDIENTES..." heading, without quantities
function getIngredients(markdown) {
    const section = markdown.split(/^##\s+INGREDIENTES.*$/im)[1]
    if (!section) return []

    return section
        .split(/^##\s/m)[0]
        .split(/\r?\n/)
        .map(line => line.match(/^\s*[-*]\s+(.*)$/))
        .filter(Boolean)
        .map(match => ingredientName(match[1]))
        .filter(name => name && name.length <= 45)
}

function ingredientName(text) {
    const name = text
        .replace(/[*_`]/g, '')
        .replace(/\([^)]*\)/g, '')
        // "1 medida de yogur de harina" is a measure of yogurt, the ingredient is the flour
        .replace(/^\d+\s+medidas?\s+de\s+yogur\s+de\s+/i, '')
        .replace(new RegExp(`^(?:\\d[\\d.,/]*|[½¼¾])\\s*(?:-\\s*\\d[\\d.,/]*\\s*)?(?:${UNITS})?\\b\\.?\\s*(?:de\\s+)?`, 'i'), '')
        .replace(new RegExp(`^(?:(?:una|un|unas|unos)\\s+)?(?:${SMALL_AMOUNTS})\\s+(?:de\\s+)?`, 'i'), '')
        // drop preparation details: "mantequilla cortada en trozos" -> "mantequilla"
        .replace(/\s+(?:cortad[oa]s?|picad[oa]s?|triturad[oa]s?|a temperatura|para fundir|fría|frío|en trozos|en rodajas).*$/i, '')
        .replace(/\s+/g, ' ')
        .trim()
    if (!name) return ''

    // ingredient lists are capitalised at random ("Huevos"), so normalise unless it is a brand
    const [first, ...rest] = name.split(' ')
    return (BRANDS.test(first) ? first : first.toLowerCase()) + (rest.length ? ' ' + rest.join(' ') : '')
}
