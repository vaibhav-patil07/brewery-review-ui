import "./App.css";
import { Button, Form, Input } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { login } from "./services/backend.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function App() {
  const [logInForm] = Form.useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const logInOnClick = async () => {
    let isFieldsValid = false;
    try {
      await logInForm.validateFields();
      isFieldsValid = true;
    } catch (error) {
      console.log("Error: ", error);
    }
    if (!isFieldsValid) {
      return;
    }
    const values = logInForm.getFieldsValue();
    try {
      const response = await login(values.email, values.password);
      const data = response.data;
      setError("");
      navigate("/dashboard", { state: { user: data } });
    } catch (error) {
      const response = error.response;
      const data = response.data;
      if (data.message) {
        setError(data.message);
      } else {
        setError("Something went wrong, please try again later!");
      }
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="title-container">
          <h1 className="title">Brewery Reviews</h1>
        </div>
        <div className="login-container">
          <h2 className="sub-title">Login</h2>
          <div className="form-container">
            <Form form={logInForm}>
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
                <Input size="large" placeholder="password" type="password" />
              </Form.Item>
              <Button
                className="login-button"
                type="primary"
                htmlType="submit"
                icon={<ArrowRightOutlined />}
                size="large"
                onClick={logInOnClick}
              >
                Login
              </Button>
            </Form>
          </div>
          <div className="create-account-container">
            <h3>New user ?</h3>
            <a href="/signup" className="create-account">
              Create Account
            </a>
          </div>
          <div className="error-container">
            <h3> {error} </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
