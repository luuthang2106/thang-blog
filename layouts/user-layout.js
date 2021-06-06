import UserNavbar from "../components/user-navbar"
import React, { useState, useEffect } from 'react'
import UserNavbarMobile from "../components/user-navbar-mobile";
import { Accordion, AccordionTab } from "../components/accordion";
import Link from "next/link";

export default function UserLayout({ children }) {
    const [width, setWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(false)
    const [tags, setTags] = useState([])
    const [popularPosts, setPopularPosts] = useState([])


    useEffect(async () => {
        if (!tags.length) {
            const res = await fetch(
                '/api/tags',
            );
            const tags = await res.json();
            setTags(tags);
        }
        if (!popularPosts.length) {
            const res = await fetch(
                '/api/posts/popular',
            );
            const posts = await res.json();
            setPopularPosts(posts);
        }
        setWidth(window.innerWidth)

        if (width < 768) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

    }, [width])

    const handleResize = () => {
        setWidth(window.innerWidth)
    }
    return (
        <div className="user-layout">
            <div className="navbar">
                <div className="w-992">
                    {isMobile ? <UserNavbarMobile popularPosts={popularPosts} tags={tags} /> : <UserNavbar tags={tags} />}
                </div>
            </div>
            <div className="w-992 body">
                <div className="body-left" style={{ width: isMobile ? '100%' : '66.66667%' }}>
                    {children}
                </div>
                <div className="body-right" style={{ width: '33.33333%', display: isMobile ? 'none' : 'block' }}>
                    <Accordion active={0}>
                        <AccordionTab header={'Bài viết nổi bật'}>
                            {
                                popularPosts.map((post, idx) => <Link key={idx} href={`/post/${post.postSlug}`}><div className="accordion-item accordion-post-item">
                                    <div className="header">
                                        {post.tag.tagName}
                                    </div>
                                    <div className="content">
                                        {post.postTitle}
                                    </div>
                                </div></Link>)
                            }
                        </AccordionTab>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}
