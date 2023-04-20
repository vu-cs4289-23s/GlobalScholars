import SideBar from '../components/all-pages/sidebar';
import FilterBar from '../components/forum/all-forums/filter-bar.jsx';
import AdvancedFilter from '../components/forum/all-forums/advanced-filter.jsx';
import ForumPost from '../components/all-pages/post.jsx';
import Tag from '../components/forum/all-forums/tag.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getUserAsyncAction, logoutAction } from '../redux/user/user-slice';
import {
  getAllPostsAsyncAction,
  getPostsByProgramAsyncAction,
} from '../redux/post/post-slice.js';
import ProgramDescription from '../components/forum/program/program-description.jsx';
import { getForumDataByName } from '../redux/geo/geo-slice.js';
import SearchBar from '../components/landing-page/search-bar.jsx';
import { program_tags } from '../../data.js';

export default function ProgramForumPage() {
  let { userInfo, loggedIn, success } = useSelector((state) => state.user);
  let { programInfo } = useSelector((state) => state.geo);
  let { postInfo } = useSelector((state) => state.post);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name } = useParams();
  let [program, setProgram] = useState({
    program_name: 'Program Name',
    description: '',
    terms: [],
    top_tags: [],
    overall_rating: 0,
    image_link:
      'https://cdn.vanderbilt.edu/vu-wp0/wp-content/uploads/sites/234/2017/12/11205619/brochure_1170.jpg',
    like_cnt: 0,
  });
  let [posts, setPosts] = useState([]);
  let [allPosts, setAllPosts] = useState([]);

  let [showAdvanced, setShowAdvanced] = useState(false);
  let [showClear, setShowClear] = useState(false);
  let [selectedTags, setSelectedTags] = useState([]);
  const onClickX = () => {
    setShowAdvanced(false);
    setSelectedTags([]);
  };
  const onClickTag = (ev) => {
    let arr = selectedTags;
    const tagID = ev.target.id;
    const index = arr.indexOf(tagID);
    // check if tag is in the array
    if (index === -1) {
      // not in the arr so add it
      arr.push(tagID);
      // highlight
      document.getElementById(tagID).style.outline = '#000000 solid 2px';
    } else {
      // already in arr so remove it
      arr.splice(index, 1);
      // remove highlighting
      document.getElementById(tagID).style.outline = '';
    }
    setSelectedTags(arr);
  };
  let tags = program_tags.map((tag, i) => {
    return <Tag key={i} id={tag.id} opacity={100} onClick={onClickTag} />;
  });
  const onClickFilter = () => {
    setShowAdvanced(false);
    setShowClear(true);
    if (selectedTags !== []) {
      let arr = [];
      selectedTags.forEach((tag) => {
        allPosts.forEach((post) => {
          if (post.tags.includes(tag)) {
            arr.push(post);
          }
        });
      });
      setPosts(arr);
    }
  };
  const onClickClear = () => {
    setSelectedTags([]);
    setPosts(allPosts);
    setShowClear(false);
  };

  const logOutHandle = () => {
    dispatch(logoutAction());
  };

  useEffect(() => {
    if (success && !loggedIn) {
      navigate('/login');
    }
    if (loggedIn === false && userInfo.username !== '') {
      dispatch(getUserAsyncAction(userInfo.username));
    }
  }, [loggedIn, userInfo]);

  // Get forum data by name in url
  useEffect(() => {
    if (name !== undefined) {
      dispatch(getForumDataByName(name));
    }
  }, [name]);

  useEffect(() => {
    // Set Program data
    if (programInfo && programInfo.program_name !== '') {
      setProgram({
        program_name: programInfo.program_name,
        terms: programInfo.terms,
        description: programInfo.description,
        location: programInfo.location,
        top_tags: programInfo.top_tags,
        overall_rating: programInfo.overall_rating,
        image_link: programInfo.image_link,
        like_cnt: programInfo.like_cnt,
      });
    }
  }, [programInfo]);

  useEffect(() => {
    if (program.program_name && program.program_name !== 'Program Name') {
      // Fetch posts by city name passed through
      dispatch(getPostsByProgramAsyncAction(program.program_name));
    } else {
      dispatch(getAllPostsAsyncAction());
    }
  }, [program]);

  // set posts react state with postInfo from redux state
  useEffect(() => {
    setPosts(postInfo);
    setAllPosts(postInfo);
  }, [postInfo]);

  return (
    <div
      id="forum-page"
      className="flex h-screen w-screen bg-blue-rgba overflow-hidden"
    >
      <SideBar />
      <div className="bg-blue-light overflow-y-scroll">
        <img
          className="flex h-[30%] w-screen object-center object-cover"
          src={program.image_link}
        />
        {name ? (
          <div></div>
        ) : (
          <div className="absolute top-10 z-1 w-[85%] h-[60%] sm:h-[77%]">
            <SearchBar forum={true} />
            <FilterBar
              posts={posts}
              setPosts={setPosts}
              onClickAdvanced={() => setShowAdvanced(true)}
              showClear={showClear}
              onClickClear={onClickClear}
            />
          </div>
        )}

        <div className="absolute top-44 z-1 w-[85%] overflow-scroll h-[60%] sm:h-[77%]">
          {name && (
            <div>
              <ProgramDescription
                program={program.program_name}
                terms={program.terms}
                top_tags={program.top_tags}
                overall_rating={program.overall_rating}
              />
              <FilterBar
                posts={posts}
                setPosts={setPosts}
                onClickAdvanced={() => setShowAdvanced(true)}
                showClear={showClear}
                onClickClear={onClickClear}
              />
            </div>
          )}
          {posts && posts.length > 0 ? (
            <div>
              {posts.map((post, index) => (
                <ForumPost
                  id={post._id}
                  avatar={post.owner ? post.owner.avatar_url : ''}
                  username={post.owner ? post.owner.username : ''}
                  title={post.title}
                  content={post.content}
                  likes={post.likes}
                  saves={post.saves}
                  tags={post.tags}
                  dislikes={post.dislikes}
                  comments={post.comments}
                  program={post.program}
                  location={post.location}
                  date={post.timestamp}
                  url={name ? `/program/${name}` : '/program'}
                  userPosts={[]}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div className="absolute right-1 top-2">
        <button onClick={() => logOutHandle()}>Log Out</button>
      </div>
      <div className="absolute  w-1/4 flex-row right-2 top-14">
        {name ? <SearchBar /> : null}
      </div>
    </div>
  );
}
