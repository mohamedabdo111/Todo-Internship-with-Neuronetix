import { Button, Container, Row } from "react-bootstrap";
import Header from "../../components/Fixed/header";
import Task from "../../components/landingPage/task";
import { useEffect, useState } from "react";
import baseUrl from "../../Api/baseUrl";
import toast, { Toaster } from "react-hot-toast";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const user = localStorage.getItem("UserData");
  const IsUsrHere = user ? JSON.parse(user) : null;

  console.log(loading);

  const navigate = useNavigate();

  const ViewAllData = () => {
    setLoading(true);
    try {
      baseUrl
        .get(`/Task/User/${IsUsrHere?.userId}`, {
          headers: {
            Authorization: `Bearer ${IsUsrHere?.token}`,
          },
        })
        .then((res) => setData(res.data));
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    ViewAllData();
  }, []);

  //   for modal

  console.log(data);

  console.log(data.length ? data : "no");

  const [editTitle, setEEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const onHanleEditTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEEditTitle(e.target.value);
  };
  const onHanleEditDesc = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEditDesc(e.target.value);
  };

  const onAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await baseUrl.post(
        "/Task/Create",
        {
          title: editTitle,
          description: editDesc,
        },
        {
          headers: {
            Authorization: `Bearer ${IsUsrHere?.token}`,
          },
        }
      );

      if (res.status === 201) {
        setEEditTitle("");
        setEditDesc("");
        toast.success("Done");
        ViewAllData();
      }

      console.log(res);
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 401) {
        toast.error("Please , login first");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    }
  };
  return (
    <>
      <Header></Header>
      <Container className="mt-4">
        <form onSubmit={onAddTask} className=" mb-4">
          <input
            type="text"
            placeholder="Title"
            value={editTitle}
            onChange={onHanleEditTitle}
            className="input-group-text text-start w-100 my-2"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={editDesc}
            onChange={onHanleEditDesc}
            className="input-group-text text-start w-100 my-2"
            required
          />

          <div className=" text-end">
            <Button type="submit">Add Task</Button>
          </div>
        </form>
        {/* display all tasks */}
        {loading ? (
          <h2 className="text-center">loading ...</h2>
        ) : data && data.length >= 1 ? (
          <>
            <h2 className=" mx-2 my-3">My Tasks</h2>
            <Row className="  flex-column-reverse mx-2">
              {data.map((item, idx) => {
                return <Task user={item} key={idx} viewFun={ViewAllData} />;
              })}
            </Row>
          </>
        ) : (
          <h3 className="text-center">You don't have any tasks!</h3>
        )}

        <Toaster></Toaster>
      </Container>
    </>
  );
};

export default LandingPage;
