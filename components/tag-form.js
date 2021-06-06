import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
export default function TagForm({ id }) {

    const router = useRouter()
    const [error, setError] = useState(null)
    const [form, setForm] = useState({
        id: id ?? '',
        tagName: '',
        tagSlug: '',
        isPublished: false,
    })
    useEffect(async () => {
        if (id) {
            const res = await fetch(
                `/api/admin/tag/${id}`,
            );
            const tag = await res.json()
            setForm(tag)
        }
    }, [id])

    const submit = async event => {
        event.preventDefault()
        const res = await fetch('/api/admin/tag', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form),
        })
        if (res.status === 204) {
            if (typeof window !== 'undefined') {
                router.push('/admin/tag')
              }
        } else {
            setError(res.status)
        }

        
    }
    return (
        <form className="pure-form pure-form-stacked" onSubmit={submit}>
            <fieldset>
                <legend>Tag Form</legend>
                <label>Tag Name</label>
                <input type="text" value={form.tagName} onChange={e => setForm({ ...form, tagName: e.target.value, tagSlug: e.target.value.toLowerCase() })} />
                <label >Tag Slug</label>
                <input readOnly type="text" value={form.tagSlug} />
                <label className="pure-checkbox">
                    <input checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} type="checkbox" /> Is Published</label>
                <button type="submit" className="pure-button pure-button-primary">Submit</button>
            </fieldset>
            <div style={{color: 'red'}}>{error}</div>
        </form>
    )
}