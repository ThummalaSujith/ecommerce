import React from "react";

import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoryQuery,
} from "../../redux/api/categoryApiSlice";

import { useState } from "react";

import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";

const CategoryList = () => {
  const { data: categories } = useFetchCategoryQuery();

  const [name, setName] = useState("");

  const [selectCategory, setSelectCategory] = useState(null);

  const [updateName, setUpdateName] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required");
    }

    try {
      const result = await createCategory({ name }).unwrap(); // it sends to backend
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Creating category failed, try again");
    }
  };

  const handleDeleteCategory = async (e) => {
    e.preventDefault();
    try {
      const deletecategory = await deleteCategory(selectCategory._id).unwrap();

      if (deletecategory.error) {
        toast.error(deletecategory.error);
      } else {
        toast.success(`${selectCategory.name} is deleted`);
        setSelectCategory(null)
        setModalVisible(false)


      }
    } catch (error) {
        console.log(error)
        toast.error("Category deletion failed. Try again")
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updateName) {
      toast.error("Category name is required");
    }
    try {
      const result = await updateCategory({
        id: selectCategory._id,
        updatedCategory: {name:updateName}
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} Category successfully updated`);
        setSelectCategory(null);
        setUpdateName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      {/* {<AdminMenu/>} */}

      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
          handleDelete={handleDeleteCategory}
        />
        <br />

        <hr />

        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="bg-white border border-pink-500 text-black py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                onClick={() => {
                  setModalVisible(true);
                  setSelectCategory(category);
                  setUpdateName(category.name);
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updateName}
            setValue={(value) => setUpdateName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
