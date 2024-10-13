import { GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";

export interface PostListPageProps {
    posts: any[]
}

export default function PostIndex({posts}: PostListPageProps) {
    console.log('Lần 1')
    return <div>
        <h1>Post list</h1>
        <ul>
            {
                posts.map(post => 
                    <li key={post.id}>
                        <Link href={`/post/${post.id}`}>{post.title}</Link>
                    </li>)
            }
        </ul>
    </div>
}

export const getStaticProps : GetStaticProps<PostListPageProps> = async (
    context: GetStaticPropsContext
) => {
    // server-side
    // build-time
    console.log('static props:' + new Date())
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();

    return {
        props: {
            posts: data.map((x:any) => ({
                id: x.id,
                title: x.title
            })).slice(0, 10)
        }
    }
}