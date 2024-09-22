import { Button, Container, Row } from "react-bootstrap";
import Header from "../../components/Fixed/header";
import Task from "../../components/landingPage/task";
import { useEffect, useState } from "react";
import baseUrl from "../../Api/baseUrl";
import toast, { Toaster } from "react-hot-toast";

const LandingPage = () => {
  const [loading, setLoadin] = useState(true);
  const [data, setData] = useState([]);
  const user = localStorage.getItem("UserData");
  const IsUsrHere = user ? JSON.parse(user) : null;

  const ViewAllData = () => {
    try {
      baseUrl
        .get(`/Task/User/${IsUsrHere?.userId}`, {
          headers: {
            Authorization: `Bearer ${IsUsrHere.token}`,
          },
        })
        .then((res) => setData(res.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadin(false);
    }
  };

  useEffect(() => {
    setLoadin(true);
    ViewAllData();
  }, []);

  //   for modal

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
            Authorization: `Bearer ${IsUsrHere.token}`,
          },
        }
      );

      if (res.status === 201) {
        setEEditTitle("");
        setEditDesc("");
        toast.success("Done");
        ViewAllData();
      }
    } catch (error) {
      console.log(error);
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
          />
          <input
            type="text"
            placeholder="Description"
            value={editDesc}
            onChange={onHanleEditDesc}
            className="input-group-text text-start w-100 my-2"
          />

          <div className=" text-end">
            <Button type="submit">Add Task</Button>
          </div>
        </form>
        {/* display all tasks */}
        {loading ? (
          <h2 className="text-center">loading</h2>
        ) : data && data.length >= 1 ? (
          <Row className="  flex-column-reverse mx-2">
            {data.map((item, idx) => {
              return <Task user={item} key={idx} viewFun={ViewAllData} />;
            })}
          </Row>
        ) : null}

        <Toaster></Toaster>
      </Container>
    </>
  );
};

export default LandingPage;
