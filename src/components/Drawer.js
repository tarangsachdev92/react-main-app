import { Drawer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import http from '../http-common';

const DrawerComponent = () => {
  // console.log('DrawerComponent');
  const [userPosts, setUserPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [drawerType, setDrawerType] = useState({
    profile: false,
    post: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerType({ ...drawerType, [anchor]: open });
  };

  const bindUsersPost = (user) => {
    http
      .get(`/posts?userId=${user.id}`)
      .then((response) => {
        setCurrentUser(user);
        setUserPosts(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onMessageReceived = (event) => {
    if (typeof event.data === 'string') {
      var data = JSON.parse(event.data);
      setDrawerType({ ...drawerType, [data.type]: true });
      if (data.type === 'post') {
        bindUsersPost(data.user);
      } else {
        setCurrentUser(data.user);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('message', onMessageReceived, false);
  }, []);

  console.log(currentUser);

  return (
    <div>
      {['profile', 'post'].map((type) => {
        return (
          <React.Fragment key={type}>
            <Drawer
              anchor={'right'}
              open={drawerType[type]}
              onClose={toggleDrawer(type, false)}
            >
              {currentUser && (
                <>
                  {drawerType.profile && (
                    <div>
                      <p>{currentUser?.name}</p>
                    </div>
                  )}
                  {drawerType.post && (
                    <div>
                      {userPosts?.map((e) => {
                        return (
                          <>
                            <div>{e.id}</div>
                            <p>{e.title}</p>
                            <p>{e.body}</p>
                          </>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </Drawer>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default DrawerComponent;
