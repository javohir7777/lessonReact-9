import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requist } from "../server";

const ProductPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});

  useEffect(() => {
    async function oneProduct() {
      try {
        let { data } = await requist.get(`/categories/${id}`);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    }
    oneProduct();
  }, [id]);
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center flex-column">
      <h1 className="text-white">ProductPage: {id}</h1>
      <div className="card" style={{ width: "400px" }}>
        <img
          className="card-img-top"
          height={300}
          src={product.avatar}
          alt=""
        />
        <h1 className="text-title text-center">{product.name}</h1>
      </div>
    </div>
  );
};

export default ProductPage;
