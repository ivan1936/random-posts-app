import {
  REQUEST_POSTS,
  REQUEST_POSTS_ERROR,
  RECEIVE_POSTS
} from '../actionTypes'

function posts(
    state = {
      isFetching: false,
      error: null,
      items: []
    },
    action
  ) {
    switch (action.type) {
      case REQUEST_POSTS:
        return Object.assign({}, state, {
          isFetching: true
        })
      case REQUEST_POSTS_ERROR:
        return Object.assign({}, state, {
          error: action.error
        })
      case RECEIVE_POSTS:
        return Object.assign({}, state, {
          isFetching: false,
          items: action.posts
        })
      default:
        return state
    }
  }
  
  export function postsBySubreddit(state = {}, action) {
    switch (action.type) {
      case RECEIVE_POSTS:
      case REQUEST_POSTS:
        return Object.assign({}, state, {
          [action.subreddit]: posts(state[action.subreddit], action)
        })           
      default:
        return state
    }
  }
  