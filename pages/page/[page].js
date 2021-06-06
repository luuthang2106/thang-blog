import ListPost from "../../components/list-post";
import { useState, useEffect } from 'react'
import UserLayout from "../../layouts/user-layout";
import { useRouter } from 'next/router'
export default function Page() {
    const router = useRouter()
    const { page } = router.query
    const [data, setData] = useState({ posts: [], total: 0 })
    useEffect(async () => {
        const res = await window.fetch(`/api/posts?page=${page}`)
        const data = await res.json()
        setData(data)
    }, [page])
    return (
        <ListPost data={data} />
    )
}
Page.Layout = UserLayout