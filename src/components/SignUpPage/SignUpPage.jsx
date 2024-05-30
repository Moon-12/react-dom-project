import { useEffect, useState } from "react";
import uiData from "../env/commonUIMetadata.json";
import "./SignUpPage.css";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../Input/Input";
import { validators } from "../../utils/fieldValidation";
import Select from "../Select/Select";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../../redux/slice/roleSlice";

const SignUpPage = () => {
  const methods = useForm();
  const dispatch = useDispatch();
  const { signUp: signUpMetaData } = uiData;
  const [fields, setFields] = useState(uiData.signUp.fields);
  const [response, setResponse] = useState(null);
  const roles = useSelector((state) => state.role.roles);

  useEffect(() => {
    dispatch(fetchRoles());
  }, []);

  useEffect(() => {
    if (roles.length > 0) {
      setFields((prevFields) =>
        prevFields.map((field) => {
          if (field.name === "role") {
            return {
              ...field,
              options: roles.map((role) => ({
                value: role.roleId,
                label: role.role,
              })),
            };
          }
          return field;
        })
      );
    }
  }, [roles]);

  const submit = methods.handleSubmit((data) => {
    const { userName, email, password, role } = data;
    const postData = {
      username: userName,
      email: email,
      password: password,
      role: role,
    };
    axios
      .post("http://localhost:8080/api/auth/signup", postData)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        alert(err.data);
      });
  });

  return (
    <div className="signup-container">
      {response ? (
        <>
          <p>{response.message}</p>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      ) : (
        <>
          <h2>{signUpMetaData.heading}</h2>
          <FormProvider {...methods}>
            <form onSubmit={(event) => event.preventDefault()} noValidate>
              {fields.map((field) => {
                const fields =
                  field.type === "text" || field.type === "password" ? (
                    <Input
                      key={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      name={field.name}
                      inpValidation={validators[field.validatorSelector]}
                    />
                  ) : field.type === "select" ? (
                    <Select
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      options={field.options}
                      rules={validators[field.validatorSelector]}
                    />
                  ) : (
                    ""
                  );
                return fields;
              })}

              <button onClick={submit} value="Sign Up">
                Sign Up
              </button>
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
};

export default SignUpPage;
