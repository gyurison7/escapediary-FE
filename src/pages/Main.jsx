import React, { useEffect, useState } from "react";
import Button from "../components/common/Button";
import { styled } from "styled-components";
import List from "../components/List";
import useNavigation from "../hooks/useNavigation";
import axios from "axios";
import Pagenation from "../components/common/Pagenation";

const Main = () => {
  const { goToPath } = useNavigation();
  const [user, setUser] = useState(false);
  const [data, setData] = useState(null);
  const [posts, setPosts] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 6;
  const offset = (page - 1) * limit;

  useEffect(() => {
    const api = async () => {
      const api = process.env.REACT_APP_URL;
      try {
        const apiData = await axios.get(api);
        setData(apiData.data.posts.reverse());
        setPosts(apiData.data.posts.slice(0, limit));
      } catch (e) {
        console.log(e);
      }
    };
    api();
  }, []);

  useEffect(() => {
    if (data) {
      setPosts(data.slice(offset, offset + limit));
    }
  }, [page]);
  return (
    <WrapMain>
      <Header>
        <p>EscapeDiary</p>
        {user && (
          <Button color={"white"} size={"small"}>
            로그아웃
          </Button>
        )}
      </Header>
      <MainBody>
        <div className="MainButtonSection">
          <Button
            color={"black"}
            size={"medium"}
            onClick={() => goToPath("/create")}
          >
            리뷰 쓰기
          </Button>
        </div>
        <div className="MainListSection">
          {posts &&
            posts.map((item) => (
              <List
                key={item.postId}
                title={item.title}
                content={item.content}
                date={item.createdAt.slice(0, 10)}
                star={item.star}
                onClick={() => goToPath(`/detail/${item.postId}`)}
              />
            ))}
        </div>
      </MainBody>
      <MainFooter>
        {data && (
          <Pagenation
            limit={limit}
            page={page}
            totalPosts={data.length}
            setPage={setPage}
          />
        )}
      </MainFooter>
    </WrapMain>
  );
};
const WrapMain = styled.div`
  width: 100%;
  height: 100vh;
`;
const Header = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  height: 5rem;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  p {
    font-size: 2.5rem;
    color: white;
    font-weight: bold;
  }
`;
const MainBody = styled.div`
  box-sizing: border-box;
  padding: 2rem 3rem 5rem 3rem;
  @media (max-width: 480px) {
    padding: 1rem 1rem 2rem 1rem;
  }
  .MainButtonSection {
    display: flex;
    padding-bottom: 2rem;
    button {
      margin-left: auto;
    }
    @media (max-width: 480px) {
      padding-bottom: 1rem;
    }
  }
  .MainListSection {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
const MainFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default Main;
