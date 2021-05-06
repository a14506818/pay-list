import React, { useState } from "react";

import { Container, Button, Alert } from "react-bootstrap";

export default function PayList({ payment, payments, setPayments }) {
  const [deleteCheck, setDeleteCheck] = useState(false);

  function openDeleteCheck() {
    setDeleteCheck(true);
  }
  function closeDeleteCheck() {
    setDeleteCheck(false);
  }

  function handleDelete() {
    setPayments(
      payments.filter((p) => {
        return p.id !== payment.id;
      })
    );
  }

  return (
    <>
      <Container className="d-flex align-items-center justify-content-between w-100 m-1">
        <div>$ {payment.payAmount}</div>

        <div style={{ fontSize: "0.7rem" }}>PayBy: {payment.payBy}</div>
        <div style={{ fontSize: "0.7rem" }}>Des: {payment.descriptions}</div>

        <Button
          className=""
          variant="danger"
          size="sm"
          onClick={openDeleteCheck}
        >
          DELETE
        </Button>
      </Container>
      {deleteCheck && (
        <Alert variant="danger m-2 d-flex align-items-center justify-content-between">
          確認刪除 ?{" "}
          <div>
            <Button variant="primary m-1" onClick={handleDelete}>
              Confirm
            </Button>
            <Button variant="secondary" onClick={closeDeleteCheck}>
              Cancel
            </Button>
          </div>
        </Alert>
      )}
    </>
  );
}
