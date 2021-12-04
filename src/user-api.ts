const delay = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2)
    }, Math.random() * 2000)
  })
}

export async function login({
  username,
  password,
}: User): Promise<LoginResponse> {
  //fetch...
  let name: string | undefined
  let errorMessage: string | undefined

  await delay()

  if (
    (username === 'admin' && password === 'admin') ||
    (username === 'user' && password === 'user')
  ) {
    name = username
  } else {
    errorMessage = 'Введен неверный логин или пароль'
  }

  return {
    name,
    errorMessage,
  }
}

export async function logout() {
  //fetch...=
  await delay()
}
