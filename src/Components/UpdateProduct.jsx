// 
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { FiSave } from "react-icons/fi";

const UpdateProduct = () => {
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState([""]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productRes] = await Promise.all([
          fetch("https://fakestoreapi.com/products/categories"),
          fetch(`http://localhost:3000/products/${id}`)
        ]);
        
        if (!categoriesRes.ok || !productRes.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const [categorieData, showData] = await Promise.all([
          categoriesRes.json(),
          productRes.json()
        ]);
        
        setCategory(categorieData);
        setProduct(showData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  const getInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      
      alert("Product updated successfully!");
      navigate("/");
    } catch (error) {
      alert("Error updating product: " + error.message);
    }
  };

  // if (loading) {
  //   return (
  //     <Container className="text-center py-5">
  //       <Spinner animation="border" role="status" variant="primary">
  //         <span className="visually-hidden">Loading...</span>
  //       </Spinner>
  //     </Container>
  //   );
  // }

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={8} lg={6}>
          <div className="p-4 bg-secondary border rounded shadow-sm">
            <h2 className="mb-4 text-center text-light">
              <FiSave className="me-2" />
              Update Product
            </h2>
            <Form onSubmit={submitData}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">Category</Form.Label>
                <Form.Select
                  name="category"
                  value={product.category || ""}
                  onChange={getInput}
                  className="py-2"
                  required
                >
                  <option value="">-- Select Category --</option>
                  {category.map((val, i) => (
                    <option key={i} value={val}>
                      {val.charAt(0).toUpperCase() + val.slice(1)}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={product.title || ""}
                  onChange={getInput}
                  className="py-2"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={product.price || ""}
                  onChange={getInput}
                  className="py-2"
                  min="0"
                  step="0.01"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  value={product.description || ""}
                  onChange={getInput}
                  className="py-2"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-medium">Image URL</Form.Label>
                <div className="mb-3">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="img-thumbnail d-block mx-auto"
                      style={{ maxHeight: '150px' }}
                    />
                  )}
                </div>
                <Form.Control
                  type="url"
                  name="image"
                  value={product.image || ""}
                  onChange={getInput}
                  className="py-2"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button 
                  variant="outline-light" 
                  className="px-4"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="dark" 
                  className="px-4"
                >
                  Update Product
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateProduct;
