import AdminLayout from "../../../layouts/admin-layout";
import Link from 'next/link'
import { useEffect, useState } from 'react'
export default function Index() {
    const [state, setState] = useState(true)
    const [error, setError] = useState(null)
    const [tags, setTags] = useState([])
    useEffect(async () => {
        const res = await fetch(
            '/api/admin/tags',
        );
        const tags = await res.json();
        setTags(tags);
    }, [state]);
    const deleteTag = async (id) => {
        const result = window.confirm('Delete this tag?');
        if (result) {
            const res = await fetch(
                `/api/admin/tag/delete/${id}`
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
            <Link href='/admin/tag/new'>
                <button className="pure-button pure-button-primary">Add Tag</button>
            </Link>

            <table style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tags.map((tag, idx) => <tr key={idx}>
                            <td>{tag.tagName}</td>
                            <td>{tag.tagSlug}</td>
                            <td>{new Date(tag.createdAt).toLocaleDateString("vi-VN")}</td>
                            <td>{new Date(tag.updatedAt).toLocaleDateString("vi-VN")}</td>
                            <td>
                                <span style={{cursor: 'pointer'}} onClick={() => deleteTag(tag.id)}>Del</span>
                                -
                                <Link href={`/admin/tag/${tag.id}`}><a>Edit</a></Link>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
            <div style={{color: 'red'}}>{error}</div>
        </div>
    )
}
Index.Layout = AdminLayout