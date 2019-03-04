import goods from "../components/goods";
import reviews from "../components/reviews";
import shops from "../components/shops";

export default [
    {
        path: "/",
        component: goods
    }, 
    {
        path: "/goods",
        component: goods,       
    },
    {
        path: "/reviews",
        component: reviews,       
    },
    {
        path: "/shops",
        component: shops,       
    }
];
