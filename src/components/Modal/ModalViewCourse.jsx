export function ModalViewCourse({ course }) {
  return (
    <div
      className="modal fade"
      id="view"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="view"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{course?.name}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div
              className="mx-auto text-center"
              style={{
                width: "80%",
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
                src={course.image?.url}
                className="card-img-top"
                alt={course.name}
              />
            </div>
            <div className="p-4">
              <p className="text-center">
                {course.description ? course.description : "Sem descrição"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
