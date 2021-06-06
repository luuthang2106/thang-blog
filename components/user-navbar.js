import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Autocomplete from './autocomlete';
export default function UserNavbar({ tags }) {
    const router = useRouter()
    const { slug } = router.query
    const [activeSlug, setActiveSlug] = useState('')
    const listTag = tags.map((tag, idx) => <NavItem activeSlug={activeSlug} key={idx + 1} title={tag.tagName} slug={tag.tagSlug}></NavItem>)

    useEffect(() => {
        if (slug !== undefined) {
            setActiveSlug(slug)
        }
    }, [slug])
    function NavItem({ title, slug, activeSlug }) {
        return (
            <Link href={`/${slug}`}>
                <div onClick={() => setActiveSlug(slug)} className={"user-nav-item " + (activeSlug === slug ? "active" : "")}>
                    {title}
                </div>
            </Link>)
    }
    return (
        <div className="user-navbar">
            <div className="left">
                <Link href="/"><img src="/logo.svg" /></Link>
                <div style={{ width: '1rem' }}></div>
                <Autocomplete/>
            </div>
            <div className="right">
                <NavItem activeSlug={activeSlug} key="0" title="Home" slug=""></NavItem>
                {listTag}
                <NavItem activeSlug={activeSlug} key="99" title="About" slug="about"></NavItem>
            </div>
        </div>
    );
}
