import { useRouter } from "next/router";

export default function PostDetail() {
    const router = useRouter();

    return (
        <div>
            <h1>Post Params</h1>
            <p>Query: {JSON.stringify(router.query)}</p>
        </div>
    )
}

export async function getServerSideProps() {
    //fake slow query
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return {
        props: {}
    };
}