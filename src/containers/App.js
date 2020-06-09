import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  selectSubreddit,
  fetchPostsIfNeeded,
  recoveryPosts
} from '../actions/index'
import Posts from '../components/posts/Posts'
import Button from '../components/button/Button'
import './App.css'

class App extends Component {
  
  componentDidMount() {
    const savedPosts = localStorage.getItem('posts') || []
    if (savedPosts !== []) {
      this.savedPosts = JSON.parse(localStorage.getItem('posts'))
      this.props.dispatch(recoveryPosts(this.savedPosts))
    }
  }
  
  componentDidUpdate() {
    const posts = this.props.posts || []
    localStorage.setItem('posts', JSON.stringify(posts))
  }

  onclick = (val) => {
    this.props.dispatch(selectSubreddit(val))
    this.props.dispatch(fetchPostsIfNeeded(val))
  }

  render() {
    const { selectedSubreddit, posts, isFetching, items } = this.props
        
    return (
      <div className='container'>        
        <Button value='frontend' onclick={this.onclick} />        
        <Button value='reactjs' onclick={this.onclick} />
        <Button value='vuejs' onclick={this.onclick} />
        <Button value='angular' onclick={this.onclick} />

        {selectedSubreddit && isFetching && items.length === 0 && <h2>Loading...</h2>}
        {!isFetching && items.length === 0 && <h2>Empty.</h2>}
        { posts !== null && 
          <div className='postList' /* style={{ opacity: isFetching ? 0.5 : 1 }} */>
            <Posts posts={posts} />                   
          </div>
        }
      </div>
    )
  }
}

App.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit, selectedPosts } = state
  const {
    isFetching,
    items
  } = postsBySubreddit[selectedSubreddit] || {
      isFetching: true,
      items: []
    }
  const {posts} = selectedPosts
  
  return {
    selectedSubreddit,
    items,
    isFetching,
    posts 
  }
}

export default connect(mapStateToProps)(App)