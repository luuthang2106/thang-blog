import { useRouter } from 'next/router'
import ListPost from '../../components/list-post'
import UserLayout from '../../layouts/user-layout'
import { useState, useEffect } from 'react'

export default function Tag() {
    const router = useRouter()
    const { slug } = router.query
    const [data, setData] = useState({ posts: [], total: 0 })
    useEffect(async () => {
        if (slug) {
            const res = await window.fetch(`/api/posts?tag=${slug}&page=1`)
            const data = await res.json()
            setData(data)
        }
    }, [slug])
    return (
            <ListPost data={data} />
    )
}
Tag.Layout = UserLayout