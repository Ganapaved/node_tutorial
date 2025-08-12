import { useState } from "react";
import { apiRequest } from "../utils/api";

export default function AddMenu() {
  const [form, setForm] = useState({
    name: "", price: "", taste: "sweet", is_drink: false, ingredients: ""
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({...form, [name]: type === "checkbox" ? checked : value});
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = {...form, ingredients: form.ingredients.split(",")};
    const res = await apiRequest("/menu", "POST", data, true);
    console.log(res);
    alert("Menu added!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Menu</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" />
      <select name="taste" value={form.taste} onChange={handleChange}>
        <option value="sweet">Sweet</option>
        <option value="spicy">Spicy</option>
        <option value="sour">Sour</option>
      </select>
      <label>
        Drink?
        <input type="checkbox" name="is_drink" checked={form.is_drink} onChange={handleChange} />
      </label>
      <input name="ingredients" value={form.ingredients} onChange={handleChange} placeholder="Comma separated ingredients" />
      <button type="submit">Add Menu</button>
    </form>
  );
}
