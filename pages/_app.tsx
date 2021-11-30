import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import Layout from '../components/layout'
import LoginModal from '../components/login-modal'
import { selectIsOpen } from '../src/modal-slice'
import store, { useAppSelector } from '../src/store'
import '../styles/styles.scss'

const App: NextPage = ({ children }) => {
  const isOpen = useAppSelector(selectIsOpen)

  return (
    <Layout>
      {isOpen && <LoginModal />}
      {children}
    </Layout>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <App>
        <Component {...pageProps} />
      </App>
    </Provider>
  )
}

export default MyApp
