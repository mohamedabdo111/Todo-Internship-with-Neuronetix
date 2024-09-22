import { ReactNode } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface Iprops {
  show: boolean;
  nameBtn: string;
  styleBtn: string;
  handleClose: () => void;
  handleEdit: () => void;
  children: ReactNode;
  onsave: () => void;
}

const Modals = ({
  show,
  handleClose,
  onsave,
  children,
  nameBtn,
  styleBtn,
}: Iprops) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant={styleBtn} onClick={onsave}>
          {nameBtn}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modals;
