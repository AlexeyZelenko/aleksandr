// Подключение нескольких actions
import auth from './actions/auth'
import commonActions from './actions/commonActions'
import user from './actions/user'
import filters from './actions/filters'

export const actions = { ...commonActions, ...auth, ...user, ...filters }

export const strict = false
