import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import React from 'react';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';
const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});
export default function PostForm({ id }) {
    const router = useRouter()
    const [error, setError] = useState(null)
    const [tags, setTags] = useState([])
    const [form, setForm] = useState({
        id: id ?? '',
        postTitle: '',
        postSlug: '',
        content: '',
        imageUrl: '',
        isPublished: false,
        counterId: '',
        tagId: ''
    })
    useEffect(async () => {
        if (id) {
            const res = await fetch(
                `/api/admin/post/${id}`,
            );
            const post = await res.json()
            setForm(post)
        }
        const resTags = await fetch(
            '/api/admin/tags',
        );
        const tags = await resTags.json();
        setTags(tags);
    }, [id])
    const editor = useRef();

    const buttonList = [
        ["undo", "redo"],
        ["font", "fontSize", "formatBlock", "blockquote"],
        ["bold", "underline", "italic", "strike"],
        ["outdent", "indent", "align", "horizontalRule", "list", "lineHeight", "table", "link"],
        ["image", "imageGallery"]
    ]


    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };
    const submit = async (event) => {
        event.preventDefault()
        const data = { ...form, content: editor.current.getContents() }
        const res = await fetch('/api/admin/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        if (res.status === 204) {
            if (typeof window !== 'undefined') {
                router.push('/admin/post')
            }
        } else {
            setError(res.status)
        }

    }
    const onImageUploadBeforeHandler = (files, info, uploadHandler) => {
        const formData = new FormData()
        files.forEach(file => formData.append('images', file))
        window.fetch(
            '/api/upload',
            {
                method: 'POST',
                body: formData,
            }
        ).then(res => res.json().then(filesUploaded => {
            const response = {
                result: [
                    {
                        url: `/images/${filesUploaded[0].originalname}`,
                        name: filesUploaded[0].originalname,
                        size: filesUploaded[0].size,
                    },
                ]
            }
            uploadHandler(response)
        }));
    }
    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('images', file)
        const res = await window.fetch('/api/upload',
            {
                method: 'POST',
                body: formData,
            })
        const data = await res.json()
        setForm({ ...form, imageUrl: `/images/${data[0].originalname}` })

    }
    const slugify = (slug) => {
        slug += `-${new Date().toLocaleDateString('vi-VN')}`
        slug = slug.toLowerCase();

        //?????i k?? t??? c?? d???u th??nh kh??ng d???u
        slug = slug.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/gi, 'a');
        slug = slug.replace(/??|??|???|???|???|??|???|???|???|???|???/gi, 'e');
        slug = slug.replace(/i|??|??|???|??|???/gi, 'i');
        slug = slug.replace(/??|??|???|??|???|??|???|???|???|???|???|??|???|???|???|???|???/gi, 'o');
        slug = slug.replace(/??|??|???|??|???|??|???|???|???|???|???/gi, 'u');
        slug = slug.replace(/??|???|???|???|???/gi, 'y');
        slug = slug.replace(/??/gi, 'd');
        //X??a c??c k?? t??? ?????t bi???t
        slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
        //?????i kho???ng tr???ng th??nh k?? t??? g???ch ngang
        slug = slug.replace(/ /gi, "-");
        //?????i nhi???u k?? t??? g???ch ngang li??n ti???p th??nh 1 k?? t??? g???ch ngang
        //Ph??ng tr?????ng h???p ng?????i nh???p v??o qu?? nhi???u k?? t??? tr???ng
        slug = slug.replace(/\-\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-/gi, '-');
        slug = slug.replace(/\-\-/gi, '-');
        //X??a c??c k?? t??? g???ch ngang ??? ?????u v?? cu???i
        slug = '@' + slug + '@';
        slug = slug.replace(/\@\-|\-\@|\@/gi, '');

        return slug;
    }
    return (
        <form className="pure-form pure-form-stacked" onSubmit={submit}>
            <fieldset>
                <legend>Post Form</legend>
                <label>Post Name</label>
                <input className="pure-input-1" type="text" value={form.postTitle} onChange={e => setForm({ ...form, postTitle: e.target.value, postSlug: slugify(e.target.value) })} />
                <label >Post Slug</label>
                <input readOnly className="pure-input-1" type="text" value={form.postSlug} />
                <label >Post Image</label>
                <input type="file" className="pure-input-1-2" accept="image/png, image/jpeg" onChange={handleImageUpload} />
                {
                    form.imageUrl ? <img width="300" height="300" src={form.imageUrl} /> : <></>
                }
                <label>Tag</label>
                <select className="pure-input-1-2" value={form.tagId} onChange={e => setForm({ ...form, tagId: e.target.value })}>
                    <option value="">Ch???n Tag</option>
                    {tags.map((tag, idx) => <option key={idx} value={tag.id}>{tag.tagName}</option>)}
                </select>
                <label className="pure-checkbox">
                    <input checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} type="checkbox" /> Is Published</label>
                <SunEditor setContents={form.content} getSunEditorInstance={getSunEditorInstance} setOptions={{
                    buttonList: buttonList, rtl: false,
                    katex: "window.katex", videoFileInput: false, imageGalleryUrl: '/api/image-gallery',
                }} onImageUploadBefore={onImageUploadBeforeHandler} />
                <br />
                <button type="submit" className="pure-button pure-button-primary">Submit</button>
            </fieldset>
            <div style={{ color: 'red' }}>{error}</div>
        </form>
    )
}