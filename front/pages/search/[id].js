import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Kakao } from '../../components/BookSearch/kakaoRequest'
import AppLayout from '../../components/Layout/AppLayout'
import styled from 'styled-components'
import ReviewWriteForm from '../../components/BookSearch/ReviewWriteForm'

const ReveiwWriteWrapper = styled.div`
  margin: 50px auto;
  width: 900px;
`

const Search = ({ result }) => {
  const router = useRouter()
  // const { id } = router.query

  useEffect(() => {
    console.log('뻐킹값', result)
  }, [])

  return (
    <AppLayout>
      <ReveiwWriteWrapper>
        {result.map((book, index) => (
          <ReviewWriteForm
            key={index}
            thumbnail={book.thumbnail}
            title={book.title}
            author={book.authors}
            publisher={book.publisher}
            price={book.price}
            contents={book.contents}
            datetime={book.datetime.slice(0, 10)}
          />
        ))}
      </ReveiwWriteWrapper>
    </AppLayout>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.query

  const bookIsbnSearch = params => {
    return Kakao.get('/v3/search/book?target=isbn', { params })
  }
  const params = {
    query: id.substring(10), //isbn 공백포함 11글자
    size: 1,
    sort: 'accuracy',
  }
  const { data } = await bookIsbnSearch(params)
  const result = data.documents

  console.log('결과', result)
  return { props: { result } }
}

export default Search