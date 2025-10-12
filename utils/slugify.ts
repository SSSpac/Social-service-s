
export const slugify = (textToSlug:string) => {
    return textToSlug.toLowerCase().trim()
    .replace(/[^\w\s-]/g,'')
    .replace(/[\s_]/g, '-')
    .replace(/-+ /g, '')
}