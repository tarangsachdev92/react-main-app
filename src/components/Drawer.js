import { Drawer } from '@mui/material';
import React, { useEffect, useState } from 'react';

const DrawerComponent = () => {
  console.log('DrawerComponent');
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

  const onMessageReceived = (event) => {
    if (typeof event.data === 'string') {
      var data = JSON.parse(event.data);
      setDrawerType({ ...drawerType, [data.type]: true });
    }
  };

  useEffect(() => {
    window.addEventListener('message', onMessageReceived, false);
  }, []);

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
              {drawerType[type] && (
                <div>
                  <p>{type}</p>
                </div>
              )}
            </Drawer>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default DrawerComponent;
