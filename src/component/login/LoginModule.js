import {
  faEnvelope,
  faLock,
  faLockOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { headers } from "../../api";

import { useDispatch } from "react-redux";
import { loginUser } from "../../_actions/user_action";

const Mtitle = styled.div`
  width: 100%;
  font-size: 42px;
  margin-bottom: 60px;
  font-weight: 700;
  color: #3f9eff;
`;

const UserNameWrap = styled.div`
  width: 100%;
  margin-bottom: 30px;
  height: 100px;
`;

const InPutWrap = styled.div`
  display: flex;
  height: 50px;
  border-bottom: 2px solid #33333380;
  margin-bottom: 20px;
  input {
    all: unset;
    box-sizing: border-box;
    width: 90%;
    padding: 20px 0;
    font-size: 18px;
    &::placeholder {
      font-size: 22px;
      color: #33333350;
    }
  }
`;

const Errors = styled.div`
  width: 100%;
  font-size: 16px;
  color: #33333380;
  font-weight: 400;
`;

const PasswordWrap = styled.div`
  width: 100%;
  margin-bottom: 30px;
  height: 100px;
`;

const IconWrap = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const MButtonWrap = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Forgot = styled.div`
  color: #33333380;
  cursor: pointer;
`;
const Mbutton = styled.button`
  all: unset;
  padding: 15px 40px;
  background-color: #3f9eff;
  font-size: 22px;
  color: white;
  border-radius: 15px;
`;

const Test = styled.div`
  width: 200px;
  height: 50px;
  /* background-color: red; */
  display: flex;
  align-items: center;
`;

const CheckBox = styled.input`
  display: inline-block;
  margin-right: 10px;
`;
const CheckText = styled.label`
  display: inline-block;
  font-size: 18px;
  color: #333;
  font-weight: 400;
`;

export const LoginModule = (props) => {
  const [pwType, setPwType] = useState("password");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const config = { "Content-Type": "application/json" };

  const submit = () => {
    const { username, password } = getValues();

    const loginDb = {
      email: username,
      password: password,
    };

    dispatch(loginUser(JSON.stringify(loginDb))).then((res) => {
      if (res.payload.data.result.login) {
        let jwtToken = res.payload.headers.authorization;
        localStorage.setItem("Authorization", jwtToken);
        headers.authorization = jwtToken;
        navigate("/");
      } else {
        setError("nameResult", { message: "???????????? ??????????????? ??????????????????" });
      }
    });
  };

  return (
    <>
      <Mtitle>Login</Mtitle>
      <form onSubmit={handleSubmit(submit)}>
        <UserNameWrap>
          <InPutWrap>
            <input
              {...register("username", {
                required: "???????????? ?????? ?????????.",
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: "??????????????? ????????????.",
                },
                onChange() {
                  clearErrors("nameResult");
                },
              })}
              type="text"
              placeholder="E-mail"
            ></input>
            <IconWrap>
              <FontAwesomeIcon icon={faEnvelope} />
            </IconWrap>
          </InPutWrap>
          {errors?.username?.message && (
            <Errors>{errors?.username?.message}</Errors>
          )}
          {errors?.nameResult?.message && (
            <Errors>{errors?.nameResult?.message}</Errors>
          )}
        </UserNameWrap>
        <PasswordWrap>
          <InPutWrap>
            <input
              {...register("password", {
                required: "??????????????? ?????? ?????????.",
                minLength: {
                  value: 8,
                  message: "??????????????? 8?????? ???????????????.",
                },
                onChange() {
                  clearErrors("passwordResult");
                },
              })}
              type={pwType}
              placeholder="Password"
            ></input>
            <IconWrap
              onClick={() => {
                pwType === "password"
                  ? setPwType("text")
                  : setPwType("password");
              }}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon
                style={{
                  display: `${pwType === "password" ? "block" : "none"}`,
                }}
                icon={faLock}
              />
              <FontAwesomeIcon
                style={{
                  display: `${pwType !== "password" ? "block" : "none"}`,
                }}
                icon={faLockOpen}
              />
            </IconWrap>
          </InPutWrap>
          {errors?.password?.message && (
            <Errors>{errors?.password?.message}</Errors>
          )}
          {errors?.passwordResult?.message && (
            <Errors>{errors?.passwordResult?.message}</Errors>
          )}
          <Test>
            <CheckBox type="checkbox" id="checkbox"></CheckBox>
            <CheckText htmlFor="checkbox">?????? ?????????</CheckText>
          </Test>
        </PasswordWrap>
        <MButtonWrap>
          <Forgot>??????????????? ???????????? ????????????????</Forgot>
          <Mbutton
            style={{
              opacity: `${isValid ? "1" : "0.5"}`,
              cursor: `${isValid ? "pointer" : "auto"}`,
            }}
          >
            ?????????
          </Mbutton>
        </MButtonWrap>
      </form>
    </>
  );
};
