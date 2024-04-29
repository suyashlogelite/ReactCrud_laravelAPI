function Home() {
  return (
    <div>
      <header className="bg-dark py-5">
        <div className="container px-5">
          <div className="row gx-5 align-items-center justify-content-center">
            <div className="col-lg-8 col-xl-7 col-xxl-6">
              <div className="my-5 text-center text-xl-start">
                <h1 className="display-5 fw-bolder text-white mb-2">
                  Home Page
                </h1>
                <p className="lead fw-normal text-white-50 mb-4">
                A student is a person who goes to school to learn something. Students can be children, teenagers, or adults who are going to school, but it may also be other people who are learning, such as in college or university. A younger student is often called a pupil. Usually, students will learn from a teacher or a lecturer if at university. They also do much reading. A student can also be a person studying for a specific profession.
                </p>
              </div>
            </div>
            <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
              <img
                className="img-fluid rounded-3 my-5"
                src="https://wallpapercave.com/wp/wp9669759.jpg"
                alt="..."
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;
