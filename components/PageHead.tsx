import Head from 'next/head'

import type * as types from '@/lib/types'
import * as config from '@/lib/config'
import { getSocialImageUrl } from '@/lib/get-social-image-url'

export function PageHead({
  site,
  title,
  description,
  pageId,
  image,
  url,
  publishedTime,
  lastUpdatedTime,
  category,
  tags
}: types.PageProps & {
  title?: string
  description?: string
  image?: string
  url?: string
  // article metadata
  publishedTime?: string
  lastUpdatedTime?: string
  category?: string
  tags?: string[]
}) {
  const rssFeedUrl = `${config.host}/feed`

  const pageTitle = title ?? site?.name ?? ''
  const pageDescription = description ?? site?.description ?? ''

  const socialImageUrl = pageId ? getSocialImageUrl(pageId) || image : image

  return (
    <Head>
      <meta charSet='utf-8' />
      <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover'
      />

      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='black' />

      <meta
        name='theme-color'
        media='(prefers-color-scheme: light)'
        content='#fefffe'
        key='theme-color-light'
      />
      <meta
        name='theme-color'
        media='(prefers-color-scheme: dark)'
        content='#2d3439'
        key='theme-color-dark'
      />

      <meta name='robots' content='index,follow' />
      <meta property='og:type' content='website' />

      {site && (
        <>
          <meta property='og:site_name' content={site.name || ''} />
          <meta property='twitter:domain' content={site.domain || ''} />
        </>
      )}

      {config.twitter && (
        <meta name='twitter:creator' content={`@${config.twitter}`} />
      )}

      {pageDescription && (
        <>
          <meta name='description' content={pageDescription} />
          <meta property='og:description' content={pageDescription} />
          <meta name='twitter:description' content={pageDescription} />
        </>
      )}

      {socialImageUrl ? (
        <>
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:image' content={socialImageUrl} />
          <meta property='og:image' content={socialImageUrl} />
        </>
      ) : (
        <meta name='twitter:card' content='summary' />
      )}

      {url && (
        <>
          <link rel='canonical' href={url} />
          <meta property='og:url' content={url} />
          <meta property='twitter:url' content={url} />
        </>
      )}

      <link
        rel='alternate'
        type='application/rss+xml'
        href={rssFeedUrl}
        title={site?.name || ''}
      />

      <meta property='og:title' content={pageTitle} />
      <meta name='twitter:title' content={pageTitle} />
      <meta property='article:published_time' content={publishedTime || ''} />
      <meta property='article:modified_time' content={lastUpdatedTime || ''} />
      <meta property='article:author' content={config.author || ''} />
      <meta property='article:section' content={category || ''} />
      {tags?.map((tag) => (
        <meta property='article:tag' content={tag} key={tag} />
      ))}
      <title>{pageTitle}</title>
    </Head>
  )
}
