import { useEffect, useState } from "react";
import { BsPlusCircle, BsXCircle } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "react-tooltip";
import { createCategory, getAllCategories } from "../../api/requests/category";
import {
  addImage,
  createCourse,
  editCourse,
} from "../../api/requests/coursers";

export function ModalCourse({ course, type }) {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category_Id, setCategory_Id] = useState(0);

  const [allCategories, setAllCategories] = useState([]);
  const [isAddCategory, setIsAddCategory] = useState(false);

  const notify = (type, message) => {
    if (type === "success") {
      return toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    if (type === "alert") {
      return toast.warning(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    toast.error(`${message}`, {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", image);

    try {
      const courseName = name || course.name;

      await editCourse(course.id, {
        name: courseName,
        description,
        category_Id,
      });

      if (!!image) {
        await addImage(course.id, formData);
      }
      document.location.reload();
    } catch (error) {
      const message = error?.response?.data.message;
      notify("error", message);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!category_Id) {
      notify("alert", "Selecione uma categoria.");
      return;
    }

    if (!name) {
      notify("alert", "Dê um nome ao curso.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await createCourse({ name, description, category_Id });

      if (!!image) {
        await addImage(response.data.id, formData);
      }

      document.location.reload();
    } catch (error) {
      const message = error?.response?.data.message;
      notify("error", message);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await createCategory({ name });
      const message = response?.data.message;

      setIsAddCategory(!isAddCategory);

      notify("success", message);
    } catch (error) {
      const message = error?.response?.data.message;
      notify("error", message);
    }
  };

  const handleSubmit = (e) => {
    if (type === "edit") {
      handleEdit(e);
    } else {
      handleCreate(e);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await getAllCategories();
      setAllCategories(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div
      className="modal fade"
      id="edit"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div classNameName="modal-header">
              <h5>
                {type === "edit"
                  ? `Editar curso ${course.name}`
                  : "Adicionar curso"}
              </h5>
            </div>
            <form onSubmit={handleSubmit}>
              <ToastContainer />
              {/***** Imagem **********/}
              <div className="mb-3">
                <label for="formFile" className="form-label">
                  Imagem do curso
                </label>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  className="form-control"
                  type="file"
                  id="formFile"
                />
              </div>

              {/*****  Seleção de categoria **********/}
              <div className="d-flex align-items-center gap-4 mb-3">
                {isAddCategory ? (
                  <div className="mb-3">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Adicionar categoria
                    </label>
                    <div className="d-flex justify-content-between gap-2">
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setName(e.target.value)}
                          id="exampleFormControlInput1"
                          placeholder="Ex: Programação"
                        />
                      </div>

                      <div className="d-flex gap-2">
                        <Tooltip id="my-tooltip" />
                        <span
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content="Adicionar"
                        >
                          <button
                            onClick={handleAddCategory}
                            className="btn btn-primary btn-sm"
                          >
                            <BsPlusCircle size={24} />
                          </button>
                        </span>

                        <Tooltip id="my-tooltip" />
                        <span
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content="Cancelar"
                        >
                          <button
                            onClick={() => setIsAddCategory(false)}
                            className="btn btn-danger btn-sm"
                          >
                            <BsXCircle size={24} />
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <select
                      className="form-select"
                      aria-label="select category"
                      onChange={(e) => setCategory_Id(e.target.value)}
                    >
                      <option selected>Selecione uma categoria</option>
                      {allCategories.map((category) => (
                        <option value={category.id}>{category.name}</option>
                      ))}
                    </select>

                    <Tooltip id="my-tooltip" />
                    <span
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Adicionar nova categoria."
                    >
                      <button
                        onClick={() => setIsAddCategory(true)}
                        className="btn btn-primary btn-sm"
                      >
                        <BsPlusCircle size={24} />
                      </button>
                    </span>
                  </>
                )}
              </div>

              {/*****  Nome do curso **********/}
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Nome do curso
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  id="exampleFormControlInput1"
                  placeholder="nome do curso"
                />
              </div>

              {/*****  Descrição do curso **********/}
              <div className="mb-3">
                <label for="exampleFormControlTextarea1" className="form-label">
                  Descrição
                </label>
                <textarea
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>

              {/*****  Submit **********/}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
