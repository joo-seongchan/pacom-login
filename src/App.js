import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Contact } from "./component/contact/Contact";
import { Header } from "./component/Header";
import { Home } from "./component/Home";
import { Login } from "./component/login/Login";
import { NoticeBoard } from "./component/noticeBoard/NoticeBoard";
import Auth from "./hoc/auth";
import { Style } from "./style/Style";

export let loginHandler = {};

function App() {
  const AuthHome = Auth(Home, null);
  const AuthLogin = Auth(Login, false);
  const AuthNoticeBoarde = Auth(NoticeBoard, true);
  const AuthContact = Auth(Contact, true);

  return (
    <Router>
      <Style />
      <Header />
      <Routes>
        <Route path="/" element={<AuthHome />}></Route>
        <Route path="/login" element={<AuthLogin />}></Route>
        <Route path="/noticeboard" element={<AuthNoticeBoarde />}></Route>
        <Route path="/contact" element={<AuthContact />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
