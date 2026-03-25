import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import './userDetail.css';
import fetchModel from '../../lib/fetchModelData';

/**
 * UserDetail - Displays detailed information for a single user.
 * Fetches the user from the server using the userId from React Router params.
 * Updates the TopBar context label via the changeMainContent prop.
 * Provides a link/button to navigate to the user's photos view.
 */
class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
    }

    componentDidMount() {
        const { userId } = this.props.match.params;
        this.loadUser(userId);
    }

    componentDidUpdate(prevProps) {
        const prevId = prevProps.match.params.userId;
        const nextId = this.props.match.params.userId;
        if (prevId !== nextId) {
            this.loadUser(nextId);
        }
    }

    loadUser(userId) {
        fetchModel(`/user/${userId}`).then((result) => {
            const user = result.data;
            this.setState({ user });
            this.props.changeMainContent(
                `${user.first_name} ${user.last_name}`
            );
        });
    }

    render() {
        const { user } = this.state;
        if (!user) return <div />;

        return (
            <Card className="userdetail-card" variant="outlined">
                <CardContent>
                    <Typography variant="h4" className="userdetail-fullname" gutterBottom>
                        {user.first_name} {user.last_name}
                    </Typography>
                    <Divider className="userdetail-divider" />

                    <div className="userdetail-row">
                        <Typography variant="subtitle1" className="userdetail-label">Location</Typography>
                        <Typography variant="body1">{user.location}</Typography>
                    </div>
                    <div className="userdetail-row">
                        <Typography variant="subtitle1" className="userdetail-label">Occupation</Typography>
                        <Typography variant="body1">{user.occupation}</Typography>
                    </div>
                    <div className="userdetail-row">
                        <Typography variant="subtitle1" className="userdetail-label">About</Typography>
                        <Typography variant="body1">{user.description}</Typography>
                    </div>

                    <Button
                        className="userdetail-photos-btn"
                        variant="contained"
                        color="primary"
                        href={`#/photos/${user._id}`}
                    >
                        View Photos
                    </Button>
                </CardContent>
            </Card>
        );
    }
}

export default UserDetail;
