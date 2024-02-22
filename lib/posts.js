import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkRehype from 'remark-rehype'
import addClasses from 'rehype-add-classes';
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
            h2: 'text-2xl font-bold py-4',
            h3: 'text-xl font-bold py-4',
            p: 'text-lg py-2',
            ul: 'list-disc list-inside',
            ol: 'list-decimal list-inside',
            li: 'text-lg',
            blockquote: 'italic font-bold text-center p-4'
        })
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    // Combine the data with the id and contentHtml
    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}