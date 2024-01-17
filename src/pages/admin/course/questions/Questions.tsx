import { useEffect } from "react";
import { apiProvider } from "../../../../network/apiProvider";
import { useParams } from "react-router-dom";

function Questions() {
  const { id } = useParams();

  async function viewquestion() {
    const data = {
      page: 1,
      search: "",
      userId: id,
    };
    const result = await apiProvider.viewQuestion(data);
    if (result != null) {
      console.log("ndjdc");
    }
  }
  useEffect(() => {

  },[])

  // try {
  //   const result = await apiProvider.viewQuestion({
  //     page: 0,
  //     search: "",
  //     subjecId: +id,
  //   });
  //   if (result != null) {
  //     console.log(result.data);
  //   }
  // } catch (e) {
  //   console.log(e);
  // }

  return <div>sads</div>;
}

export default Questions;
