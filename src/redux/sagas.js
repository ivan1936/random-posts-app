import { call, put, takeEvery } from 'redux-saga/effects'

import {requestPosts, receivePosts, requestPostsError, takeOnePost} from '../actions/index'

function* watchFetchPosts() {
    yield takeEvery('FETCH_POSTS', fetchPostsAsync);
}

function* fetchPostsAsync({subreddit}) {
    try {
        yield put(requestPosts(subreddit));
        const data = yield call(() => {
        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
                .then(res => res.json())
        }
        );
        yield put(receivePosts(subreddit, data));
        yield put(takeOnePost(subreddit));
    } catch (error) {
        yield put(requestPostsError(subreddit, error));
    }
}

export {watchFetchPosts}