import UserLayout from "../../../layouts/user-layout"
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import ListPost from "../../../components/list-post"

export default function Page() {
    const router = useRouter()
    const { page, slug } = router.query
    const [data, setData] = useState({ posts: [], total: 0 })
    useEffect(async () => {
        if (slug && page) {
            const res = await window.fetch(`/api/posts?page=${page}&tag=${slug}`)
            const data = await res.json()
            setData(data)
        }
    }, [page, slug])
    return (
        <ListPost data={data} />
    )
}
Page.Layout = UserLayout