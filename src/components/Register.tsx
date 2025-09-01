import React from "react";
import Form from "./Form";
const Register: React.FC = () => {
  return (
    <div>
      <Form
        route="api/user/register/"
        method="register"
      />
    </div>
  );
};

export default Register;
