import React from "react";
import "css/style.scss";
import "css/app.scss";

const Dropdown = () => {
  return (
    <React.Fragment>
      <div class="field">
        <p class="control has-icons-left">
          <span class="select">
            <select>
              <option selected>Country</option>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </span>
          <span class="icon is-small is-left">
            <i class="fas fa-globe"></i>
          </span>
        </p>
      </div>
    </React.Fragment>
  );
};

export default Dropdown;
