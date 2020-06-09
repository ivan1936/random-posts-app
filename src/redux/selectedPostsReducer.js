import {
  TAKE_ONE_POST,
  LIKE_UPDATE,
  DELETE_POST,
  RECOVERY_POSTS
} from '../actionTypes'

export function selectedPosts(state = {posts: []}, action) {
  switch (action.type) {
    case TAKE_ONE_POST:
      return { 
        ...state,
        posts: [...state.posts, action.post]
      }
    case RECOVERY_POSTS:
      return { 
        ...state,
        posts: action.posts
      }    
    case LIKE_UPDATE:
      return { 
        ...state,
        posts: state.posts.map(post => post.id === action.id ? {...post, like: !post.like} : post)
      }
    case DELETE_POST:
      return { 
        ...state,
        posts: state.posts.filter(post => post.id !== action.id)
      }
    default:
      return state
  }
}