import { useState } from "react";
import { BsPlusCircle, BsXCircle } from "react-icons/bs";
import { useMutation, useQuery, useQueryClient } from "react-query";
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
  const [categoryName, setCategoryName] = useState("");
  const [courseName, setCourseName] = useState("");

  const [description, setDescription] = useState("");
  const [category_Id, setCategory_Id] = useState(0);

  const [isAddCategory, setIsAddCategory] = useState(false);

  const {
    isLoading,
    error,
    data: categories,
  } = useQuery("allCategories", async () => await getAllCategories());

  const client = useQueryClient();

  const notify = (typeMessage, message) => {
    if (typeMessage === "success") {
      return toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    if (typeMessage === "alert") {
      return toast.warning(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    toast.error(`${message}`, {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const createCategoryMutation = useMutation(
    async () => await createCategory({ categoryName }),
    {
      onSuccess: () => {
        notify("success", "Categoria criada com sucesso!");
        client.invalidateQueries(["allCategories"]);
      },
      onError: (error) => {
        notify("error", `${error?.response.data.message}`);
      },
    }
  );

  const createCourseMutation = useMutation(
    async () => {
      const newCourse = await createCourse({
        courseName,
        description,
        category_Id,
      });
      if (!!image) {
        const formData = new FormData();
        formData.append("file", image);
        await addImage(newCourse.data.id, formData);
      }
    },

    {
      onSuccess: () => {
        notify("success", "Curso adicionado com sucesso!");
        client.invalidateQueries(["allCourses"]);
        document.getElementById("form-course").reset();
      },
      onError: (error) => {
        console.log(error);
        notify("error", `${error?.response.data.message}`);
      },
    }
  );

  const editCourseMutation = useMutation(
    async () => {
      await editCourse(course.id, {
        name: courseName || course.name,
        description,
        category_Id,
      });

      if (!!image) {
        const formData = new FormData();
        formData.append("file", image);
        await addImage(course.id, formData);
      }
    },
    {
      onSuccess: () => {
        notify("success", "Curso atualizado com sucesso!");
        client.invalidateQueries(["allCourses"]);
        document.getElementById("form-course").reset();
      },
      onError: () => {
        notify("error", "Falha ao atualizar curso.");
      },
    }
  );

  const handleEdit = async (e) => {
    e.preventDefault();
    editCourseMutation.mutate();
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!category_Id) {
      notify("alert", "Selecione uma categoria.");
      return;
    }

    if (!courseName) {
      notify("alert", "Dê um nome ao curso.");
      return;
    }

    createCourseMutation.mutate();
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setCategoryName("");
    setIsAddCategory(false);
    createCategoryMutation.mutate();
  };

  const handleSubmit = (e) => {
    if (type === "edit") {
      handleEdit(e);
    } else {
      handleCreate(e);
    }
  };

  if (isLoading) {
    return;
  }

  return (
    <div
      className="modal fade"
      id={"edit"}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <ToastContainer />
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="modal-header">
              <h5>
                {type === "edit"
                  ? `Editar curso ${course.name}`
                  : "Adicionar curso"}
              </h5>
            </div>
            <form id="form-course" onSubmit={handleSubmit}>
              {/***** Imagem **********/}
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
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
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Adicionar categoria
                    </label>
                    <div className="d-flex justify-content-between gap-2">
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setCategoryName(e.target.value)}
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
                      <option defaultValue>Selecione uma categoria</option>
                      {categories.data.map((category) => (
                        <option
                          key={category.name + category.id}
                          value={category.id}
                        >
                          {category.name}
                        </option>
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
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Nome do curso
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setCourseName(e.target.value)}
                  id="exampleFormControlInput1"
                  placeholder="nome do curso"
                />
              </div>

              {/*****  Descrição do curso **********/}
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
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
