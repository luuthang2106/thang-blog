import TagForm from "../../../components/tag-form"
import AdminLayout from "../../../layouts/admin-layout"
import { useRouter } from 'next/router'

export default function EditTag() {
    const router = useRouter()
  const { id } = router.query
    return (
        <div>
            <TagForm id={id}></TagForm>
        </div>
    )
}
EditTag.Layout = AdminLayout