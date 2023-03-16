export function ModalViewCourse({ course }) {
  return (
    <div
      class="modal fade"
      id="view"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="view"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{course?.name}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
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
                class="card-img-top"
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
