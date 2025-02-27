import { type GetStaticProps } from 'next'

import { NotionPage } from '@/components/NotionPage'
import { domain } from '@/lib/config'
import { resolveNotionPage } from '@/lib/resolve-notion-page'
import { type PageProps } from '@/lib/types'

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  try {
    const props = await resolveNotionPage(domain)

    return { props, revalidate: 86_400 } // 增加到24小时，减少重新生成频率
  } catch (err) {
    console.error('page error', domain, err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export default function NotionDomainPage(props: PageProps) {
  return <NotionPage {...props} />
}
