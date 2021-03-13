import produce from 'immer'

export const initialState = {
  mainPosts: [],
  onePost: null,
  addPostLoading: false, //게시글추가
  addPostDone: false,
  addPostError: null,
  loadPostsLoading: false, //게시물 여러개 불러오기
  loadPostsDone: false,
  loadPostsError: null,
  loadPostLoading: false, //단일 게시물 불러오기
  loadPostDone: false,
  loadPostError: null,
  hasMorePosts: true, //게시물 추가로 불러오기
  likePostLoading: false, //좋아요
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false, //좋아요취소
  unlikePostDone: false,
  unlikePostError: null,
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST'
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS'
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE'

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST'
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS'
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE'

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST'
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS'
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE'

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST'
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS'
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE'

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addPostLoading = true
        draft.addPostDone = false
        draft.addPostError = null
        break

      case ADD_POST_SUCCESS:
        draft.addPostLoading = false
        draft.addPostDone = true
        draft.mainPosts.unshift(action.data)
        break

      case ADD_POST_FAILURE:
        draft.addPostLoading = false
        draft.addPostError = action.error
        break

      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true
        draft.loadPostsDone = false
        draft.loadPostsError = null
        break
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false
        draft.loadPostsDone = true
        draft.mainPosts = draft.mainPosts.concat(action.data)
        draft.hasMorePosts = action.data.length === 10
        break
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false
        draft.loadPostsError = action.error
        break

      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true
        draft.loadPostDone = false
        draft.loadPostError = null
        break
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false
        draft.loadPostDone = true
        draft.onePost = action.data
        break
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false
        draft.loadPostError = action.error
        break

      case LIKE_POST_REQUEST:
        draft.likePostLoading = true
        draft.likePostDone = false
        draft.likePostError = null
        break
      case LIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find(v => v.id === action.data.PostId)
        post.Likers.push({ id: action.data.UserId })
        draft.likePostLoading = false
        draft.likePostDone = true
        break
      }
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false
        draft.likePostError = action.error
        break

      case UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true
        draft.unlikePostDone = false
        draft.unlikePostError = null
        break
      case UNLIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find(v => v.id === action.data.PostId)
        post.Likers = post.Likers.filter(v => v.id !== action.data.UserId)
        draft.unlikePostLoading = false
        draft.unlikePostDone = true
        break
      }
      case UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false
        draft.unlikePostError = action.error
        break

      default:
        break
    }
  })
}
export default reducer
