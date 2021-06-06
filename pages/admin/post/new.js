import PostForm from "../../../components/post-form";
import AdminLayout from "../../../layouts/admin-layout";

export default function NewPost() {
    return (
        <div>
            <PostForm></PostForm>
        </div>
    )
}
NewPost.Layout = AdminLayout