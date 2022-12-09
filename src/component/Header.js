import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const mainStyle = {
  bgColor: "#1d1d1d",
  color: {
    main: "rgba(255,255,255,1)",
    sub: "rgba(255,255,255,0.7)",
    p: "rgba(255,255,255,0.5)",
  },
  pointColor: { red: "#DC143C", green: "#16C5B1" },
  padding: "0 100px",
  mopadding: "0 20px",
};

const SHeader = styled.div`
  width: 100%;
  height: 80px;
  /* background-color: rgba(0, 0, 0, 0.3); */
  padding: ${mainStyle.padding};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
`;
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled.h1`
  a {
    color: ${mainStyle.pointColor.red};
    font-size: 28px;
    font-weight: 700;
  }
`;
const MenuWrap = styled.ul`
  display: flex;
`;
const Menu = styled.li`
  margin-left: 100px;
  &:first-child {
    margin-left: 0;
  }
  a {
    font-size: 18px;
    &:hover {
      color: ${mainStyle.pointColor.red};
    }
  }
`;
const Icon = styled.div`
  font-size: 22px;
  text-align: center;
  width: 70px;
  height: 30px;
  a {
    margin-left: 50px;
    &:first-child {
      margin-left: 0;
    }
    &:hover {
      color: ${mainStyle.pointColor.red};
    }
  }
`;
const IconOut = styled.div`
  font-size: 22px;
  text-align: center;
  width: 70px;
  height: 30px;
  cursor: pointer;
  color: black;
  &:hover {
    color: ${mainStyle.pointColor.red};
  }
`;

export const Header = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("Authorization");
    navigate("/login");
  };

  return (
    <SHeader>
      <Wrap>
        <Logo>
          <Link to={"/"}>J Site</Link>
        </Logo>
        <MenuWrap>
          <Menu>
            <Link to={"/"}>HOME</Link>
          </Menu>
          <Menu>
            <Link to={"/noticeboard"}>게시판</Link>
          </Menu>
        </MenuWrap>

        {user?.userData?.code !== 1 ? (
          <Icon>
            <Link to={"/login"}>Login</Link>
          </Icon>
        ) : (
          <IconOut onClick={logoutHandler}>Logout</IconOut>
        )}
      </Wrap>
    </SHeader>
  );
};
