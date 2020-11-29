import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition, Image } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {

  const { user } = useContext(AuthContext)

  const {
    loading,
    data: { getPosts: posts } = {}
  } = useQuery(FETCH_POSTS_QUERY);

  return (
    <>
      <div>
        <h1 style={{textAlign: 'center', marginBottom: 10}}>Welcome to Len's Social Media App</h1>
      </div>
      <Grid celled='internally'>
        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
        </Grid.Row>
        <Grid.Row>
          {loading ? (
            <h1>Loading posts..</h1>
          ) : (
            <Transition.Group animation='drop' duration='300' divided>
              {
                posts &&
                posts.map((post) => (
                  <>
                    <Grid.Column width={3}>
                      <Image src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
                    </Grid.Column>
                    <Grid.Column key={post.id} width={13} style={{ marginBottom: 20 }}>
                      <PostCard post={post} />
                    </Grid.Column>
                  </>
                ))
              }
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </>
  );
}

export default Home;
