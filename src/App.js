import { useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { deleteCourse, getCourses } from "./api/requests/coursers.js";
import Card from "./components/Card";
import { ModalCourse } from "./components/Modal/ModalCourse";
import { ModalViewCourse } from "./components/Modal/ModalViewCourse";
import NavBar from "./components/NavBar";

function App() {
  const [allCourses, setAllCourses] = useState([]);
  const [courseSelected, setCourseSelected] = useState(false);
  const [typeModal, setTypeModal] = useState("");

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

  const deleteCurseById = async (id) => {
    console.log(id);
    await deleteCourse(id);
    document.location.reload(true);
    return;
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = async () => {
    const { data } = await getCourses();
    console.log(data);
    setAllCourses(data);
  };

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

        <div className="d-flex flex-wrap gap-4 justify-content-center">
          {allCourses.map((course) => (
            <Card
              key={course.id}
              course={course}
              viewCourse={viewCourse}
              editCourse={editCourse}
              deleteCourse={deleteCurseById}
            />
          ))}
        </div>

        <ModalViewCourse course={courseSelected} />
        <ModalCourse course={courseSelected} type={typeModal} />
      </section>
    </div>
  );
}

export default App;
