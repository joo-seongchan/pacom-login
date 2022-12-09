import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authdApi } from "../api";
import { auth } from "../_actions/user_action";

export default function (SpecificComponent, option, adminRouter = null) {
  function AuthenticationCheck() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((res) => {
        if (res.payload.code !== 1) {
          if (option) {
            navigate("/login");
          }
        } else {
          if (option === false) {
            navigate("/");
          }
          //로그인한 상태
        }
      });
    }, []);
    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
