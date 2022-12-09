import styled from "styled-components";
import { useEffect, useState } from "react";
import { LoginModule } from "./LoginModule";
import {
  faEnvelope,
  faLock,
  faLockOpen,
  faMobileScreen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { joinApi } from "../../api";
import { useDispatch } from "react-redux";
import { registerUser } from "../../_actions/user_action";

const Section = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("https://t1.daumcdn.net/cfile/tistory/99280D3E5B28527629")
    no-repeat center/cover;
`;

const BgCover = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
`;
const Wrap = styled.div`
  width: 1200px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.9);
  position: relative;
`;
const ConWrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0%;
  left: 0;
  border-radius: 25px;
  display: flex;
  justify-content: ${(props) => props.a};
`;

const LeftCon = styled.div`
  width: ${(props) => props.a};
  height: 100%;
  border-radius: 25px;
  position: relative;
  z-index: 9999;
`;
const RightCon = styled.div`
  width: ${(props) => props.a};
  height: 100%;
  border-radius: 25px;
  position: relative;
  z-index: 9999;
`;

const MoveBox = styled.div`
  width: 55%;
  height: 110%;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 25px;
  position: absolute;
  top: -5%;
  left: 5%;
  z-index: 9998;
  transition: 1s;
  transition-timing-function: cubic-bezier(1, -0.5, 0, 1.5);
  transform: translateX(${(props) => props.a});
`;

const Rlogin = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  color: white;
  padding: 30px;
`;
const Lsignup = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  color: white;
  padding: 30px;
`;
const Title = styled.div`
  font-size: 38px;
  font-weight: 600;
  margin-bottom: 40px;
`;
const Text = styled.div`
  font-size: 18px;
  line-height: 30px;
  margin-bottom: 40px;
  font-weight: 100;
`;
const Button = styled.div`
  border: 1px solid white;
  font-size: 22px;
  padding: 15px 50px;
  border-radius: 15px;
  cursor: pointer;
`;

const Llogin = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 70px;
  form {
    width: 100%;
  }
`;
const Rsignup = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 70px;
  form {
    width: 100%;
  }
`;

const PopupWrap = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 500px;
  height: 50px;
  border-radius: 25px;
  overflow: hidden;
`;
const PopUpTitle = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  border-radius: 25px;
  background-color: #3f9eff;
  transition: 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(${(props) => props.on});
`;

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
      font-size: 18px;
      color: #33333350;
    }
  }
`;

const IconWrap = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;
const Errors = styled.div`
  width: 100%;
  font-size: 16px;
  color: #33333380;
  font-weight: 400;
`;

const MButtonWrap = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Mbutton = styled.button`
  all: unset;
  padding: 15px 40px;
  background-color: #3f9eff;
  font-size: 22px;
  font-weight: 600;
  color: white;
  border-radius: 15px;
  cursor: pointer;
`;

const InPutWrap2 = styled.div`
  display: flex;
  border-bottom: 2px solid #33333380;
  margin-bottom: 20px;
  justify-content: space-between;
  input {
    all: unset;
    box-sizing: border-box;
    width: 80%;
    padding: 20px 0;
    font-size: 18px;
    &::placeholder {
      font-size: 18px;
      color: #33333350;
    }
  }
`;

const NamePhoneWrap = styled.div`
  width: 100%;
  margin-bottom: 30px;
  height: 100px;
  display: flex;
  justify-content: space-between;
`;
const NameWrap = styled.div`
  width: 45%;
`;
const PhoneWrap = styled.div`
  width: 45%;
`;
const PwWrap = styled.div`
  width: 100%;
  margin-bottom: 30px;
  height: 100px;
  display: flex;
  justify-content: space-between;
`;

const Passwordcheck1 = styled.div`
  width: 45%;
`;
const Passwordcheck2 = styled.div`
  width: 45%;
`;

export const Login = () => {
  const [position1, setPoisition1] = useState("0");
  const [padding1, setPadding1] = useState("right");
  const [conw1, setConw1] = useState("55%");
  const [conw2, setConw2] = useState("40%");
  const [place, setPlace] = useState("left");
  const [pwType, setPwType] = useState("password");
  const [popup, setPopup] = useState("50px");
  const [double, setDouble] = useState(true);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid, isSubmitting },
    setError,
    clearErrors,
    reset,
  } = useForm({
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const handleClick = () => {
    if (double === true) {
      setPoisition1(`${position1 === "0" ? "63.33333%" : "0"}`);
      setDouble(false);
      setTimeout(() => {
        setPadding1(`${padding1 === "left" ? "right" : "left"}`);
        setConw1(`${conw1 === "55%" ? "40%" : "55%"}`);
        setConw2(`${conw2 === "40%" ? "55%" : "40%"}`);
        setPlace(`${place === "left" ? "right" : "left"}`);
        setDouble(true);
      }, 500);
    }
  };

  const ssubmit = async () => {
    const { sname, sphone, susername, spassword, spwcheck } = getValues();
    const userobj = {
      email: susername,
      phone: sphone,
      username: sname,
      password: spassword,
    };

    if (spassword !== spwcheck) {
      setError("spwcheckResult", {
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
    dispatch(registerUser(userobj)).then((res) => {
      if (res.payload.code === -1) {
        setError("susernameResult", { message: "이미 가입된 이메일 입니다." });
      } else if (res.payload.code === 1) {
        handleClick();
        setPopup("0");
        setTimeout(() => {
          setPopup("50px");
        }, 5000);
        reset();
      } else {
        console.log(res);
      }
    });
  };

  return (
    <Section>
      <BgCover>
        <Wrap>
          <ConWrap a={padding1}>
            <LeftCon a={conw1}>
              <Llogin
                style={{ display: `${conw1 === "55%" ? "flex" : "none"}` }}
              >
                <LoginModule />
              </Llogin>
              <Lsignup
                style={{ display: `${place === "left" ? "none" : "flex"}` }}
              >
                <Title>J Site 회원이신가요?</Title>
                <Text>
                  언제 어디서든 J Site의 콘텐츠를 즐겨보세요
                  <br /> J Site는 여러분들과 항상 함께합니다.
                </Text>
                <Button
                  onClick={() => {
                    handleClick();
                  }}
                >
                  로그인
                </Button>
              </Lsignup>
            </LeftCon>
            <RightCon a={conw2}>
              <Rlogin
                style={{ display: `${place === "left" ? "flex" : "none"}` }}
              >
                <Title>회원이 아니신가요?</Title>
                <Text>
                  회원가입을 해보세요.
                  <br /> 회원가입을 통해 다양한 혜택을 누려보세요.
                </Text>
                <Button
                  onClick={() => {
                    handleClick();
                  }}
                >
                  회원가입
                </Button>
              </Rlogin>
              <Rsignup
                style={{ display: `${conw1 === "40%" ? "flex" : "none"}` }}
              >
                <Mtitle>회원가입</Mtitle>
                <form onSubmit={handleSubmit(ssubmit)}>
                  <NamePhoneWrap>
                    <NameWrap>
                      <InPutWrap2>
                        <input
                          {...register("sname", {
                            required: "이름은 필수 입니다.",
                            pattern: {
                              value: /^[가-힣a-zA-Z]+$/,
                              message: "이름을 확인해주세요.",
                            },
                            onChange() {
                              clearErrors("snameResult");
                            },
                          })}
                          type="text"
                          placeholder="이름"
                        ></input>
                        <IconWrap style={{ width: "20%" }}>
                          <FontAwesomeIcon icon={faUser} />
                        </IconWrap>
                      </InPutWrap2>
                      {errors?.sname?.message && (
                        <Errors>{errors?.sname?.message}</Errors>
                      )}
                    </NameWrap>
                    <PhoneWrap>
                      <InPutWrap2>
                        <input
                          {...register("sphone", {
                            required: "휴대폰 번호는 필수 입니다.",
                            pattern: {
                              value:
                                /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
                              message: "휴대폰번호를 확인해주세요.",
                            },
                            onChange() {
                              clearErrors("snameResult");
                            },
                          })}
                          type="text"
                          placeholder="휴대폰"
                        ></input>
                        <IconWrap style={{ width: "20%" }}>
                          <FontAwesomeIcon icon={faMobileScreen} />
                        </IconWrap>
                      </InPutWrap2>
                      {errors?.sphone?.message && (
                        <Errors>{errors?.sphone?.message}</Errors>
                      )}
                    </PhoneWrap>
                  </NamePhoneWrap>
                  <UserNameWrap>
                    <InPutWrap>
                      <input
                        {...register("susername", {
                          required: "메일은 필수 입니다.",
                          pattern: {
                            value:
                              /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                            message: "메일형식이 아닙니다.",
                          },
                          onChange() {
                            clearErrors("susernameResult");
                          },
                        })}
                        type="text"
                        placeholder="E-mail"
                      ></input>
                      <IconWrap>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </IconWrap>
                    </InPutWrap>
                    {errors?.susername?.message && (
                      <Errors>{errors?.susername?.message}</Errors>
                    )}
                    {errors?.susernameResult?.message && (
                      <Errors>{errors?.susernameResult?.message}</Errors>
                    )}
                  </UserNameWrap>

                  <PwWrap>
                    <Passwordcheck1>
                      <InPutWrap2>
                        <input
                          {...register("spassword", {
                            required: "패스워드는 필수 입니다.",
                            minLength: {
                              value: 8,
                              message: "패스워드는 8자리 이상입니다.",
                            },
                            onChange() {
                              clearErrors("passwordResult");
                            },
                          })}
                          type={pwType}
                          placeholder="Password"
                        ></input>
                      </InPutWrap2>
                      {errors?.spassword?.message && (
                        <Errors>{errors?.spassword?.message}</Errors>
                      )}
                    </Passwordcheck1>
                    <Passwordcheck2>
                      <InPutWrap2>
                        <input
                          {...register("spwcheck", {
                            required: "패스워드는 필수 입니다.",
                            minLength: {
                              value: 8,
                              message: "패스워드는 8자리 이상입니다.",
                            },
                            onChange() {
                              clearErrors("spwcheckResult");
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
                          style={{ cursor: "pointer", width: "30%" }}
                        >
                          <FontAwesomeIcon
                            style={{
                              display: `${
                                pwType === "password" ? "block" : "none"
                              }`,
                            }}
                            icon={faLock}
                          />
                          <FontAwesomeIcon
                            style={{
                              display: `${
                                pwType !== "password" ? "block" : "none"
                              }`,
                            }}
                            icon={faLockOpen}
                          />
                        </IconWrap>
                      </InPutWrap2>
                      {errors?.spwcheck?.message && (
                        <Errors>{errors?.spwcheck?.message}</Errors>
                      )}
                      {errors?.spwcheckResult?.message && (
                        <Errors>{errors?.spwcheckResult?.message}</Errors>
                      )}
                    </Passwordcheck2>
                  </PwWrap>
                  <MButtonWrap style={{ justifyContent: "right" }}>
                    <Mbutton
                      disabled={isSubmitting}
                      style={{
                        opacity: `${isValid ? "1" : "0.5"}`,
                        cursor: `${isValid ? "pointer" : "auto"}`,
                      }}
                    >
                      회원 가입
                    </Mbutton>
                  </MButtonWrap>
                </form>
              </Rsignup>
            </RightCon>
            <MoveBox a={position1}></MoveBox>
          </ConWrap>
        </Wrap>
      </BgCover>
      <PopupWrap>
        <PopUpTitle on={popup}>
          회원가입 완료! J Site 가입을 환영합니다.
        </PopUpTitle>
      </PopupWrap>
    </Section>
  );
};
