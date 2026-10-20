import PageTitle from "../../components/headers/page-title";
import { HomePageVM } from "./home-page-presenter";

type HomePageProps = {
    viewModel: HomePageVM
}

export default function HomePage({ viewModel }: HomePageProps) {
    return (
        <>
            <PageTitle text='Home'/>
        </>
    );
}
