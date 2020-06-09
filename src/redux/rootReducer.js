import { combineReducers } from 'redux'

import {selectedSubreddit} from './subredditReducer'
import {postsBySubreddit} from './postsBySubredditReducer'
import {selectedPosts} from './selectedPostsReducer'

const rootReducer = combineReducers({
    postsBySubreddit,
    selectedSubreddit,
    selectedPosts
})
  
export default rootReducer