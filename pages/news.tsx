import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const getKeyWordsHighlightedText = (text: string, keyWord?: string) => {
  if (keyWord?.length) {
    const regexp = new RegExp(keyWord, 'ig')
    const texts = text.split(regexp)
    const keyWords = text.match(regexp)

    return [
      ...texts.slice(0, -1).flatMap((it, index) => [
        it,
        <span className="news__highlighted-text" key={index}>
          {keyWords![index]}
        </span>,
      ]),
      texts.pop(),
    ]
  } else {
    return <span>{text}</span>
  }
}

const filterNews = (news: News[], keyword?: string): News[] => {
  if (!keyword?.length) {
    return news
  }

  return news.filter(
    (it) =>
      it.text.toLowerCase().includes(keyword.toLowerCase()) ||
      it.title.toLowerCase().includes(keyword.toLowerCase()),
  )
}

const News: NextPage<{ news: News[] }> = (properties) => {
  const inputReference = useRef<HTMLInputElement>(null)

  const [news, setNews] = useState<News[]>(properties.news)

  useEffect(() => {
    setNews(filterNews(properties.news, inputReference.current?.value))
  }, [properties.news])

  return (
    <div>
      <Head>
        <title>Новости</title>
      </Head>

      <div className="search">
        <label className="search__label label" htmlFor="search">
          Поиск:
        </label>
        <input
          className="search__input input"
          ref={inputReference}
          onChange={(event_) => {
            setNews(filterNews(properties.news, event_.target.value))
          }}
          type="text"
          id="search"
        />
      </div>

      <ul className="news">
        {news.map((it, index) => (
          <li className="news__item" key={index}>
            <Link href="#nowhere">
              <a className="news__link">
                {getKeyWordsHighlightedText(
                  it.title,
                  inputReference.current?.value,
                )}
              </a>
            </Link>
            <p className="news__date">{it.date}</p>
            <p className="news__text">
              {getKeyWordsHighlightedText(
                it.text,
                inputReference.current?.value,
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

const getRandomNumber = (max: number) => Math.floor(Math.random() * max)

// eslint-disable-next-line unicorn/prevent-abbreviations
export const getServerSideProps: GetServerSideProps = async () => {
  const lorem =
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut, exercitationem officiis reiciendis illum corporis voluptatibus quis suscipit quo repellat praesentium aliquam error provident minima exvero neque eum deleniti dignissimos!'
  const words = lorem.split(' ')
  const getRandomWordIndex = () => getRandomNumber(words.length - 1) + 1
  const news = Array.from({
    length: getRandomNumber(30),
  })
    .fill('')
    .map(() => ({
      title: words[getRandomWordIndex()],
      text: words.slice(getRandomWordIndex(), words.length).join(' '),
      date: new Date(
        `20${18 + getRandomNumber(4)}-${getRandomNumber(12) + 1}-${
          getRandomNumber(28) + 1
        }`,
      ),
    }))
    .sort((a, b) => a.date.valueOf() - b.date.valueOf())
    .map((it) => ({ ...it, date: it.date.toLocaleDateString() }))

  return {
    props: {
      news,
    },
  }
}

export default News
