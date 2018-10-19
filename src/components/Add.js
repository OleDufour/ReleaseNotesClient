import React from 'react';
const Add = () => {
    return <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Add</span>
        </div>
        <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"   />
        <div class="input-group-append">
            <button class="btn btn-primary" type="button">Save</button>
        </div>
    </div>
}
export default Add;