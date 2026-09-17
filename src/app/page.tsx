import HomePage from "@/adapter/output/presentation/pages/home-page/home-page";
import { HomePagePresenter } from "@/adapter/output/presentation/pages/home-page/home-page-presenter";

export default async function Page() {
    const viewModel = await HomePagePresenter();
    return <HomePage viewModel={viewModel}></HomePage>
}