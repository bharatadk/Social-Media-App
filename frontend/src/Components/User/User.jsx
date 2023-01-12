import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const User = ({ userId, name, avatar }) => {
    return (
        <Link to={`/User/${userId}`} className="homeUser">
            <img className="userImg" src={avatar} alt={name} />
            <Typography className="userName"> {name} </Typography>
        </Link>
    );
};
