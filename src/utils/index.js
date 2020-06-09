export const takeOnePostBySubreddit = (subreddit, state) => {
    const postsBySubreddit = (subreddit, state) =>  state.postsBySubreddit[subreddit].items
    const posts = postsBySubreddit(subreddit, state)
    const max = posts.length
    const index = Math.floor(Math.random() * (max))
    const post = posts[index]
    const {id, title, url} = post

    return {id, title, url, like: false}
}