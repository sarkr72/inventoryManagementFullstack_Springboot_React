import React from 'react'

const AddForm = ({message, data, update, handleChange, handleSubmit}) => {
  
   return (
     <div>
       <div style={{minWidth: "430px"}} className="text-white shadow-lg mb-5 mt-5 d-flex flex-column col-lg-3 col-md-6 m-auto bg-dark p-4 border rounded-3">
         <div
           style={{
             height: "500px",
             width: "90%",
             maxWidth: "600px",
             margin: "0 auto",
           }}
           className="d-flex flex-column justify-content-center "
         >
           <div
             style={{ marginTop: "-80px" }}
             className="d-flex flex-column  align-items-center"
           >
             {update && <h5 className="text-white mb-5"> Update {message}</h5>}
             {!update && <h5 className="text-white mb-5"> Add {message}</h5>}
           </div>
           <form onSubmit={handleSubmit}>
             <div className="row d-flex flex-row align-items-center">
               <label className="col-lg-2 col-md-2">Name:</label>
               <div className="col-lg-10 col-md-10">
                 <input
                   type="text"
                   className="form-control "
                   name="name"
                   placeholder={`${message} Name`}
                   value={data.name}
                   onChange={handleChange}
                   required
                 />
               </div>
             </div>
             <div
               style={{ marginTop: 10 }}
               className="row d-flex flex-row align-items-center"
             >
               <label className="col-lg-2 col-md-2">Address:</label>
               <div className="col-lg-10 col-md-10">
                 <textarea
                   type="text"
                   className="form-control"
                   name="address"
                   placeholder={`${message} Address`}
                   value={data.address}
                   onChange={handleChange}
                   required
                 />
               </div>
             </div>
             <div
               style={{ marginTop: 10 }}
               className="row d-flex flex-row align-items-center"
             >
               <label className="col-lg-2 col-md-2">Contact:</label>
               <div className="col-lg-10 col-md-10">
                 <textarea
                   type="text"
                   className="form-control"
                   name="contact"
                   placeholder="Contact"
                   value={data.contact}
                   onChange={handleChange}
                   required
                 />
               </div>
             </div>
             <div
               style={{ maxWidth: "100px" }}
               className="m-auto mt-3 text-center"
             >
               <button
                 style={{ marginTop: "20px" }}
                 type="submit"
                 className="btn btn-primary w-100 mb-2"
               >
                 {update != null ? "Update" : "Submit"}
               </button>
             </div>
           </form>
         </div>
       </div>
     </div>
   );
}

export default AddForm