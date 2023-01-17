import "./Header.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
    Home,
    HomeOutlined,
    Add,
    AddOutlined,
    SearchOutlined,
    Search,
    AccountCircle,
    AccountCircleOutlined,
} from "@mui/icons-material";
import SideNav, {
    Toggle,
    Nav,
    NavItem,
    NavIcon,
    NavText,
} from "@trendmicro/react-sidenav";

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useState } from "react";

export const Header = () => {
    const [tab, setTab] = useState(window.location.pathname);
    const navigate = useNavigate();

    return (
        <SideNav
            expanded={true}
            onToggle={(expanded) => {
                this.setState({ expanded });
            }}
            style={{
                margin: "0px",
                padding: "0px",
                backgroundColor: "white",
                width: "20px",
            }}
            onSelect={(selected) => {
                navigate("/" + selected);
            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="">
                    <NavText style={{ color: "black", marginLeft: "20px" }}>
                        <h1 style={{ color: "black", fontSize: "30px" }}>
                            {" "}
                            Social Media{" "}
                        </h1>
                    </NavText>
                </NavItem>

                <NavItem eventKey="" style={{ margin: "20px 0px" }}>
                    <NavIcon style={{ margin: "0px", padding: "5px" }}>
                        {tab === "/" ? (
                            <Home style={{ color: "black" }} />
                        ) : (
                            <HomeOutlined style={{ color: "black" }} />
                        )}
                    </NavIcon>
                    <NavText style={{ color: "black", fontSize: "20px" }}>
                        Home
                    </NavText>
                </NavItem>

                <NavItem eventKey="newpost" style={{ margin: "20px 0px" }}>
                    <NavIcon style={{ margin: "0px", padding: "5px" }}>
                        {tab === "/newpost" ? (
                            <Add style={{ color: "black" }} />
                        ) : (
                            <AddOutlined style={{ color: "black" }} />
                        )}{" "}
                    </NavIcon>
                    <NavText style={{ color: "black", fontSize: "20px" }}>
                        Newpost
                    </NavText>
                </NavItem>

                <NavItem eventKey="search" style={{ margin: "20px 0px" }}>
                    <NavIcon style={{ margin: "0px", padding: "5px" }}>
                        {tab === "/search" ? (
                            <Search style={{ color: "black" }} />
                        ) : (
                            <SearchOutlined style={{ color: "black" }} />
                        )}{" "}
                    </NavIcon>
                    <NavText style={{ color: "black", fontSize: "20px" }}>
                        Search
                    </NavText>
                </NavItem>

                <NavItem eventKey="account" style={{ margin: "20px 0px" }}>
                    <NavIcon style={{ margin: "0px", padding: "5px" }}>
                        {tab === "/account" ? (
                            <AccountCircle style={{ color: "black" }} />
                        ) : (
                            <AccountCircleOutlined style={{ color: "black" }} />
                        )}{" "}
                    </NavIcon>
                    <NavText style={{ color: "black", fontSize: "20px" }}>
                        Account
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    );
};
