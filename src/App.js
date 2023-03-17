import { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteCourse, getCourses } from "./api/requests/coursers.js";
import Card from "./components/Card/index";
import { Loading } from "./components/Loading";
import { ModalCourse } from "./components/Modal/ModalCourse";
import { ModalViewCourse } from "./components/Modal/ModalViewCourse";
import NavBar from "./components/NavBar";

function App() {
  const [courseSelected, setCourseSelected] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const {
    isLoading,
    error,
    data: courses,
  } = useQuery("allCourses", async () => await getCourses());

  const client = useQueryClient();

  const deleteCourseMutation = useMutation(
    async (id) => await deleteCourse(id),
    {
      onSuccess: () => {
        client.invalidateQueries(["allCourses"]);
      },
      onError: () => {
        console.log("error");
      },
    }
  );

  const openSelectedModal = (modalType) => {
    const modal = new window.bootstrap.Modal(
      document.getElementById(modalType),
      {
        backdrop: true,
        keyboard: true,
        focus: true,
      }
    );
    modal.toggle();
  };

  const viewCourse = (course) => {
    setCourseSelected(false);
    setCourseSelected(course);
    openSelectedModal("view");
  };

  const editCourse = (course) => {
    setTypeModal("edit");
    setCourseSelected(false);
    setCourseSelected(course);
    openSelectedModal("edit");
  };

  const addCourse = () => {
    setTypeModal("add");
    setCourseSelected(false);
    openSelectedModal("edit");
  };

  const deleteCurseById = (id) => {
    deleteCourseMutation.mutate(id);
  };

  if (error) {
    return "<Loading />";
  }

  return (
    <div className="bs-tertiary-bg">
      <NavBar />
      <h1 className="text-center">My Courses APP</h1>

      <section className="container">
        <div className="mb-4">
          <button
            className="btn btn-primary d-flex  align-items-center gap-2"
            onClick={addCourse}
            aria-current="page"
            href="/"
          >
            Adicionar curso
            <BsPlusCircle fontSize={20} />
          </button>
        </div>
        {isLoading ? (
          <div className="d-flex flex-wrap gap-4 justify-content-center">
            <Loading />
          </div>
        ) : (
          <>
            <div className="d-flex flex-wrap gap-4 justify-content-center">
              <>
                {courses.data.map((course) => (
                  <Card
                    key={course.id}
                    course={course}
                    viewCourse={viewCourse}
                    editCourse={editCourse}
                    deleteCourse={deleteCurseById}
                  />
                ))}
              </>
            </div>

            <ModalViewCourse course={courseSelected} />
            <ModalCourse course={courseSelected} type={typeModal} />
          </>
        )}
      </section>
    </div>
  );
}

export default App;
