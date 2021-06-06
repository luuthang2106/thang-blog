import AdminLayout from "../../layouts/admin-layout"
import { useRouter } from 'next/router'
import React from 'react'
export default function Index() {
    const router = useRouter()
   // Make sure we're in the browser
   if (typeof window !== 'undefined') {
     router.push('/admin/tag')
   }
   return (React.Fragment)
}
Index.Layout = AdminLayout