import Pagination from "react-bootstrap/Pagination";

const PagesPagination = ({TotalPages , paginate}) => {
  let active = 1;
  let items = [];
  for (let number = 1; number <= TotalPages  ; number++) {
    items.push(number);
  }


  return (
    <div>
      <Pagination>
        {items.map((ele, index) => {
          return <Pagination.Item key={ele} onClick={() => paginate(ele)}>{ele}</Pagination.Item>;
        })}
      </Pagination>
      <br />
    </div>
  );
};

export default PagesPagination;
