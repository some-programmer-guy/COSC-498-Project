import { HomePageVM } from "./home-page-presenter";

type HomePageProps = {
    viewModel: HomePageVM
}

export default function HomePage({ viewModel }: HomePageProps) {
    return (
        <>
            <p>Hello world.</p>
        </>
    );
}