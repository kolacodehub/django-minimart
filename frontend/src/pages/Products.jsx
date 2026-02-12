import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get("/products/");
        setProducts(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-5 bg-white" style={{ minHeight: "80vh" }}>
        <div className="container h-100 d-flex flex-column justify-content-center align-items-center">
          <div
            className="spinner-border text-primary border-width-2"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted fw-medium">Loading collection...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-5 bg-white">
        <div className="container text-center py-5">
          <div
            className="alert alert-light border-danger text-danger d-inline-block px-5"
            role="alert"
          >
            <i className="bi bi-exclamation-triangle me-2"></i> {error}
          </div>
          <div className="mt-3">
            <button
              className="btn btn-outline-dark btn-sm fw-bold px-4"
              onClick={() => window.location.reload()}
            >
              RETRY
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-5 bg-light-subtle">
      <div className="container">
        {/* Section Header */}
        <div className="row mb-5 justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="display-6 fw-bold text-dark mb-2 text-center">
              Featured Products
            </h2>
            <p className="text-secondary lead fs-6 text-center">
              Browse our curated selection of high-performance tech essentials.
            </p>
          </div>
        </div>

        {/* Products Grid - Using Bootstrap Grid for better spacing */}
        <div className="row g-4">
          {products?.length > 0 ? (
            products?.map((product) => (
              <div
                key={product?.id}
                className="col-12 col-md-6 col-lg-4 col-xl-3"
              >
                <div className="card h-100 border-0 shadow-sm overflow-hidden">
                  {/* Image Wrapper with Aspect Ratio */}
                  <div className="ratio ratio-4x3 bg-light">
                    <img
                      src={product?.image}
                      alt={product?.name}
                      className="object-fit-cover transition-zoom"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="card-body d-flex flex-column p-4">
                    <div className="mb-2">
                      <h3
                        className="h6 fw-bold text-dark mb-1 text-truncate"
                        title={product?.name}
                      >
                        {product?.name}
                      </h3>
                      <span className="badge rounded-pill bg-light text-secondary border fw-normal">
                        Tech
                      </span>
                    </div>

                    <p className="small text-muted mb-4 flex-grow-1">
                      {product?.description
                        ? `${product?.description.substring(0, 70)}...`
                        : "No description available"}
                    </p>

                    <div className="d-flex align-items-end justify-content-between">
                      <div>
                        <div
                          className="small text-uppercase text-muted fw-semibold"
                          style={{ fontSize: "0.65rem" }}
                        >
                          Price
                        </div>
                        <span className="h5 fw-bold text-dark mb-0">
                          ${product?.price}
                        </span>
                      </div>

                      <Link
                        to={`/product/${product?.id}`}
                        className={`btn btn-primary btn-sm px-3 fw-bold ${product?.stock === 0 ? "disabled opacity-50" : ""}`}
                        aria-disabled={product?.stock === 0}
                      >
                        {product?.stock > 0 ? "View Details" : "Sold Out"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <p className="text-muted">No products available at this time.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
