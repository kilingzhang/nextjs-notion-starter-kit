import {siteConfig} from './lib/site-config'

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: '9f95df9c3a1b4a5ab33cc34813957523',

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: null,

  // basic site info (required)
  name: '07',
  domain: '07is.me',
  author: '07',

  // open graph metadata (optional)
  description: '一只在前进路上的小透明 🎈',

  // social usernames (optional)
  twitter: '',
  github: 'kilingzhang',
  linkedin: '',
  // mastodon: '#', // optional mastodon profile URL, provides link verification
  // newsletter: '#', // optional newsletter URL
  // youtube: '#', // optional youtube channel name or `channel/UCGbXXXXXXXXXXXXXXXXXXXXXX`

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon:
    'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe86dcbf3-392f-482e-b183-e9ce8fc264fa%2FUTOOLS1584170187341.png?table=block&id=9f95df9c-3a1b-4a5a-b33c-c34813957523&width=250&cache=v2',
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,

  // whether or not to enable support for LQIP preview images (optional)
  isPreviewImageSupportEnabled: true,

  // whether or not redis is enabled for caching generated preview images (optional)
  // NOTE: if you enable redis, you need to set the `REDIS_HOST` and `REDIS_PASSWORD`
  // environment variables. see the readme for more info
  isRedisEnabled: false,

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  // example:
  //
  pageUrlOverrides: {
    '/resume': 'c0f438c3461149e69eb101db065c07f6'
  },

  // whether to use the default notion navigation style or a custom one with links to
  // important pages
  navigationStyle: 'custom',
  navigationLinks: [
    {
      title: 'About',
      pageId: '260c904c4e0b4e959a5fb35407a44385'
    },
    {
      title: 'Resume',
      pageId: 'c0f438c3461149e69eb101db065c07f6'
    },
    {
      title: '推荐激励',
      pageId: '006337c470d74500bfa8b6e6f0944904'
    }
  ]
})
