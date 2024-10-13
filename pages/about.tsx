import Header from "@/components/common/header";
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react";

//ssr: false: component Header sẽ không được render server
//const Header = dynamic(() => import("@/components/common/header"), { ssr: false})

export interface AboutPageProps {}

export default function About(props: AboutPageProps) {
    const [postList, setPostList] = useState([]);
    const router = useRouter();
    console.log(router.query);

    const pageCurrent = router.query?.page;

    //useEffect chỉ được chạy ở phía client
    useEffect(() => {
        if(!pageCurrent) return;
        const page = Number(pageCurrent || 1);

        (async() => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
            const data = await response.json();
            const start = (page - 1) * 10;
            setPostList(data.slice(start, start + 10));
        })();
    }, [pageCurrent]);

    function handleNextClick() {
        router.push({
            pathname: 'about',
            query: {
                page: Number(pageCurrent || 0) + 1
            }
        },
        undefined,
        //chỉ update bên client, k chạy lại getStaticProp nữa
        { shallow: true })
    }

    return <div>
        <h1>About Page</h1>
        
        <Header />

        <ul className="post-list">
        {
            postList.map((post: any) => 
                <li key={post.id}>{post.title}</li>
        )}
        </ul>
        <button onClick={handleNextClick}>Next page</button>
    </div>
}

export async function getStaticProps() {
    console.log('Get Static props')
    return {
        props: {}
    }
}

//Server Side rendering
// export async function getServerSideProps() {
//     return {
//         props: {}
//     }
// }