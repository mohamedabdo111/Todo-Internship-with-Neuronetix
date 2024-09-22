import { Trash2, Pencil } from "lucide-react";
import { Button, Form } from "react-bootstrap";
import Modals from "../Fixed/modal";
import React, { useState } from "react";
import baseUrl from "../../Api/baseUrl";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface Iprops {
  user: {
    description: string;
    id: number;
    status: string;
    title: string;
    userId: string;
  };
  viewFun: () => void;
}

interface IPUt {
  id: number;
  title: string;
  description: string;
  status: string;
}

const Task = ({ user, viewFun }: Iprops) => {
  //user auth
  const userLogged = localStorage.getItem("token");

  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [editTitle, setEEditTitle] = useState(user.title);
  const [editDesc, setEditDesc] = useState(user.description);
  const [editStatus, setEditStatus] = useState(user.status);

  const onHanleEditTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEEditTitle(e.target.value);
  };
  const onHanleEditDesc = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setEditDesc(e.target.value);
  };
  const onHanleEditStatus = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setEditStatus(e.target.value);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEditTodo = () => setShow(true);

  //   delete item
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleDeleteTodo = () => setShowDelete(true);

  //   onchange or on editt
  const PutObj: IPUt = {
    id: user.id,
    title: editTitle,
    description: editDesc,
    status: editStatus,
  };

  const onChangeTheEdit = async () => {
    try {
      const res = await baseUrl.put("/Task/Update", PutObj, {
        headers: {
          Authorization: `Bearer ${userLogged}`,
        },
      });

      if (res.status === 200) {
        handleClose();
        viewFun();
        toast.success("done , The task has been updated.");
      }
    } catch (error) {
      const errorobj = error as AxiosError;
      console.log(errorobj.response);
    }
  };

  const onDleleteTask = async () => {
    try {
      const res = await baseUrl.delete(`/Task/${user.id}`, {
        headers: {
          Authorization: `Bearer ${userLogged}`,
        },
      });

      if (res.status === 200) {
        setShowDelete(false);
        viewFun();
        toast.success("done , The task has been deleted.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card p-3 my-2 text-dark">
      <h3>{user.title}</h3>
      <p className="text-secondary">{user.description}</p>
      <div>
        <div className=" d-flex justify-content-between gap-2 align-items-center">
          <p className=" m-0 fw-bold    ">
            Status : <span>{user.status}</span>
          </p>
          <div>
            <Button variant="light mx-2" onClick={handleShowDelete}>
              <Trash2 className=" text-danger" />
            </Button>
            <Button variant="light" onClick={handleShow}>
              <Pencil className=" text-success" />
            </Button>
          </div>
        </div>

        {/* modal to update */}
        <Modals
          show={show}
          handleClose={handleClose}
          handleEdit={handleEditTodo}
          onsave={onChangeTheEdit}
          nameBtn="Update"
          styleBtn="success"
        >
          <input
            type="text"
            placeholder="Title"
            value={editTitle}
            onChange={onHanleEditTitle}
            className=" input-group-text w-100 text-start"
          />
          <textarea
            placeholder="Description"
            value={editDesc}
            onChange={onHanleEditDesc}
            className=" input-group-text w-100 text-start my-2"
          />
          <Form.Select
            aria-label="Default select example"
            value={editStatus}
            onChange={onHanleEditStatus}
          >
            <option value="Pending">Pending</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Completed">Completed</option>
          </Form.Select>
        </Modals>

        {/* modal to delete */}
        <Modals
          show={showDelete}
          handleClose={handleCloseDelete}
          handleEdit={handleDeleteTodo}
          onsave={onDleleteTask}
          nameBtn="Delete"
          styleBtn="danger"
        >
          <p>Are you sure , this task will be delete</p>
        </Modals>
      </div>
    </div>
  );
};

export default Task;
