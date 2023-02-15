import SearchBar from "../components/landing-page/search-bar";
import SideBar from "../components/all-pages/sidebar";

export default function LandingPage() {

  return (
    <div id="forum-page" className="flex h-screen w-screen grid-cols-2" >
        <div className="w-[15%] "><SideBar/></div>
        <div className= "w-[85%]">
          <div className="flex flex-col h-1/3  bg-blue-600">
            <div className= "grid  m-3 p-10 gap-2">
                <div className= "flex h-1/2 justify-center items-center text-4xl">
                    Study Abroad Search
                </div>
                <div className= "flex h-1/2 justify-center items-bottom text-4xl">
                    <SearchBar/>
                </div>
              </div>
          </div>

          <div className="flex h-2/3 justify-center text-4xl bg-white"> Landing Contents </div>
        </div>  
    </div>
  );


}
