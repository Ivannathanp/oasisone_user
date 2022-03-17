import React, {useState} from 'react'

function Data() {
    const categoryData = [
        {
          id: 1,
          text: 'Gurame'
        },
        {
          id: "2",
          text: "Kerapu",
        },
        {
          id: "3",
          text: "Udang",
        },
        {
          id: "4",
          text: "Cumi",
        },
        {
          id: "5",
          text: "Sayur",
        },
        {
          id: "6",
          text: "Minum",
        },
      ]
      
      const restaurantData = [
        {
          id: 1,
          name: "Telaga Seafood",
          photo: require("../icons/Logo.png"),
          location: "Jl. Raya Serpong Kav. Komersial No. 6, Bumi Serpong Damai, Jelupang, Lengkong Karya, Kec. Serpong Utara, Kota Tangerang Selatan, Banten.",
          menu: [
            {
              menuId: 1,
              category: [1,2],
              name: "Gurame Bakar",
              photo: require("../icons/Logo.png"),
              duration: 15,
              recommended: true,
              description: "Sweet and sour fish is a traditional Chinese dish made in Shandong Province primarily from carp. It is one of the representative dishes of Lu cuisine.",
              price: 65000,
              quantity: 10,
              availability: true,
            },
            {
              menuId: 2,
              category: [3],
              name: "Gurame Asam Manis",
              photo: require("../icons/Logo.png"),
              duration: 15,
              recommended: false,
              description: "Sweet and sour fish is a traditional Chinese dish made in Shandong Province primarily from carp. It is one of the representative dishes of Lu cuisine.",
              price: 85000,
              quantity: 10,
              availability: true,
            },
            {
              menuId: 3,
              category: [5],
              name: "Udang Bakar",
              photo: require("../icons/Logo.png"),
              duration: 10,
              recommended: true,
              description: "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
              price: 45000,
              quantity: 10,
              availability: true,
            },
            {
              menuId: 4,
              category: [4],
              name: "Sayur Asin",
              photo: require("../icons/Logo.png"),
              duration: 5,
              recommended: false,
              description: "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
              price: 30000,
              quantity: 10,
              availability: true,
            },
            {
              menuId: 5,
              category: [2,4],
              name: "Udang Bakar",
              photo: require("../icons/Logo.png"),
              duration: 10,
              recommended: true,
              description: "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
              price: 45000,
              quantity: 10,
              availability: true,
            },
            {
              menuId: 6,
              category: [6],
              name: "Soda Gembira",
              photo: require("../icons/Logo.png"),
              duration: 10,
              recommended: true,
              description: "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
              price: 15000,
              quantity: 10,
              availability: true,
            },
          ]
        }
      ]
}

export default {Data}
