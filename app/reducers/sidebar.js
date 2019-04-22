// @flow
import type { Action } from './types'

import {
  SIDEBAR_SEARCH,
  SIDEBAR_VIEW_RESIZE_WIDTH,
  SIDEBAR_VIEW_TOGGLE_UPLOAD,
} from '../constants/actions'

const initialState = {
  width: 200,
  showUpload: false,
  showSettings: false,
}

export default function sidebar(state: Object = initialState, action: Action) {
  switch (action.type) {
    case SIDEBAR_SEARCH:
      return {
        ...state,
      }
    case SIDEBAR_VIEW_RESIZE_WIDTH:
      return {
        ...state,
        sidebarWidth: action.width,
      }
    case SIDEBAR_VIEW_TOGGLE_UPLOAD:
      return {
        ...state,
        showUpload: !state.showUpload,
      }
    default:
      return {
        ...state,
      }
  }
}
