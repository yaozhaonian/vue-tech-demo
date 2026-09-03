import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface UserInfo {
  id: number
  name: string
  avatar: string
  roles: string[]
}

const TOKEN_KEY = 'tech-demo-token'
const USER_KEY = 'tech-demo-user'

/** 从 localStorage 读取初始化数据 */
function loadUser(): UserInfo | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as UserInfo) : null
  } catch {
    return null
  }
}

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(localStorage.getItem(TOKEN_KEY) || '')
  const userInfo = ref<UserInfo | null>(loadUser())

  const isLogin = computed(() => !!token.value)
  const roles = computed(() => userInfo.value?.roles || [])

  /** 模拟登录：仅写入 localStorage，无真实接口 */
  function login(account = 'admin') {
    const fakeToken = `mock-token-${Date.now()}`
    const user: UserInfo = {
      id: 1,
      name: account,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${account}`,
      roles: ['admin'],
    }
    token.value = fakeToken
    userInfo.value = user
    localStorage.setItem(TOKEN_KEY, fakeToken)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  /** 退出登录 */
  function logout() {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  return {
    token,
    userInfo,
    isLogin,
    roles,
    login,
    logout,
  }
})
