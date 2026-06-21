"use client";

import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import products from "./products";

const Product = () => {
  return (
    <div>
      <h3>Products</h3>
      <br />
      <Container>
        <Row>
          {products?.map((product) => {
            return (
              <Col md={4} key={product?.id} className="mb-3">
                <Link href={"/products/" + product?.id}>
                  <Card>
                    <Card.Img src={product?.thumbnail} />
                    <Card.Body>{product?.title}</Card.Body>
                    <Card.Footer className="d-flex justify-content-between">
                      <Button>AddToCart</Button>
                      <Button>AddToWishlist</Button>
                    </Card.Footer>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Product;