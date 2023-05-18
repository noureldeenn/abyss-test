import React from "react";
import color from "../../Constants/color";
import Buttons from "../Buttons/Buttons";

type objProps = {
  name: string;
  level: number;
  value: string;
  isEditing: Boolean;
  color: string;
  children: objProps[];
};

function Category() {
  //All State Start From Here
  const [categories, setCategories] = React.useState<objProps>({
    name: "level_1",
    level: 1,
    value: "Category",
    isEditing: false,
    color: color[0],
    children: [],
  });
  // All State End Here

  //All Function For Category Start
  function add(obj: objProps, parent_obj: objProps) {
    const level = obj?.level + 1;
    const color_val: string = color[obj.level];
    obj.children.push({
      name: parent_obj.name + "_" + (parent_obj.children.length + 1),
      level: level,
      color: color_val,
      value: "",
      isEditing: true,
      children: [],
    });
    setCategories((data) => {
      return { ...data };
    });
  }
  function close(parent_obj: objProps, idx: Number) {
    parent_obj.children = parent_obj.children.filter((data, id) => id !== idx);
    setCategories((data) => {
      return { ...data };
    });
  }
  function confirm(obj: objProps) {
    if (obj.value) {
      obj.isEditing = false;
      setCategories((data) => {
        return { ...data };
      });
    }
  }
  function cancle(parent_obj: objProps, idx: Number) {
    parent_obj.children = parent_obj.children.filter((data, id) => id !== idx);
    setCategories((data) => {
      return { ...data };
    });
  }
  function edit(obj: objProps) {
    obj.isEditing = true;
    setCategories((data) => {
      return { ...data };
    });
  }
  function subCategory(obj: objProps) {
    return obj?.children?.map((data: objProps, idx) => {
      return (
        <li>
          <div className="category_main_div">
            <div className="category_main_value_div">
              <div
                className="category_value"
                style={{ background: `${obj.color}` }}
              >
                {!data.isEditing ? (
                  data.value
                ) : (
                  <input
                    type="text"
                    className="input_focus"
                    autoFocus={true}
                    onChange={(e) => (data.value = e.target.value)}
                  ></input>
                )}
              </div>
            </div>
            <Buttons
              confirm={confirm}
              add={add}
              obj={data}
              edit={edit}
              close={close}
              parent_obj={obj}
              cancle={cancle}
              idx={idx}
            />
          </div>

          {data?.children?.length !== 0 ? <ul>{subCategory(data)}</ul> : null}
        </li>
      );
    });
  }
  //All Function For Category End

  let draggable = document.getElementById("parent_ul");
  let dropzone = document.getElementById("dropzone");

  draggable?.addEventListener("dragstart", function (e) {
    e.dataTransfer?.setData("text/plain", "Anything");
  });

  draggable?.addEventListener("dragover", function (e) {
    e.preventDefault();
  });

  draggable?.addEventListener("drop", function (e: any) {
    e.preventDefault();
    const data = e?.dataTransfer?.getData("text/plain");
    // dropzone.innerHTML =  data ;
  });

  return (
    <div id="dropzone" className="container">
      <div className="row">
        <div className="category">
          <ul id="parent_ul" draggable="true">
            <li>
              <div className="category_main_div">
                <div className="category_main_value_div">
                  <div
                    className="category_value"
                    style={{ background: "white", border: "1px solid #439A97" }}
                  >
                    Category
                  </div>
                </div>
                <Buttons
                  confirm={confirm}
                  add={add}
                  obj={categories}
                  edit={edit}
                  close={close}
                  parent_obj={categories}
                  cancle={cancle}
                  idx={0}
                />
              </div>

              {categories.children.length !== 0 ? (
                <ul>{subCategory(categories)}</ul>
              ) : null}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Category;
