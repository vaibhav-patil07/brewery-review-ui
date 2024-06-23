import { Button, Form, Input } from "antd";
import {
  ArrowRightOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import "./App.css";
import { signup } from "./services/backend.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();
  const [signupForm] = Form.useForm();
  const [error, setError] = useState("");
  const signupOnClick = async () => {
    try {
      await signupForm.validateFields();
      const values = signupForm.getFieldsValue();
      const { name, email, password } = values;
      const response = await signup(name, email, password);
      if (response.status === 201) {
        navigate("/");
      } else {
        setError("Something went wrong, please try again later!");
      }
      setError("");
    } catch (error) {
      console.log("Error: ", error);
      setError("Something went wrong, please try again later!");
    }
  };
  return (
    <div>
      <div className="container">
        <div className="title-container">
          <h1 className="title">Brewery Reviews</h1>
        </div>
        <div className="login-container">
          <h2 className="sub-title">Login</h2>
          <div className="form-container">
            <Form form={signupForm}>
              <Form.Item
                className="login-field"
                name="name"
                colon={false}
                rules={[{ required: true, message: "email cannot be empty!" }]}
              >
                <Input size="large" placeholder="name" type="text" />
              </Form.Item>
              <Form.Item
                className="login-field"
                name="email"
                colon={false}
                rules={[{ required: true, message: "email cannot be empty!" }]}
              >
                <Input size="large" placeholder="email" type="email" />
              </Form.Item>
              <Form.Item
                className="login-field"
                name="password"
                colon={false}
                rules={[
                  { required: true, message: "password cannot be empty!" },
                ]}
              >
                <Input.Password
                  placeholder="password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <Button
                className="login-button"
                type="primary"
                htmlType="submit"
                icon={<ArrowRightOutlined />}
                size="large"
                onClick={signupOnClick}
              >
                Signup
              </Button>
            </Form>
            <div className="error-container">
              <h3> {error} </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signup;
