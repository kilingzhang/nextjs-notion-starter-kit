import { getAllPagesInSpace, getPageProperty, uuidToId } from 'notion-utils'
import pMemoize from 'p-memoize'

import type * as types from './types'
import * as config from './config'
import { includeNotionIdInUrls } from './config'
import { db } from './db'
import { getCanonicalPageId } from './get-canonical-page-id'
import { notion } from './notion-api'

const uuid = !!includeNotionIdInUrls

// 缓存时间设置为72小时，提高性能减少API调用
const SITEMAP_CACHE_TTL = 72 * 86_400 * 1000

export async function getSiteMap(): Promise<types.SiteMap> {
  // 尝试从缓存获取站点地图
  const cacheKey = `sitemap:${config.rootNotionPageId}`
  try {
    const cachedSiteMap = await db.get(cacheKey)
    if (cachedSiteMap) {
      console.log('Using cached site map')
      return cachedSiteMap
    }
  } catch (err) {
    console.warn(`Error getting cached site map: ${err.message}`)
  }

  // 如果缓存不存在，则重新获取
  const partialSiteMap = await getAllPages(
    config.rootNotionPageId,
    config.rootNotionSpaceId
  )

  const siteMap = {
    site: config.site,
    ...partialSiteMap
  } as types.SiteMap

  // 将站点地图存入缓存
  try {
    await db.set(cacheKey, siteMap, SITEMAP_CACHE_TTL)
    console.log('Site map cached successfully')
  } catch (err) {
    console.warn(`Error caching site map: ${err.message}`)
  }

  return siteMap
}

const getAllPages = pMemoize(getAllPagesImpl, {
  cacheKey: (...args) => JSON.stringify(args)
})

const getPage = async (pageId: string, ...args) => {
  console.log('\nnotion getPage', uuidToId(pageId))
  return notion.getPage(pageId, ...args)
}

async function getAllPagesImpl(
  rootNotionPageId: string,
  rootNotionSpaceId: string
): Promise<Partial<types.SiteMap>> {
  const pageMap = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    getPage
  )

  const canonicalPageMap = Object.keys(pageMap).reduce(
    (map, pageId: string) => {
      const recordMap = pageMap[pageId]
      if (!recordMap) {
        throw new Error(`Error loading page "${pageId}"`)
      }

      const block = recordMap.block[pageId]?.value
      if (
        !(getPageProperty<boolean | null>('Public', block, recordMap) ?? true)
      ) {
        return map
      }

      const canonicalPageId = getCanonicalPageId(pageId, recordMap, {
        uuid
      })

      if (map[canonicalPageId]) {
        // you can have multiple pages in different collections that have the same id
        // TODO: we may want to error if neither entry is a collection page
        console.warn('error duplicate canonical page id', {
          canonicalPageId,
          pageId,
          existingPageId: map[canonicalPageId]
        })

        return map
      } else {
        return {
          ...map,
          [canonicalPageId]: pageId
        }
      }
    },
    {}
  )

  return {
    pageMap,
    canonicalPageMap
  }
}
