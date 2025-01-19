import { DiscussionEmbed } from 'disqus-react'
import React from 'react'

function DisqusComments({ post }) {
  if (post) {
    console.log('post', post)
    const disqusShortname = 'kilingzhang'
    const disqusConfig = {
      url: post.url,
      identifier: post.id, // Single post id
      title: post.title // Single post title
    }
    return <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
  }

  return <></>
}
export default DisqusComments
