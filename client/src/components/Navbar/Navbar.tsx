import { useLocation, NavLink, useNavigate } from "react-router-dom";
import {
  Navbar as NavigationBar,
  Text,
  Button,
  Dropdown,
  Avatar,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Star } from "@icon-park/react";
import SearchBar from "./SearchBar/SearchBar";
import axios from "axios";

const Navbar = () => {
  const [activePage, setActivePage] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchBefore, setSearchBefore] = useState("");
  const [searchAfter, setSearchAfter] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  const onDropdownEvent = (key) => {
    if (key.actionKey === "settings") {
      navigate("/settings");
    }
  };

  const onSubmit = (e) => {
    // e.preventDefault();
    navigate(`library?title=${searchValue}`)
  };

  return (
    <NavigationBar variant="sticky" style={{backgroundColor: "#fff"}}>
      <NavigationBar.Brand>
        <Text b color="inherit" style={{ fontSize: "20px" }} hideIn="xs">
          BOOK <Star /> RUNNER
        </Text>
      </NavigationBar.Brand>
      <NavigationBar.Content hideIn="xs">
        <NavLink to="/" end style={({ isActive }) => isActive ? {color:'#3694FF', fontWeight: "bold"} : { color: "black"}}>Home</NavLink>
        <NavLink to="/library" end style={({ isActive }) => isActive ? {color:'#3694FF', fontWeight: "bold"} : {color: "black"}}>Library</NavLink>
      </NavigationBar.Content>
      <NavigationBar.Content>
        <SearchBar onSubmit={onSubmit} value={searchValue} setValue={setSearchValue} />
        <NavigationBar.Link color="inherit" href="#">
          Login
        </NavigationBar.Link>
        <NavigationBar.Item>
          <Button auto flat as={NavLink} href="#">
            Sign Up
          </Button>
        </NavigationBar.Item>
        <Dropdown placement="bottom-right">
          <NavigationBar.Item>
            <Dropdown.Trigger>
              <Avatar
                bordered
                as="button"
                color="secondary"
                size="md"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </Dropdown.Trigger>
          </NavigationBar.Item>
          <Dropdown.Menu
            aria-label="User menu actions"
            color="secondary"
            onAction={(actionKey) => onDropdownEvent({ actionKey })}
          >
            <Dropdown.Item key="profile" css={{ height: "$18" }}>
              <Text b color="inherit" css={{ d: "flex" }}>
                Signed in as
              </Text>
              <Text b color="inherit" css={{ d: "flex" }}>
                zoey@example.com
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider>
              My Settings
            </Dropdown.Item>
            <Dropdown.Item key="logout" withDivider color="error">
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </NavigationBar.Content>
    </NavigationBar>
  );
};

export default Navbar;