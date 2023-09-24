import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requist } from "../server";

const ProductPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function oneProduct() {
      try {
        let { data } = await requist.get(`/categories/${id}/products`);
        setProduct(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    oneProduct();
  }, [id]);
  console.log(product);
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center flex-column">
      <h1 className="text-white">ProductPage: {id}</h1>
      <div className="row g-3 container">
        {product.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-3 col-lg-4">
            <div key={product.id} className="card" style={{ width: "400px" }}>
              <img
                className="card-img-top"
                height={300}
                src={product.avatar}
                alt=""
              />
              <h1 className="text-title text-center">{product.name}</h1>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="card" style={{ width: "400px" }}>
        <img
          className="card-img-top"
          height={300}
          src={product.avatar}
          alt=""
        />
        <h1 className="text-title text-center">{product.name}</h1>
      </div> */}
    </div>
  );
};

export default ProductPage;
