import React, {useCallback, useEffect, useRef, useState} from 'react';
import SearchView from './SearchView';
import {searchFiltersOptions} from '../../constants';
import {connect, useDispatch, useSelector} from 'react-redux';
import {getPublicEventsRequest} from '../../actions/EventsActions';
import {getPublicSessionsRequest} from '../../actions/SessionsActions';
import {getPublicSeasonsRequest} from '../../actions/SeasonsActions';
import {getFacilitiesRequest} from '../../actions/Facility';
import {getPublicUsersRequest} from '../../actions/UserActions';
import {getSearchPostsListRequest} from '../../actions/PostActions';
import {getSearchKeywordsRequest} from '../../actions/GeneralActions';

const category = [
  {
    id: 1,
    categoryName: 'All',
  },
  {
    id: 2,
    categoryName: 'Post',
  },
  {
    id: 3,
    categoryName: 'People',
  },
  {
    id: 4,
    categoryName: 'Events',
  },
  {
    id: 6,
    categoryName: 'Sessions',
  },
  {
    id: 5,
    categoryName: 'Seasons',
  },
  {
    id: 7,
    categoryName: 'Facility',
  },
];

const SearchController = props => {
  const {refreshNow} = props;

  const currentUser = useSelector(state => state.user.data);
  const {searchEvents} = useSelector(state => state.events);
  const {searchSessions} = useSelector(state => state.sessions);
  const {searchSeasons} = useSelector(state => state.seasons);
  const {facilitiesList} = useSelector(state => state.facility);
  const postList = useSelector(state => state.post.searchPosts);
  const {publicUsers} = useSelector(state => state.user);
  const {keywordsList} = useSelector(state => state.general);

  const [actionsOfPost, setActionsOfPost] = useState({});
  const [categorySelected, setCategorySelected] = useState('All');
  const [searchFieldEmpty, setSearchFieldEmpty] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [showKeywords, setShowKeywords] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const itemofDefaultScreenFollow = publicUsers ? publicUsers.slice(0, 4) : [];
  const itemofDefaultScreenPost = postList ? postList.slice(0, 2) : [];
  const itemofDefaultScreenEvents = searchEvents
    ? searchEvents.slice(0, 2)
    : [];
  const itemofDefaultScreenSession = searchSessions
    ? searchSessions.slice(0, 2)
    : [];
  const itemofDefaultScreenSeason = searchSeasons
    ? searchSeasons.slice(0, 2)
    : [];
  const itemofDefaultScreenFacility = facilitiesList
    ? facilitiesList.slice(0, 2)
    : [];

  const searchRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActionsOfPost({});
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setSearchFieldEmpty('');
  }, [refreshNow]);

  useEffect(() => {
    searchData();
  }, [categorySelected]);

  useEffect(() => {
    dispatch(
      getSearchKeywordsRequest({
        limit: 14,
        offset: 0,
        keyword: searchFieldEmpty,
      }),
    );
  }, [searchFieldEmpty]);

  const searchData = keyword => {
    if (!keyword && searchFieldEmpty == '') return;
    setLoading(true);
    switch (categorySelected) {
      case 'All':
      case 'Post':
        dispatch(
          getSearchPostsListRequest(
            {
              limit: 100,
              offset: 0,
              keyword: keyword || searchFieldEmpty,
              filter: searchFilter,
            },
            res => {
              setLoading(false);
              setShowContent(true);
            },
          ),
        );
      case 'All':
      case 'People':
        dispatch(
          getPublicUsersRequest(
            {
              limit: 300,
              offset: 0,
              keyword: keyword || searchFieldEmpty,
              filter: searchFilter,
              flag: Math.random(),
            },
            res => {
              setLoading(false);
              setShowContent(true);
            },
          ),
        );
      case 'All':
      case 'Events':
        dispatch(
          getPublicEventsRequest(
            {
              limit: 300,
              offset: 0,
              keyword: keyword || searchFieldEmpty,
              filter: searchFilter,
            },
            res => {
              setLoading(false);
              setShowContent(true);
            },
          ),
        );
      case 'All':
      case 'Sessions':
        dispatch(
          getPublicSessionsRequest(
            {
              limit: 300,
              offset: 0,
              keyword: keyword || searchFieldEmpty,
              filter: searchFilter,
            },
            res => {
              setLoading(false);
              setShowContent(true);
            },
          ),
        );
      case 'All':
      case 'Seasons':
        dispatch(
          getPublicSeasonsRequest(
            {
              limit: 300,
              offset: 0,
              keyword: keyword || searchFieldEmpty,
              filter: searchFilter,
            },
            res => {
              setLoading(false);
              setShowContent(true);
            },
          ),
        );
      case 'All':
      case 'Facility':
        dispatch(
          getFacilitiesRequest(
            {
              limit: 300,
              offset: 0,
              keyword: keyword || searchFieldEmpty,
              filter: searchFilter,
            },
            res => {
              setLoading(false);
              setShowContent(true);
            },
          ),
        );
      default:
        break;
    }
  };

  const handleActionsOfPost = item => {
    setActionsOfPost(item);
  };

  const scrollToIndex = title => {
    setCategorySelected(title);

    let scrollTo = 0;
    category.forEach((res, idx) => {
      if (res.categoryName == title) {
        scrollTo = idx;
      }
    });

    searchRef.current.scrollToIndex({animated: true, index: scrollTo});
  };

  return (
    <SearchView
      category={category}
      followers={publicUsers}
      categorySelected={categorySelected}
      setCategorySelected={setCategorySelected}
      searchFieldEmpty={searchFieldEmpty}
      setSearchFieldEmpty={setSearchFieldEmpty}
      currentUser={currentUser}
      postList={postList}
      events={searchEvents}
      sessions={searchSessions}
      seasons={searchSeasons}
      facilitys={facilitiesList}
      itemofDefaultScreenPost={itemofDefaultScreenPost}
      itemofDefaultScreenFollow={itemofDefaultScreenFollow}
      itemofDefaultScreenEvents={itemofDefaultScreenEvents}
      itemofDefaultScreenSession={itemofDefaultScreenSession}
      itemofDefaultScreenSeason={itemofDefaultScreenSeason}
      itemofDefaultScreenFacility={itemofDefaultScreenFacility}
      handleActionsOfPost={handleActionsOfPost}
      actionsOfPost={actionsOfPost}
      setActionsOfPost={setActionsOfPost}
      searchRef={searchRef}
      scrollToIndex={scrollToIndex}
      searchData={searchData}
      loading={loading}
      setLoading={setLoading}
      searchFiltersOptions={searchFiltersOptions}
      searchFilter={searchFilter}
      setSearchFilter={setSearchFilter}
      showContent={showContent}
      setShowContent={setShowContent}
      keywordsList={keywordsList}
      setShowKeywords={setShowKeywords}
      showKeywords={showKeywords}
    />
  );
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(SearchController);
