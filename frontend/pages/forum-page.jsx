import SideBar from "../components/all-pages/sidebar";

export default function ForumPage() {
  return (
    <div id="forum-page" className="flex h-screen w-screen grid-cols-2" >
        <div className="w-[15%] "><SideBar/></div>
        <div className= "w-[85%]">
          <div className="flex h-1/4 justify-center text-4xl bg-blue-600"> Profile Header </div>

          <div className="flex h-3/4 justify-center text-4xl bg-white"> Profile Contents </div>
        </div>  
      </div>
    
  );
}
