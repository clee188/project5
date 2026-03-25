import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './TopBar.css';
import fetchModel from '../../lib/fetchModelData';

/**
 * TopBar - App-wide header bar component for the Photo Sharing App.
 * Displays the developer name on the left, current view context in the center,
 * and the schema version number (fetched from /test/info) on the right.
 */
class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schemaVersion: null,
        };
    }

    componentDidMount() {
        fetchModel('/test/info').then((result) => {
            this.setState({ schemaVersion: result.data.__v });
        });
    }

    render() {
        const { main_content } = this.props;
        const { schemaVersion } = this.state;

        return (
            <AppBar position="absolute" className="topbar-appBar">
                <Toolbar className="topbar-toolbar">
                    <Typography variant="h5" className="topbar-name">
                        Jubin
                    </Typography>
                    <Typography variant="h5" className="topbar-context" sx={{ flexGrow: 1 }}>
                        {main_content || ''}
                    </Typography>
                    {schemaVersion !== null && (
                        <Typography variant="h6" className="topbar-version">
                            v{schemaVersion}
                        </Typography>
                    )}
                </Toolbar>
            </AppBar>
        );
    }
}

export default TopBar;
