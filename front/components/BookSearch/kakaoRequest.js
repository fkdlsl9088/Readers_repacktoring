import axios from 'axios'

export const Kakao = axios.create({
  baseURL: 'https://dapi.kakao.com',
  headers: {
    // NEXT_PUBLIC 을 붙여야 클라이언트에서 접근가능
    Authorization: process.env.NEXT_PUBLIC_KAKAO_KEY,
  },
  // kakaoApi 요청시 withCredentials : true 시 network error 발생
  withCredentials: false,
})

export const kakaoRequest = params => {
  return Kakao.get('/v3/search/book', { params })
}
