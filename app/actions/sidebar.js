// @flow
import {
  SIDEBAR_SEARCH,
  SIDEBAR_VIEW_RESIZE_WIDTH,
  SIDEBAR_VIEW_TOGGLE_UPLOAD,
} from '../constants/actions'

const search = (query: String) => ({
  type: SIDEBAR_SEARCH,
  query,
})

const resizeSidebarWidth = (width: Number) => ({
  type: SIDEBAR_VIEW_RESIZE_WIDTH,
  width,
})

const toggleUploadView = () => ({
  type: SIDEBAR_VIEW_TOGGLE_UPLOAD,
})

export {
  search,
  resizeSidebarWidth,
  toggleUploadView,
}
