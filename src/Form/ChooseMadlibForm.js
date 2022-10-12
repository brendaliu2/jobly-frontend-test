import React, { useState } from "react";
import { template1, template2, template3, template4 } from './utils';

const templates = [template1, template2, template3, template4]

/** Form for choosing madlib template.
 *
 * Props:
 * - option 1 to 4 (madlib templates (string))
 * - handleChoice: function to call in parent.
 *
 * MadlibApp -> ChooseMadlibForm
 */

function ChooseMadlibForm({
  options = templates,
  handleChoice }) {

  const [formData, setFormData] = useState(0);

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: +value,
    }));
  }

  /** Call parent function and handle submit form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    handleChoice(formData);
  }


  return (
    <div className="ChooseMadlibForm container" >

      <form onSubmit={handleSubmit}>

        <div className="mb-3 container">
          <div className="align-items-center">
            <label htmlFor="ChooseMadlib-template"
              className="d-inline-flex">Choose a Template:&nbsp;&nbsp;
            </label>
            <select id="ChooseMadlib-template"
              name="template"
              value={formData.template}
              onChange={handleChange}
              className="form-control form-control-sm d-inline-flex text-center"
              defaultValue={'DEFAULT'}
            >
              <option value="DEFAULT" disabled>Select an Option</option>
              {options.map((t,i) => 
                <option key={i} value={i+1}>{t}</option>
                )}
              <option value={options.length+1}>Surprise Me!</option>

            </select>

          </div>
          <button className="btn-primary btn btn-sm m-1 ChooseMadlibForm-addBtn">
            Continue
          </button>
        </div>

      </form>

    </div>
  );
}

export default ChooseMadlibForm;
