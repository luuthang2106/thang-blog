import Link from 'next/link'
import React, { useState } from 'react';
import { Accordion, AccordionTab } from './accordion';
export default function UserNavbarMobile({ tags, popularPosts }) {
    const [activeSlug, setActiveSlug] = useState('/')
    const [isOpen, setIsOpen] = useState(false)
    const openNav = () => {
        setIsOpen(true)
    }
    const closeNav = () => {
        setIsOpen(false)
    }
    return (
        <>
            <div className="user-navbar-mobile">
                <div className="trigger-button" onClick={openNav}>&#9776;</div>
                <Link href="/"><img src="logo.svg" /></Link>
                <div className="trigger-button" style={{ visibility: 'hidden' }}>&#9776;</div>
            </div>
            <div className="side-navbar" style={{ width: isOpen ? '100%' : '0px' }}>
                <div className="close-navbar" onClick={closeNav}>&times;</div>
                <div className="navbar-items">
                    <input className="input-search" placeholder="Tìm kiếm" />
                    <hr />
                    <Link href="/">
                        <div onClick={closeNav} className="text-header navbar-item">Home</div>
                    </Link>
                    <Accordion>
                        <AccordionTab header="Chủ đề">
                            {
                                tags.map((tag, idx) => <Link key={idx} href={`/${tag.tagSlug}`}><div className="accordion-item" onClick={() => { closeNav(); setActiveSlug(tag.tagSlug) }}>{tag.tagName}</div></Link>)
                            }
                        </AccordionTab>
                        <AccordionTab header="Bài viết nổi bật">
                            {
                                popularPosts.map((post, idx) => <Link key={idx} href={`/post/${post.postSlug}`}><div onClick={closeNav} className="accordion-item">{post.postTitle}</div></Link>)
                            }
                        </AccordionTab>
                    </Accordion>
                    <Link href="/about">
                        <div onClick={closeNav} className="text-header navbar-item">About</div>
                    </Link>
                </div>
            </div>
        </>
    )
}