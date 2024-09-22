import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import Header from "../Fixed/header";
import InputErrors from "../handelerrors/InputErrors";
import baseUrl from "../../Api/baseUrl";
import { useState } from "react";
import { AxiosError } from "axios";
import { IHandleErrorTRegiser } from "../../interfaces";

interface IFormInput {
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  userName: string;
}
const RegisterForm = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (data?.confirmPassword !== data?.password) {
      toast.error("Password not match");
    }
    setLoading(false);
    try {
      const res = await baseUrl.post("/Authentication/Register", data);

      if (res.status === 200) {
        toast.success("you are registerd , Please wait");

        setTimeout(() => {
          navigate("/login");
        }, 4000);
      }
    } catch (e) {
      const errorObj = e as AxiosError<IHandleErrorTRegiser>;
      toast.error(`${errorObj?.response?.data}`);
    } finally {
      setLoading(true);
    }
  };

  return (
    <>
      <Header></Header>
      <main className=" signin mx-auto mt-5 rounded-4 shadow p-4 position-relative">
        {/* {isPress ? (
        loading ? (
          <Loading
            style={
              "  position-absolute  translate-middle  top-50 start-50 shadow rounded-5 p-2"
            }
          ></Loading>
        ) : null
      ) : null} */}
        <header className="text-center ">
          <h3 className=" border-start border-5 border-warning mx-auto px-3 title-header mb-5">
            TODO
          </h3>
        </header>

        <section>
          <form onSubmit={handleSubmit(onSubmit)} className="row">
            <Col sm="6">
              <input
                {...register("firstName", {
                  required: "First Name is required",
                })}
                className=" input-group-text text-start w-100"
                placeholder="First Name"
                type="text"
              />
              {errors?.firstName?.message ? (
                <InputErrors msg={errors?.firstName?.message}></InputErrors>
              ) : null}
            </Col>
            <Col sm="6">
              <input
                {...register("lastName", { required: "Last name is required" })}
                className=" input-group-text text-start w-100 "
                placeholder="Last Name"
                type="text"
              />
              {errors?.lastName?.message ? (
                <InputErrors msg={errors?.lastName?.message}></InputErrors>
              ) : null}
            </Col>
            <Col sm="12">
              <input
                {...register("userName", { required: "UserName is required" })}
                className=" input-group-text text-start mt-3 w-100"
                placeholder="UserName"
                type="text"
              />
              {errors?.userName?.message ? (
                <InputErrors msg={errors?.userName?.message}></InputErrors>
              ) : null}
            </Col>
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
                {...register("password", {
                  required: "password is required",
                  minLength: 6,
                })}
                className=" input-group-text text-start mt-3 w-100"
                placeholder="Password"
              />
              {errors?.password?.message ? (
                <InputErrors msg={errors?.password?.message}></InputErrors>
              ) : null}
            </Col>
            <Col sm="12">
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                })}
                className=" input-group-text text-start mt-3 w-100"
                placeholder="Confirm Password"
              />
              {errors?.confirmPassword?.message ? (
                <InputErrors
                  msg={errors?.confirmPassword?.message}
                ></InputErrors>
              ) : null}
            </Col>

            <Col sm={12}>
              <Button
                type="submit"
                className={`w-100 bg-warning border-0 mt-3 ${
                  !loading ? "disabled" : null
                }`}
              >
                {!loading ? "Loading ..." : "Resgister"}
              </Button>
            </Col>
            <p className=" text-secondary text-center">
              Do you have an account?
              <Link to={"/login"} className=" text-warning">
                {" "}
                Login
              </Link>
            </p>
          </form>
        </section>
        <Toaster></Toaster>
      </main>
    </>
  );
};

export default RegisterForm;
