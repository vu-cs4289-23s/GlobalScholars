import SideBar from "../components/all-pages/sidebar";
import CityDescription from "../components/forum/city/city-description.jsx";
import CityPost from "../components/forum/city/city-post.jsx";

export default function NewPost() {
    return (
        <div className="w-full h-[100vh] flex flex-row">
            <SideBar />
            <CityPost />
        </div>
    );
}