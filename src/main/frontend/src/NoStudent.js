import React from "react";
import { Modal, Empty } from "antd";
import Container from "./Container";
import AddStudentForm from "./forms/AddStudentForm";
import Footer from "./Footer";

const NoStudent = ({
  closeAddStudentModal,
  modal,
  students,
  openAddStudentModal,
}) => {
  return (
    <Container>
      <Empty description={<h1>No Students Found</h1>} />
      <Modal
        title="Add New Student"
        visible={modal}
        onOk={() => closeAddStudentModal()}
        onCancel={() => closeAddStudentModal()}
        width={1000}
      >
        <AddStudentForm
          onSuccess={() => {
            closeAddStudentModal();
            window.location.reload(true);
          }}
        />
      </Modal>
      <Footer
        numberOfStudents={students?.length}
        handleOpen={openAddStudentModal}
      />
    </Container>
  );
};

export default NoStudent;
