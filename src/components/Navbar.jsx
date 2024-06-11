import { faHouse, faList, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import '../assets/navbar.css';

export default function Navbar() {

    const [value, setValue] = useState(1);

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction
                    to="/budget-logs"
                    component={NavLink}
                    label="Logs"
                    icon={<FontAwesomeIcon icon={faList} />}
                />
                <BottomNavigationAction
                    to="/categories"
                    component={NavLink}
                    label="Home"
                    icon={<FontAwesomeIcon icon={faHouse} />}
                />
                <BottomNavigationAction
                    to="/profile"
                    component={NavLink}
                    label="Profile"
                    icon={<FontAwesomeIcon icon={faUser} />}
                />
            </BottomNavigation>

        </Paper>
    )
    // return <nav>
    //     <ul>
    //         <li>
    //             <Tooltip title="Budget Log" arrow>
    //                 <NavLink to="/budget-logs"><FontAwesomeIcon icon={faList}/></NavLink>
    //             </Tooltip>
    //         </li>
    //         <li>
    //             <Tooltip title="Summary" arrow>
    //                 <NavLink to="/categories"><FontAwesomeIcon icon={faHouse} /></NavLink>
    //             </Tooltip>
    //         </li>
    //         <li>
    //             <Tooltip title="Profile" arrow>
    //                 <NavLink to="/profile"><FontAwesomeIcon icon={faUser} /></NavLink>
    //             </Tooltip>
    //         </li>
    //     </ul>
    // </nav>
}