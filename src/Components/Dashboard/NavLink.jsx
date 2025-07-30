import { faUsers, faPlus, faCartShopping, faTruckFast } from "@fortawesome/free-solid-svg-icons";


export const links = [
    {
        name: "Users",
        path: "users",
        icon: faUsers,
        role: ["1995"]
    },
    {
        name: "Add User",
        path: "user/add",
        icon: faPlus,
        role: ["1995"]
    },
    {
        name: "Categories",
        path: "categories",
        icon: faCartShopping,
        role: ["1999","1995"]
    },
    {
        name: "Add Category",
        path: "category/add",
        icon: faPlus,
        role: ["1999","1995"]
    },
    {
        name: "Products",
        path: "products",
        icon: faTruckFast,
        role: ["1999","1995"]
    },
    {
        name: "Add Product",
        path: "product/add",
        icon: faPlus,
        role: ["1999","1995"]
    },
    {
        name: "writer",
        path: "writer",
        icon: faPlus,
        role: ["1996","1995"]
    }
]
