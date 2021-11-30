type Status = 'success' | 'error'

interface LoginResponse {
  name?: string
  errorMessage?: string
}

interface User {
  username: string
  password: string
}

interface News {
  date: string
  title: string
  text: string
}
