import EditBookPage from "@/adapter/output/presentation/pages/edit-book-page/edit-book-page";

export default function Page() {
    return (
        <EditBookPage viewModel={{
            book: {
                author: '',
                chapters: [],
                coverURL: '/',
                genre: '',
                title: '',
                id: 1,
                lastChapterId: 0
            }
        }} mode='new'>
        </EditBookPage>
    )
}