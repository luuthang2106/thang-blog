import PostForm from "../../../components/post-form";
import AdminLayout from "../../../layouts/admin-layout";
import { useRouter } from 'next/router'
export default function EditPost() {
    const router = useRouter()
    const { id } = router.query
    return (
        <div>
            <PostForm id={id}></PostForm>
        </div>
    )
}
EditPost.Layout = AdminLayout