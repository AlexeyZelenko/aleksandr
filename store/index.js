// Подключение нескольких actions
import auth from './actions/auth'
import commonActions from './actions/commonActions'
import user from './actions/user'

export const actions = { ...commonActions, ...auth, ...user }

export const strict = false
