import { useState, useEffect } from "react";
export default function Autocomplete() {
    let timeout;
    const [posts, setPosts] = useState([])
    const debounceSearch = (e) => {
        const value = e.target.value
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            console.log(value)
        }, 2000);
    }
    return (
        <div className="autocomplete">
            <input className="input-search" placeholder="Tìm kiếm..." onChange={debounceSearch} />
        </div>
    )
}