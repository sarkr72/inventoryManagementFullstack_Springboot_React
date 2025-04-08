
const Quantity = (props) => {
  const handleQtyChange = (e) => {
    let x = e.target.value;

    x = parseInt(x);

    if (isNaN(x) || x < 0) {
      props.setQuantity(0);
    } else {
      props.setQuanity(x);
    }
  };

  return (
    <>
      <td>
        <div className="d-flex" >
            <button className="btn btn-secondary p-0 " style={{width: "25px", height: "25px"}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"  style={{ display: 'block', padding: 0, margin: 0, width: "100%", height: "100%" }} className="bi bi-dash p-0" viewBox="0 0 16 16">
                  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
              </svg>
            </button>
            <input type="text" className="form-control" style={{height: 30, width: 70, marginLeft: "5px", marginRight: "5px" }} id="qty" name="quantity" value={props.quantity} onChange={handleQtyChange}/>
            <button className="btn btn-secondary p-0 " style={{width: "25px", height: "25px"}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"  style={{ display: 'block', padding: 0, margin: 0, width: "100%", height: "100%" }} className="bi bi-dash p-0" viewBox="0 0 16 16">
                  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
              </svg>
            </button>
        </div>
      </td>
    </>
  );
};

export default Quantity;
