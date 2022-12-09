/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Row, Col, Container, Card, CardBody, Button } from "reactstrap";
import "../../assets/scss/style.scss";

import img1 from "../../assets/images/portfolio/img1.jpg";
import img2 from "../../assets/images/portfolio/img2.jpg";
import img3 from "../../assets/images/portfolio/img3.jpg";
import img4 from "../../assets/images/portfolio/img4.jpg";
import img5 from "../../assets/images/portfolio/img5.jpg";
import img6 from "../../assets/images/portfolio/img6.jpg";
import { authApi, joinApi } from "../../api";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BtnWrap = styled.div`
  display: flex;
  justify-content: right;
  margin: 20px 0;
`;

const imgDb = [img1, img2, img3, img4, img5, img6];

export const NoticeBoard = () => {
  const [db, setDb] = useState([]);
  useEffect(() => {
    const boardData = async () => {
      const {
        data: { results },
      } = await authApi.get("/api/v1/user/board");
      const reverseDb = results
        .slice(0)
        .reverse()
        .map((num) => num);
      setDb(reverseDb);
      console.log(reverseDb);
    };
    boardData();
  }, []);

  return (
    <div>
      <div className="spacer">
        <Container>
          <Row className="justify-content-center">
            <Col md="7" className="text-center">
              <h2 className="title">Our Recent work with three column</h2>
              <h6 className="subtitle">
                You can relay on our amazing features list and also our customer
                services will be great experience for you without doubt and in
                no-time
              </h6>
            </Col>
          </Row>
          <BtnWrap>
            <Link to="/contact">
              <Button style={{ margin: "10px 0 " }}>새 글</Button>
            </Link>
          </BtnWrap>
          <Row className="m-t-40">
            {db.map((db) => (
              <Col md="4" key={db.id}>
                <Card className="card-shadow">
                  <a href="/#/noticeboard" className="img-ho">
                    <img
                      src={imgDb[(db.id % 5) + 1]}
                      className="card-img-top"
                      alt="wrappixel kit"
                    />
                  </a>
                  <CardBody>
                    <h5 className="font-medium m-b-0">{db.title}</h5>
                    <p className="m-b-0 font-14">{db.content}</p>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};
