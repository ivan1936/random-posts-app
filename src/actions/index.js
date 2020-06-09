import {takeOnePostBySubreddit} from '../utils/'

import {
  SELECT_SUBREDDIT,
  REQUEST_POSTS,
  REQUEST_POSTS_ERROR,
  RECEIVE_POSTS,
  TAKE_ONE_POST,
  LIKE_UPDATE,
  DELETE_POST,
  FETCH_POSTS,
  RECOVERY_POSTS
} from '../actionTypes'

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

export function requestPostsError(subreddit, error) {
  return {
    type: REQUEST_POSTS_ERROR,
    subreddit,
    error
  }
}

export function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data)
  }
}

function fetchPosts(subreddit) {
  return {
    type: FETCH_POSTS,
    subreddit
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    } else dispatch(takeOnePost(subreddit))
  }
}

export function takeOnePost(subreddit) {
  return (dispatch, getState) => {
    return dispatch ({
      type: TAKE_ONE_POST,
      post: takeOnePostBySubreddit(subreddit, getState())
    })
  }
}

export function recoveryPosts(posts) {
  return {
    type: RECOVERY_POSTS,
    posts
  }
}

export function likeUpdate(id) {
  return {
    type: LIKE_UPDATE,
    id
  }
}

export function deletePost(id) {
  return {
    type: DELETE_POST,
    id
  }
}
