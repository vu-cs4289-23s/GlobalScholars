import SideBar from "../components/all-pages/sidebar";

export default function ForumPage() {
  return (
    <div id="forum-page" className="flex h-screen w-screen grid-cols-2">
      <SideBar />
      <div className="w-screen">
        <div className="flex h-1/4 justify-center text-4xl bg-blue-600">
          Forum Header
        </div>

        <div className="flex h-3/4 justify-center text-4xl bg-white">
          Forum Contents
        </div>
      </div>
    </div>
  );
}
