import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";

export default function MenuList() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    apiRequest("/menu").then(setMenus);
  }, []);

  return (
    <div style={containerStyles}>
      <h2 style={headingStyles}>🍴 Menu Items</h2>

      {menus.length === 0 ? (
        <p style={emptyTextStyles}>No menu items available.</p>
      ) : (
        <div style={gridStyles}>
          {menus.map((m, i) => (
            <div key={i} style={cardStyles}>
              <h3 style={itemNameStyles}>{m.name}</h3>
              <p style={priceStyles}>₹{m.price}</p>
              {m.taste && <p style={tasteStyles}>Taste: {m.taste}</p>}
              {m.is_drink && <p style={drinkTagStyles}>🥤 Drink</p>}
              {m.ingredients?.length > 0 && (
                <p style={ingredientsStyles}>
                  Ingredients: {m.ingredients.join(", ")}
                </p>
              )}
              <p style={salesStyles}>Sold: {m.num_sales || 0}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const containerStyles = {
  padding: "20px",
};

const headingStyles = {
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "2rem",
  color: "#f5f5f5",
};

const emptyTextStyles = {
  textAlign: "center",
  color: "#aaa",
};

const gridStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
};

const cardStyles = {
  backgroundColor: "#2a2a2a",
  padding: "15px",
  borderRadius: "8px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
  transition: "transform 0.2s ease",
};

const itemNameStyles = {
  fontSize: "1.2rem",
  margin: "0 0 5px",
  color: "#fff",
};

const priceStyles = {
  fontWeight: "bold",
  color: "#ffce00",
  margin: "0 0 10px",
};

const tasteStyles = {
  color: "#ccc",
  fontSize: "0.9rem",
};

const drinkTagStyles = {
  color: "#4fc3f7",
  fontWeight: "bold",
};

const ingredientsStyles = {
  color: "#aaa",
  fontSize: "0.85rem",
  marginTop: "8px",
};

const salesStyles = {
  color: "#888",
  fontSize: "0.8rem",
  marginTop: "8px",
};
