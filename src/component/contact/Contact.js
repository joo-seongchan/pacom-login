import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container, Form, FormGroup, Button } from "reactstrap";
import { authApi, headers } from "../../api";

export const Contact = () => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, isValid },
    getValues,
    setError,
    clearErrors,
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  const submit = async () => {
    const { title, content } = getValues();
    const contentDb = {
      title: title,
      content: content,
    };
    const {
      data: { code },
    } = await authApi.post("/api/v1/user/posting", null, {
      params: contentDb,
    });
    if (code === 1) {
      navigate("/noticeboard");
    } else console.log(code);
  };

  return (
    <div>
      <div className="spacer bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col md="7" className="text-center">
              <h1 className="title font-bold">Contact Form</h1>
              <h6 className="subtitle">
                Here you can check Demos we created based on WrapKit. Its quite
                easy to Create your own dream website &amp; dashboard in
                No-time.
              </h6>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="contact1">
        <Row>
          <Container>
            <div className="spacer">
              <Row className="m-0">
                <Col lg="8">
                  <div className="contact-box p-r-40">
                    <h4 className="title">Quick Contact</h4>
                    <Form onSubmit={handleSubmit(submit)}>
                      <Row>
                        <Col lg="6" style={{ maxWidth: "100%", flex: "100%" }}>
                          <FormGroup className="m-t-15">
                            <input
                              className="form-control"
                              {...register("title", {
                                required: "Title은 필수 입니다.",
                                onChange() {
                                  clearErrors("titleResult");
                                },
                              })}
                              type="text"
                              placeholder="Title"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="12">
                          <FormGroup className="m-t-15">
                            <input
                              className="form-control"
                              {...register("content", {
                                onChange() {
                                  clearErrors("content");
                                },
                              })}
                              type="text"
                              placeholder="message"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="12">
                          <Button
                            disabled={isSubmitting}
                            style={{
                              opacity: `${isValid ? "1" : "0.5"}`,
                              cursor: `${isValid ? "pointer" : "auto"}`,
                            }}
                            className="btn btn-danger-gradiant m-t-20 btn-arrow"
                          >
                            <span>
                              SUBMIT <i className="ti-arrow-right"></i>
                            </span>
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Col>
                <Col lg="4">
                  <div
                    style={{ height: "100%" }}
                    className="detail-box p-40 bg-info"
                  >
                    <h2 style={{ textAlign: "center" }} className="text-white">
                      img
                    </h2>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </Row>
      </div>
    </div>
  );
};
