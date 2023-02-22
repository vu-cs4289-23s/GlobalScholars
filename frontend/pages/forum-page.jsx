import SideBar from "../components/all-pages/sidebar";
import CityDescription from "../components/forum/city/city-description.jsx";

export default function ForumPage() {
  return (
    <div id="forum-page" className="flex h-screen w-screen">
      <div className="w-[15%] ">
        <SideBar />
      </div>
      <div className="w-[85%]">
        <img className="flex h-1/4 w-screen object-center object-cover" src="frontend/assets/img.png" />
        <div className=" flex h-3/4 text-4xl bg-blue-200"></div>
      </div>
      <div className="absolute top-52 w-[85%] left-[15%]">
        <CityDescription />
      </div>
    </div>
  );
}
