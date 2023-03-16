import { BsEye, BsPencil, BsTrash } from "react-icons/bs";

export default function Card({ course, viewCourse, editCourse, deleteCourse }) {
  const currentCourse = course;

  return (
    <div class="card" style={{ width: "18rem", height: "100%" }}>
      <div
        className="col align-items-center justify-content-center"
        style={{
          width: "100%",
          height: "200px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          style={{
            objectFit: "fill",
            height: "200px",
            width: "100%",
          }}
          src={course?.image?.url}
          alt={course?.name}
        />
      </div>

      <div class="card-body" style={{ height: "60%" }}>
        <h5 class="card-title text-center">{course?.name}</h5>
        <div className="d-flex justify-content-center gap-2 p-2">
          <button
            className="btn btn-danger"
            onClick={() => deleteCourse(currentCourse.id)}
          >
            <BsTrash size={24} />
          </button>

          <button
            className="btn btn-warning"
            onClick={() => editCourse(currentCourse)}
          >
            <BsPencil size={24} />
          </button>

          <button
            className="btn btn-primary"
            onClick={() => viewCourse(currentCourse)}
          >
            <BsEye size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
