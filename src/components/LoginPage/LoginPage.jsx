import { useNavigate } from "react-router-dom";
import uiMetaData from "../env/commonUIMetadata.json";
import Input from "../Input/Input";
import { validators } from "../../utils/fieldValidation";
import { FormProvider, useForm } from "react-hook-form";
import "./LoginPage.css";
import { loginUserThunk } from "../../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const LoginPage = () => {
  const methods = useForm();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state) => state.auth.loginResponse.isLoggedIn
  );
  const { login } = uiMetaData;
  const navigate = useNavigate();

  const submit = methods.handleSubmit(async (data) => {
    const resultAction = await dispatch(loginUserThunk({ ...data }));
    if (loginUserThunk.rejected.match(resultAction)) {
      alert("Unfortunately, " + resultAction.payload.message);
    }
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/landing-page");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="login-container">
      <h2>{login.heading}</h2>
      <FormProvider {...methods}>
        <form onSubmit={(event) => event.preventDefault()} noValidate>
          {login.fields.map((field) => {
            return (
              <Input
                key={field.name}
                type={field.type}
                placeholder={field.placeholder}
                name={field.name}
                inpValidation={validators[field.validatorSelector]}
                defaultValue={field.defaultValue}
              />
            );
          })}
          <button onClick={submit}> Login</button>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginPage;
