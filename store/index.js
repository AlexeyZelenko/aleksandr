// Подключение нескольких actions
import auth from './actions/auth'
import commonActions from './actions/commonActions'

export const actions = { ...commonActions, ...auth }

export const strict = false
