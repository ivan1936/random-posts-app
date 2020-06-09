import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import 'font-awesome/css/font-awesome.min.css'

import {likeUpdate, deletePost} from '../../actions/index'
import './Posts.css'


class Posts extends Component { 
  likeUpdate(id) {
    this.props.dispatch(likeUpdate(id))
  }

  deletePost(id) {
    this.props.dispatch(deletePost(id))
  }
  
  render() {
    return (
      <ul className="posts">
        {this.props.posts.map((post, index) => 
            post !== undefined && 
            <li key={index}>
              {post.like ? <i onClick={() => this.likeUpdate(post.id)}  className='fa fa-heart' />
                                 : <i onClick={() => this.likeUpdate(post.id)} className='fa fa-heart-o' />
              }
              <i onClick={() => this.deletePost(post.id)} className="fa fa-trash-o" />
              <a href={post.url}>{post.title}</a>
            </li>
        )}
      </ul>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  dispatch 
})

export default connect(null, mapDispatchToProps)(Posts)