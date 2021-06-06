import React, { useEffect, useState } from 'react'
export function Accordion({ children = [], active = -1 }) {
    const [activeKey, setActiveKey] = useState(active)
    const childrens = !(!!children.length) ? [children] : children
    const tabs = childrens.map((child, idx) => <AccordionTab key={idx} setActiveKey={setActiveKey} ownKey={idx} activeKey={activeKey} header={child.props.header} children={child.props.children} />
    )
    return (
        <div className="accordion">
            {tabs}
        </div>
    )
}
export function AccordionTab({ children= [], header, activeKey, ownKey, setActiveKey }) {
    const [scrollHeight, setScrollHeight] = useState()
    useEffect(() => {
        const panel = document.getElementById(`acc-panel-${ownKey}`)
        setScrollHeight(panel.scrollHeight)
    }, [children])

    return (
        <>
            <button  onClick={() => (activeKey === ownKey) ? setActiveKey(-1) : setActiveKey(ownKey)} className={"text-header accordion-tab " + (ownKey === activeKey ? "active" : "")}>{header}</button>
            <div id={"acc-panel-" + ownKey} className="accordion-panel" style={{maxHeight: (ownKey === activeKey) ? `${scrollHeight}px` : "0px"}}>
                {children}
            </div>
        </>
    )
}