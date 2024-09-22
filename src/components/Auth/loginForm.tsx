import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import { Link, useNavigate } from "react-router-dom";
import Header from "../Fixed/header";
import { useForm, SubmitHandler } from "react-hook-form";
import InputErrors from "../handelerrors/InputErrors";
import { useState } from "react";
import baseUrl from "../../Api/baseUrl";
import { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";

interface IFormInput {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(false);
    try {
      const res = await baseUrl.post("/Authentication/Login", data);

      if (res.status === 200) {
        localStorage.setItem("UserData", JSON.stringify(res.data));
        localStorage.setItem("token", res?.data?.token);
        toast.success("Done , Please Wait");

        navigate("/");
      }
    } catch (error) {
      const errorObj = error as AxiosError;
      toast.error(`${errorObj?.response?.data}`);
    } finally {
      setLoading(true);
    }
  };
  return (
    <>
      <Header></Header>
      <main className=" signin mx-auto mt-5 rounded-4 shadow p-4 position-relative">
        <header className="text-center ">
          <h3 className=" border-start border-5 border-warning mx-auto px-3 title-header">
            TODO
          </h3>
          <h5 className="title-header mx-auto my-3">SIGN IN</h5>
          <p className="text-secondary">
            Enter your credentials to access your account
          </p>
        </header>

        <section>
          <form onSubmit={handleSubmit(onSubmit)} className="row">
            <Col sm="12">
              <input
                {...register("email", { required: "Email is required" })}
                className=" input-group-text text-start mt-3 w-100"
                placeholder="Email"
                type="email"
              />
              {errors?.email?.message ? (
                <InputErrors msg={errors?.email?.message}></InputErrors>
              ) : null}
            </Col>
            <Col sm="12">
              <input
                type="password"
                {...register("password", { required: "password is required" })}
                className=" input-group-text text-start mt-3 w-100"
                placeholder="Password"
              />
              {errors?.password?.message ? (
                <InputErrors msg={errors?.password?.message}></InputErrors>
              ) : null}
            </Col>

            <Col sm={12}>
              <Button type="submit" className="w-100 bg-warning border-0 mt-3">
                {!loading ? "Loading ..." : "Login"}
              </Button>
            </Col>

            <p className=" text-secondary text-center">
              Don't have an account
              <Link to={"/register"} className=" text-warning">
                {" "}
                Register
              </Link>
            </p>
          </form>
        </section>
        <Toaster></Toaster>
      </main>
    </>
  );
};

export default LoginForm;
