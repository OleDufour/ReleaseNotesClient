import React from 'react';
const AddComponent = () => {
    return <div class="input-group mb-3">
       
       <select className="form-control js-DisplayOn valid">
       </select>
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Add</span>
        </div>
        <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"   />
        <div class="input-group-append">
            <button class="btn btn-primary" type="button">Save</button>
        </div>
    </div>
}
export default AddComponent;