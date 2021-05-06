import useLocalStorage from "./useLocalStorage";
import { Container, Button, Card, Alert, Modal, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import PayList from "./PayList";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [user1, setUser1] = useLocalStorage("user1", "user1");
  const [user2, setUser2] = useLocalStorage("user2", "user2");
  const [totalMoney, setTotalMoney] = useLocalStorage("totalMoney", 0);
  const [payments, setPayments] = useLocalStorage("userPayments", []);
  const [open, setOpen] = useLocalStorage("open", false);

  const [payAmount, setPayAmount] = useState("");
  const [payBy, setPayBy] = useState(user1);
  const [descriptions, setDescriptions] = useState("");

  useEffect(() => {
    if (payments.length === 0) return setTotalMoney(0);
    setTotalMoney(
      payments.reduce((total, payment) => {
        if (payment.payBy === user1) return total + parseInt(payment.payAmount);
        if (payment.payBy === user2) return total - parseInt(payment.payAmount);
        return total;
      }, 0)
    );
  }, [payments, user1, user2, setTotalMoney]);

  function user1Pay() {
    setOpen(true);
    setPayBy(user1);
  }
  function user2Pay() {
    setOpen(true);
    setPayBy(user2);
  }
  function closeModal() {
    setPayAmount("");
    setDescriptions("");
    setOpen(false);
  }
  function handleSubmit(e) {
    e.preventDefault();

    console.log("payAmount: " + payAmount);
    console.log("descriptions: " + descriptions);
    console.log("payBy: " + payBy);
    const id = uuidv4();
    setPayments([
      ...payments,
      {
        id: id,
        payBy: payBy,
        payAmount: payAmount,
        descriptions: descriptions,
      },
    ]);
    closeModal();
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center "
        style={{
          minHeight: "100vh",
          maxWidth: "500px",
          flexDirection: "column",
        }}
      >
        <Card className="w-100">
          <div className="d-flex justify-content-between align-items-center">
            <div className="m-2">
              <input
                type="text"
                value={user1}
                onChange={(e) => setUser1(e.target.value)}
                style={{ width: "100px" }}
              />
              <Button size="sm" className="m-2" onClick={user1Pay}>
                Pay
              </Button>
            </div>
            <div>
              <input
                type="text"
                value={user2}
                onChange={(e) => setUser2(e.target.value)}
                style={{ width: "100px" }}
              />
              <Button size="sm" className="m-2" onClick={user2Pay}>
                Pay
              </Button>
            </div>
          </div>
          <Card.Body>
            <div>
              <Alert variant="success" className="text-center">
                {totalMoney < 0
                  ? `Total : ${user1} 欠 ${user2}  ${totalMoney * -1} 元`
                  : `Total : ${user2} 欠 ${user1}  ${totalMoney} 元`}
              </Alert>
            </div>
          </Card.Body>
          <Card.Footer>
            {payments &&
              payments.map((payment) => (
                <PayList
                  key={payment.id}
                  payment={payment}
                  payments={payments}
                  setPayments={setPayments}
                ></PayList>
              ))}
          </Card.Footer>
        </Card>
      </Container>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Payment Amount</Form.Label>
              <Form.Control
                type="text"
                required
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
              />
              <Form.Label>Descriptions</Form.Label>
              <Form.Control
                type="text"
                required
                value={descriptions}
                onChange={(e) => setDescriptions(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Add Payment
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default App;
