import Link from 'next/link'

export default function AdminLayout({ children }) {
  return (
    <div style={{ height: '100vh', display: 'flex' }}>
      <div style={{ width: '25%' }} className='vertical-menu'>
        <Link href='/admin/tag'><div>Tag</div></Link>
        <Link href='/admin/post'><div>Post</div></Link>
      </div>
      <div style={{ width: '75%', padding: '12px' }}>{children}</div>
    </div>
  )
}