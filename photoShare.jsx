import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter, Route, Switch
} from 'react-router-dom';
import {
  Grid, Paper
} from '@mui/material';
import './styles/main.css';

// Components
import TopBar from './components/topBar/TopBar';
import UserDetail from './components/userDetail/userDetail';
import UserList from './components/userList/userList';
import UserPhotos from './components/userPhotos/userPhotos';

class PhotoShare extends React.Component {
  render() {
    return (
      <HashRouter>
        <Grid container spacing={2}>
          
          {/* Top Bar */}
          <Grid item xs={12}>
            <TopBar />
          </Grid>

          <div className="main-topbar-buffer"/>

          {/* Sidebar */}
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList />
            </Paper>
          </Grid>

          {/* Main Content */}
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Switch>
                <Route path="/users/:userId"
                  render={props => <UserDetail {...props} />}
                />
                <Route path="/photos/:userId"
                  render={props => <UserPhotos {...props} />}
                />
                <Route path="/users" component={UserList} />
              </Switch>
            </Paper>
          </Grid>

        </Grid>
      </HashRouter>
    );
  }
}

ReactDOM.render(
  <PhotoShare />,
  document.getElementById('photoshareapp'),
);
