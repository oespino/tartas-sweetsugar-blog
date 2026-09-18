// Plugin de rehype que añade clases CSS a los elementos según su nombre de etiqueta.
// Uso: .use(rehypeAddClasses, { h2: 'text-2xl font-bold', p: 'text-lg' })
export default function rehypeAddClasses(classesByTag = {}) {
    return function transformer(tree) {
        addClasses(tree, classesByTag)
    }
}

function addClasses(node, classesByTag) {
    if (node.type === 'element' && Object.hasOwn(classesByTag, node.tagName)) {
        const existing = node.properties?.className ?? []
        const current = Array.isArray(existing) ? existing : String(existing).split(/\s+/)
        const added = classesByTag[node.tagName].split(/\s+/).filter(Boolean)

        node.properties = {
            ...node.properties,
            className: [...new Set([...current.filter(Boolean), ...added])]
        }
    }

    if (node.children) {
        node.children.forEach(child => addClasses(child, classesByTag))
    }
}
