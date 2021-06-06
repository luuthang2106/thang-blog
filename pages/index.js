import UserLayout from "../layouts/user-layout"
import ListPost from "../components/list-post"
import {useState, useEffect} from 'react'
export default function Index() {
  const [data, setData] = useState({posts: [], total: 0})
  useEffect(async () => {
    const res = await window.fetch(`/api/posts?page=1`)
        const data = await res.json()
        setData(data)
  }, [])
  return (
      <ListPost data={data} />
  )
}
Index.Layout = UserLayout;