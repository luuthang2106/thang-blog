import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import UserLayout from '../../layouts/user-layout'

export default function PostView() {
    const router = useRouter()

    const { slug } = router.query
    const [post, setPost] = useState({})

    useEffect(async () => {
        if (!(slug === undefined)) {
            const res = await fetch(`/api/post/${slug}`)
            const post = await res.json()
            setPost(post)
        }
    }, [slug])
    return (
        <>
            <button onClick={router.back} className="pure-button pure-button-primary">Trở về</button>
            <div className="post-content">
                <div className="post-title">{post.postTitle}</div>
                <div className="post-image-container">
                <img className="post-image" src={post.imageUrl} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
        </>
    )
}
PostView.Layout = UserLayout