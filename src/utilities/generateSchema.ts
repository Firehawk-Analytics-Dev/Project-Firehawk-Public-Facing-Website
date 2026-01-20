export const generateServiceSchema = (service: { title: string; description: string; slug: string }) => {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "provider": {
            "@type": "Organization",
            "name": "Firehawk Analytics",
            "logo": "https://firehawk-analytics.com/logo.png"
        },
        "url": `https://firehawk-analytics.com/services/${service.slug}`
    }
}

export const generateBlogSchema = (post: { title: string; publishedDate: string; author?: { name: string }; featuredImage?: { url: string } }) => {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "datePublished": post.publishedDate,
        "author": {
            "@type": "Person",
            "name": post.author?.name || "Firehawk Analytics Team"
        },
        "image": post.featuredImage?.url
    }
}
