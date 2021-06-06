import AdminLayout from "../../../layouts/admin-layout";
import Link from 'next/link'
import { useEffect, useState } from 'react'
export default function Index() {
    const [state, setState] = useState(true)
    const [error, setError] = useState(null)
    const [posts, setPosts] = useState([])
    useEffect(async () => {
        const res = await fetch(
            '/api/admin/posts',
        );
        const posts = await res.json();
        setPosts(posts);
    }, [state]);

    const deletePost = async (id) => {
        const result = window.confirm('Delete this post?');
        if (result) {
            const res = await fetch(
                `/api/admin/post/delete/${id}`
            );
            if (res.status === 204) {
                setState(!state)
            } else {
                setError(res.status)
            }
        }
    }
    return (
        <div style={{ width: '100%' }}>
            <Link href='/admin/post/new'>
                <button className="pure-button pure-button-primary">Add Post</button>
            </Link>

            <table style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Tag</th>
                        <th>Image</th>
                        <th>Is Published</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.map((post, idx) => <tr key={idx}>
                            <td>{post.postTitle}</td>
                            <td>{post.tag?.tagName || 'chưa có tag'}</td>
                            <td>
                                <img style={{ width: '200px', objectFit: 'cover' }} src={post.imageUrl || 'https://via.placeholder.com/140x70?text=image'} />
                            </td>
                            <td>
                                <input type="checkbox" defaultChecked={post.isPublished} />
                            </td>
                            <td>{new Date(post.createdAt).toLocaleDateString("vi-VN")}</td>
                            <td>{new Date(post.updatedAt).toLocaleDateString("vi-VN")}</td>
                            <td>
                                <span style={{ cursor: 'pointer' }} onClick={() => deletePost(post.id)}>Del</span>
                                -
                                <Link href={`/admin/post/${post.id}`}><a>Edit</a></Link>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
            <div style={{ color: 'red' }}>{error}</div>
        </div>
    )
}
Index.Layout = AdminLayout