import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import AddExamQuestion from "./AddExamQuestion";
import ViewAllQuestions from "./ViewAllQuestions";

const ViewExamQuestions = () => {
  const location = useLocation();

  let [exam, setExam] = useState(location.state);

  return (
    <div className="container-fluid mb-5">
      <div class="row">
        <div class="col-sm-4 mt-2">
          <AddExamQuestion exam={exam} />
        </div>

        <div class="col-sm-8 mt-2">
          <ViewAllQuestions exam={exam} />
        </div>
      </div>
    </div>
  );
};

export default ViewExamQuestions;
