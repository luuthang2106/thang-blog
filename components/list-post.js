import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
export default function ListPost({ data }) {
    const itemsPerPage = 8;
    const router = useRouter()
    const [activePage, setActivePage] = useState(0)
    const { page } = router.query

    useEffect(() => {
        if (page !== undefined) {
            setActivePage(parseInt(page))
        } else {
            setActivePage(1)
        }
    }, [page])
    const imgUrl = ({ imageUrl, tag: { tagSlug } }) => {
        if (!imageUrl) {
            if (tagSlug) {
                return `/${tagSlug}.jpg`
            }
        }
        return imageUrl
    }
    const Post = ({ post }) => {
        return (
            <div className="post-card">
                <div className="image">
                    <div className="container">
                        <img src={imgUrl(post)} />
                    </div>
                </div>
                <div className="body-card">
                    <Link href={`/${post.tag.tagSlug}`}>
                        <div className="post-card-tag">
                            <span>{post.tag.tagName}</span>
                            <span>{new Date(post.updatedAt).toLocaleDateString("vi-VN")}</span>
                        </div>
                    </Link>
                    <div className="post-card-title">{post.postTitle}</div>
                    <div className="post-card-actions" >
                        <Link href={`/post/${post.postSlug}`}>
                            <a className="pure-button pure-button-primary">Đọc ngay</a>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    const genUrl = (idx) => {
        const { slug } = router.query

        if (slug) {
            return `/${slug}/page/${idx}`
        } else {
            return `/page/${idx}`
        }
    }
    const Paginator = ({ total, activePage = 1 }) => {
        const pages = (total % itemsPerPage > 0) ? (Math.floor(total / itemsPerPage) + 1) : (total / itemsPerPage)
        const arr = []
        for (let i = 0; i < pages; i++) {
            arr.push(i + 1)
        }
        return (
            <>
                {arr.map((e) => <Link key={e} href={genUrl(e)}><div onClick={(e) => {const ele = document.querySelector('div.w-992.body > div.body-left > div'); ele.scrollTo({top: 0, behavior: 'smooth'})}} className={activePage === e ? 'active' : ''}>{e}</div></Link>)}
            </>
        )

    }
    return (
        <div style={{ overflowY: 'scroll', height: '100%', padding: '0 10px' }}>
            {
                data.posts.map((post, idx) => <Post key={idx} post={post} />)
            }
            <div className="paginator">
                {
                    <Paginator total={data.total} activePage={activePage} />
                }
            </div>
        </div>
    )
}

