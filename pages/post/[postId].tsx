import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";

export interface PostPageProps {
    post: any
}

export default function PostDetail({post}: PostPageProps) {
    const router = useRouter();
    console.log(post);

    return (
        <div>
            <h1>Post Detail</h1>
            <p>Query: {JSON.stringify(router.query)}</p>
            <p>Title: {post.title}</p>
            <p>Body: {post.body}</p>
        </div>
    )
}

export const getStaticPaths : GetStaticPaths = async() => {
    console.log('\nGET STATIC PATHS');

    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();

    return {
        paths: data.map((post: any) => ({ params: { postId: post.id + '' }})).slice(0, 10),
        fallback: false
    }
}

export const getStaticProps : GetStaticProps<PostPageProps> = async(
    context: GetStaticPropsContext
) => {
    let id = context.params?.postId;
    console.log('\nGET STATIC PROPS', id);
    if(!id) return { notFound: true };

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const data = await response.json();
    console.log(data)
    return {
        props: {
            post: data
        }
    }
}