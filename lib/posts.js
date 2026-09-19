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
        .replace(/[\p{Extended_Pictographic}\p{Variation_Selector}\p{Join_Control}]/gu, '')
        .replace(/(^|\s)[:;]-?[)(PpDd](?=\s|$)/g, '.')
        .replace(/\s+/g, ' ')
        .replace(/\s+\./g, '.')
        .trim()
}

function truncate(text) {
    if (text.length <= MAX_DESCRIPTION_LENGTH) return text
    const cut = text.slice(0, MAX_DESCRIPTION_LENGTH - 1)
    // prefer ending on a full sentence, otherwise on a full word
    const sentenceEnd = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '))
    if (sentenceEnd >= 60) return cut.slice(0, sentenceEnd + 1)
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

// Text between a "## " heading matching headingRegex (capture group 1 = rest of the heading) and the next "## " heading
function getSection(markdown, headingRegex) {
    const match = markdown.match(headingRegex)
    if (!match) return null

    return {
        heading: match[1].trim(),
        body: markdown.slice(match.index + match[0].length).split(/^##\s/m)[0]
    }
}

function getListItems(body, itemRegex) {
    return body
        .split(/\r?\n/)
        .map(line => line.match(itemRegex))
        .filter(Boolean)
        .map(match => cleanText(match[1]))
        .filter(Boolean)
}

// Names of the ingredients listed under the "## INGREDIENTES..." heading, without quantities
function getIngredients(markdown) {
    const section = getSection(markdown, /^##\s+INGREDIENTES(.*)$/im)
    if (!section) return []

    return getListItems(section.body, /^\s*[-*]\s+(.*)$/)
        .map(ingredientName)
        .filter(name => name && name.length <= 45)
}

const STOPWORDS = new Set([
    'con', 'del', 'los', 'las', 'una', 'uno', 'unos', 'unas', 'para', 'por', 'sin', 'que', 'muy', 'mas', 'como', 'esta', 'este',
    'forma', 'sabor', 'receta', 'definitiva', 'casero', 'casera', 'facil', 'riquisimo', 'riquisimos', 'riquisima', 'riquisimas',
    'jugoso', 'jugosa', 'natural', 'polvo', 'trozos', 'gusto', 'opcional', 'uuhh', 'paso', 'ingredientes', 'tartas', 'sweet', 'sugar'
])

// Lowercase words without accents, plurals and connectors ("Cupcakes de flores" -> {cupcake, flore})
function keywords(text) {
    const words = text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().split(/[^a-z0-9]+/)
    return new Set(words
        .filter(word => word.length > 2 && !STOPWORDS.has(word))
        .map(word => word.length > 3 && word.endsWith('s') ? word.slice(0, -1) : word))
}

// Recipes related to the given one: shared words in the title and in the ingredients (rare words weigh more,
// so "plátano" counts more than "azúcar"), completed with the most recent recipes. A "related" list in the
// front matter of the post ("related: [banoffee, cakepop]") goes first.
export function getRelatedPosts(id, count = 3) {
    const posts = fs.readdirSync(postsDirectory)
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => {
            const { data, content } = matter(fs.readFileSync(path.join(postsDirectory, fileName), 'utf8'))
            return {
                id: fileName.replace(/\.md$/, ''),
                title: data.title,
                date: data.date,
                image: data.image,
                related: Array.isArray(data.related) ? data.related : [],
                titleWords: keywords(data.title),
                bodyWords: keywords(`${getIngredients(content).join(' ')} ${data.description || buildDescription(data.title, content)}`)
            }
        })

    const documentFrequency = new Map()
    for (const post of posts) {
        for (const word of new Set([...post.titleWords, ...post.bodyWords])) {
            documentFrequency.set(word, (documentFrequency.get(word) || 0) + 1)
        }
    }
    const weight = word => Math.log(posts.length / documentFrequency.get(word))

    const current = posts.find(post => post.id === id)
    const others = posts.filter(post => post.id !== id)
    const has = (post, word) => post.titleWords.has(word) || post.bodyWords.has(word)

    const score = other => {
        let total = 0
        for (const word of new Set([...current.titleWords, ...current.bodyWords])) {
            if (!has(other, word)) continue
            // shared in both titles > in one title > only in ingredients
            const factor = current.titleWords.has(word) && other.titleWords.has(word) ? 3
                : current.titleWords.has(word) || other.titleWords.has(word) ? 2 : 1
            total += factor * weight(word)
        }
        return total
    }
    const newestFirst = (a, b) => String(b.date).localeCompare(String(a.date)) || a.id.localeCompare(b.id)

    const chosen = current.related.map(relatedId => others.find(post => post.id === relatedId)).filter(Boolean)
    const ranked = others
        .filter(post => !chosen.includes(post))
        .map(post => ({ post, score: score(post) }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score || newestFirst(a.post, b.post))
        .map(({ post }) => post)
    chosen.push(...ranked)
    chosen.push(...others.filter(post => !chosen.includes(post)).sort(newestFirst))

    return chosen.slice(0, count).map(({ id, title, image }) => ({ id, title, image }))
}

// Data needed for the schema.org Recipe markup, or null when the post is not a recipe with an
// ingredient list and numbered steps (diary-style posts).
export function getRecipeData(id) {
    const { content } = matter(fs.readFileSync(path.join(postsDirectory, `${id}.md`), 'utf8'))

    const ingredientsSection = getSection(content, /^##\s+INGREDIENTES(.*)$/im)
    const ingredients = ingredientsSection ? getListItems(ingredientsSection.body, /^\s*[-*]\s+(.*)$/) : []

    const stepsSection = getSection(content, /^##\s+ELABORACI[OÓ]N(.*)$/im)
    const steps = stepsSection ? getStepGroups(stepsSection.body) : []

    if (ingredients.length === 0 || steps.length === 0) return null
    return {
        yield: getYield(ingredientsSection.heading),
        ingredients,
        steps
    }
}

// Numbered steps, grouped by the "### " sub-headings of the section ("### Masa choux"); name is '' when there is none
function getStepGroups(body) {
    const groups = []
    let current = { name: '', steps: [] }
    for (const line of body.split(/\r?\n/)) {
        const heading = line.match(/^###\s+(.*)$/)
        if (heading) {
            if (current.steps.length) groups.push(current)
            current = { name: cleanText(heading[1]), steps: [] }
            continue
        }
        const step = line.match(/^\s*\d+\.\s+(.*)$/)
        if (step) current.steps.push(cleanText(step[1]))
    }
    if (current.steps.length) groups.push(current)
    return groups
}

// "PARA UNAS 25 UNIDADES APROXIMADAMENTE" -> "25 unidades", "PARA UN MOLDE DE 18 CM DE DIÁMETRO" -> "1 molde de 18 cm de diámetro"
function getYield(heading) {
    const match = heading.match(/^PARA\s+(.*)$/i)
    if (!match) return ''

    return match[1]
        .replace(/\s*aproximadamente\s*/i, '')
        .replace(/^(?:unas|unos)\s+/i, '')
        .replace(/^(?:un|una)\s+/i, '1 ')
        .toLowerCase()
        .trim()
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
