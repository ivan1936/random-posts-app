import {
    SELECT_SUBREDDIT    
} from '../actionTypes'
  
  export function selectedSubreddit(state = '', action) {
    switch (action.type) {
      case SELECT_SUBREDDIT:
        return action.subreddit
      default:
        return state
    }
}