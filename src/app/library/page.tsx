import LibraryPage from "@/adapter/output/presentation/pages/library-page/library-page"
import { LibraryPagePresenter } from "@/adapter/output/presentation/pages/library-page/library-page-presenter";
export default async function Page() {
    const viewModel = await LibraryPagePresenter();
    
    return (
        <LibraryPage viewModel={viewModel}></LibraryPage>
    );
}