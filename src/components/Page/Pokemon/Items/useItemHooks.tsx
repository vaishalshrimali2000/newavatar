"use client";
import React, { useState, useEffect } from "react";
import axios from 'axios';

export const useItemHooks = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // COMMON OPTION LIST
  const commonOptList = [
    {
      value: "Y",
      label: "Y",
    },
    {
      value: "N",
      label: "N",
    },
  ];

  // GET STONE QUALITY DROPDOWN DATA
  const [stoneQualityList, setStoneQualityList] = useState([]);
  const getStoneQualityList = () => {
    axios.get(`${apiUrl}/getstonequality`)
      .then((response) => {
        setStoneQualityList(response.data);
      })
      .catch((error) => {
        setStoneQualityList([]);
      });
  };

  // GET ITEM DAYS DROPDOWN DATA
  const [itemDaysList, setItemDaysList] = useState([]);
  const getItemDaysList = () => {
    axios.get(`${apiUrl}/getitemdays`)
      .then((response) => {
        setItemDaysList(response.data);
      })
      .catch((error) => {
        setItemDaysList([]);
      });
  };

  // GET SUBCATEGORY LIST DROPDOWN DATA
  const [subCategoryList, setSubCategoryList] = useState([]);
  const getSubCategoryList = () => {
    axios.get(`${apiUrl}/getsubcategories`)
      .then((response) => {
        setSubCategoryList(response.data);
      })
      .catch((error) => {
        setSubCategoryList([]);
      });
  };

  // GET SUBCATEGORY LIST DROPDOWN DATA
  const [cartDaysList, setCartDaysList] = useState([]);
  const getCartDaysList = () => {
    axios.get(`${apiUrl}/getcartdays`)
      .then((response) => {
        setCartDaysList(response.data);
      })
      .catch((error) => {
        setCartDaysList([]);
      });
  };

  // GET UOM LIST DROPDOWN DATA
  const [uomList, setUOMList] = useState([]);
  const getUOMList = () => {
    axios.get(`${apiUrl}/getuom`)
      .then((response) => {
        setUOMList(response.data);
      })
      .catch((error) => {
        setUOMList([]);
      });
  };

  // GET METALS LIST DROPDOWN DATA
  const [metalList, setMetalList] = useState([]);
  const getMetalList = () => {
    axios.get(`${apiUrl}/getmetals`)
      .then((response) => {
        setMetalList(response.data);
      })
      .catch((error) => {
        setMetalList([]);
      });
  };

  // GET STONE LIST DROPDOWN DATA
  const [stoneList, setStoneList] = useState([]);
  const getStoneList = () => {
    axios.get(`${apiUrl}/getstones`)
      .then((response) => {
        setStoneList(response.data);
      })
      .catch((error) => {
        setStoneList([]);
      });
  };

  // GET STONE COLOR LIST DROPDOWN DATA
  const [stoneColorList, setStoneColorList] = useState([]);
  const getStoneColorList = () => {
    axios.get(`${apiUrl}/getstonecolors`)
      .then((response) => {
        setStoneColorList(response.data);
      })
      .catch((error) => {
        setStoneColorList([]);
      });
  };

  // GET STONE SHAP LIST DROPDOWN DATA
  const [stoneShapesList, setStoneShapesList] = useState([]);
  const getStoneShapesList = () => {
    axios.get(`${apiUrl}/getstoneshapes`)
      .then((response) => {
        setStoneShapesList(response.data);
      })
      .catch((error) => {
        setStoneShapesList([]);
      });
  };

  // GET PPTAG LIST DROPDOWN DATA
  const [pptagList, setPPTagList] = useState([]);
  const getPPTagList = () => {
    axios.get(`${apiUrl}/getpptags`)
      .then((response) => {
        setPPTagList(response.data);
      })
      .catch((error) => {
        setPPTagList([]);
      });
  };

  // GET STAR COLOR LIST DROPDOWN DATA
  const [starColorList, setStarColorList] = useState([]);
  const getStarColorList = () => {
    axios.get(`${apiUrl}/getstarcolors`)
      .then((response) => {
        setStarColorList(response.data);
      })
      .catch((error) => {
        setStarColorList([]);
      });
  };

  // GET COLOR LIST DROPDOWN DATA
  const [colorList, setColorList] = useState([]);
  const getColorList = () => {
    axios.get(`${apiUrl}/getcolors`)
      .then((response) => {
        setColorList(response.data);
      })
      .catch((error) => {
        setColorList([]);
      });
  };

  // GET BRAND LIST DROPDOWN DATA
  const [brandList, setBrandList] = useState([]);
  const getBrandList = () => {
    axios.get(`${apiUrl}/getbrands`)
      .then((response) => {
        setBrandList(response.data);
      })
      .catch((error) => {
        setBrandList([]);
      });
  };

  // GET DESIGNER LIST DROPDOWN DATA
  const [designerList, setDesignerList] = useState([]);

  // GET CAD DESIGNER LIST DROPDOWN DATA
  const [caddesignerList, setCadDesignerList] = useState([]);
  const getCadDesignerList = () => {
    axios.get(`${apiUrl}/getdesigners`)
      .then((response) => {
        setCadDesignerList(response.data);
      })
      .catch((error) => {
        setCadDesignerList([]);
      });
  };

  // Fetch data when component mounts
  useEffect(() => {
    getStoneQualityList();
    getItemDaysList();
    getSubCategoryList();
    getCartDaysList();
    getUOMList();
    getMetalList();
    getStoneList();
    getStoneColorList();
    getStoneShapesList();
    getPPTagList();
    getStarColorList();
    getColorList();
    getBrandList();
    getCadDesignerList();
  }, []);

  return {
    stoneQualityList,
    itemDaysList,
    subCategoryList,
    cartDaysList,
    uomList,
    metalList,
    stoneList,
    stoneColorList,
    stoneShapesList,
    pptagList,
    starColorList,
    commonOptList,
    colorList,
    brandList,
    designerList,
    caddesignerList,
  };
};
