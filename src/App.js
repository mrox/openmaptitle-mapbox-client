import React from "react";
import { Routes, Route, Outlet, NavLink as BaseNavLink } from "react-router-dom";
import Map from "./pages/Map";
import styled from "styled-components";
import MapEditor from "./pages/MapEditor";
import MapAssets from "./pages/MapAssets";
import MapSchedules from "./pages/MapSchedules";
import MapEvents from "./pages/MapEvents";



function App() {


  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Map />} />
          <Route path="/editor" element={<MapEditor />} />
          <Route path="/assets" element={<MapAssets />} />
          <Route path="/schedules" element={<MapSchedules />} />,
          <Route path="/events" element={<MapEvents />} />,
        </Route>

      </Routes>
    </div>
  );
}


function Layout() {
  return (
    <Body>
      {/* <div className="flex flex-row space-x-6 px-8 h-12 items-center">
        <BaseNavLink className={({ isActive }) => isActive ? "bg-slate-400" : ""} to="/"  >Home</BaseNavLink>
        <BaseNavLink className={({ isActive }) => isActive ? "bg-slate-400" : ""} to="/editor" >Editor</BaseNavLink>
      </div> */}
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/assets">Assets</NavLink>
        <NavLink to="/editor">Editor</NavLink>
        <NavLink to="/schedules">Schedules</NavLink>
        <NavLink to="/events">Events</NavLink>
      </Nav>
      <Container >
        <Outlet />
      </Container>
    </Body>
  );
}
const NavLink = React.forwardRef(
  ({ activeClassName, activeStyle, ...props }, ref) => {
    return (
      <BaseNavLink
        ref={ref}
        {...props}
        className={({ isActive }) =>
          [
            props.className,
            isActive ? activeClassName : null,
          ]
            .filter(Boolean)
            .join(" ")
        }
        style={({ isActive }) => ({
          ...props.style,
          ...{ padding: "8px 18px", borderRadius: 4 },
          ...(isActive ? { color: "blue", background: "#efefef" } : null),
        })}
      />
    );
  }
);

const Body = styled.div`
  display: flex ;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`
const Nav = styled.div`
  display: flex ;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  /* justify-content: end; */
  align-items: center;
  height: 60px;
  padding: 8px 8px 8px 16px;
  font-weight: 500;
`
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`


export default App;
