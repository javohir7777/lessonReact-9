import { Fragment, useCallback, useEffect, useState } from "react";
import { requist } from "../server";
import Card from "../container/card";
import Search from "../container/search";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

const CategoryPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [category, setCategory] = useState([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState([]);

  const closeModal = () => setShow(false);

  const getCategory = async () => {
    try {
      let { data } = await requist.get("/categories");
      setCategory(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const openModal = () => {
    setShow(true);
    setSelected(null);
    reset({ avatar: "", name: "" });
  };

  const onSubmit = async (data) => {
    try {
      if (selected === null) {
        await requist.post("/categories", data);
      } else {
        await requist.put(`/categories/${selected}`, data);
      }
      getCategory();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const editData = async (id) => {
    try {
      setShow(true);
      setSelected(id);

      let {
        data: { name, avatar },
      } = await requist.get(`categories/${id}`);
      reset({ name, avatar });
      console.log(category);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    try {
      await requist.delete(`/categories/${id}`);
      getCategory();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handleSort = () => {
    setSort([...category].sort((a, b) => b.id - a.id));
  };
  console.log(sort);

  return (
    <Fragment>
      <Search
        category={category}
        openModal={openModal}
        handleSearch={handleSearch}
      />
      <div className="container my-3">
        <button className="btn btn-danger" onClick={handleSort}>
          Sort
        </button>
        <select className="form-select">
          <option value={category} onChange={getCategory}>
            Default
          </option>
          <option value={sort}>
            Sort
          </option>
        </select>
        <div className="row g-3">
          {category
            .filter((ell) => {
              return search.toLowerCase() === ""
                ? ell
                : ell.name.toLowerCase().includes(search);
            })
            .map((category) => (
              <Card
                key={category.id}
                {...category}
                editData={editData}
                deleteData={deleteData}
              />
            ))}
        </div>

        <Modal show={show} onHide={closeModal}>
          <form className="container mb-4" onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label htmlFor="avatar">Image</label>
                <input
                  {...register("avatar")}
                  type="url"
                  id="avatar"
                  className="form-control my-2"
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  name="name"
                  className="form-control my-2"
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                {selected ? "Add" : "Save"} Changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </Fragment>
  );
};

export default CategoryPage;
