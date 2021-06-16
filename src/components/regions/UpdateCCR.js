import React, {useState, useEffect} from 'react';
import './newCCR.css'
import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/token';
const UpdateCCR = ({setMostrarFormUpdate, opacityOn, setOpacityOn, itemToAdd, idRegion, setMostrarForm, setMostrarRegiones, setUpdateRegions, updateRegions}) => {
  
  const [itemValue, setItemValue] = useState("");
  const [newRegion, setNewRegion] = useState({
    region_name:""
  });
  const {region_name} = newRegion;
  useEffect(() => {
    queryCurrentValue();
  }, [])    


  const queryCurrentValue = async () =>{
    let currentCountry="";
    let currentCity="";
    let url = `http://localhost:4000/regions/oneCountryById/${idRegion}`
    console.log(url);
    const token = localStorage.getItem('token');
    if(token){
        tokenAuth(token);
    }
    switch(itemToAdd) {
        case "region": 
        try {
            const respuesta = await clienteAxios.get(`/regions/oneRegionById/${idRegion}`);
            console.log(respuesta);
            currentCountry = respuesta.data;
            setNewRegion({
                ...newRegion,
                region_name : currentCountry.country_name
            })
            console.log(newRegion);
            break;
        }catch(error) {
            console.log(error)
            break;
        }
        case "country": 
        try {
            const respuesta = await clienteAxios.get(`/regions/oneCountryById/${idRegion}`);
            currentCountry = respuesta.data;
            setNewRegion({
                ...newRegion,
                region_name : currentCountry.country_name
            })
            console.log(newRegion);
            break;
        }catch(error) {
            console.log(error)
            break;
        }
        case "city": 
        try {
            const respuesta2 = await clienteAxios.get(`/regions/oneCityById/${idRegion}`);
            currentCity = respuesta2.data;
            setNewRegion({
                ...newRegion,
                region_name : currentCity.city_name
            })
            console.log(newRegion);
            break;
        }catch(error) {
            console.log(error)
            break;
        }
        default: break;
        // const data = await fetch(`http://localhost:4000/regions/oneCountryById/${idRegion}`, {
        //     method: 'GET',
        //     headers:{
        //         'x-access-token': token
        //     }
        // });
    //     currentCountry = await data.json();
    //     setNewRegion({
    //         ...newRegion,
    //         region_name : currentCountry.country_name
    //     })
    //     console.log(newRegion);
    //     break;
    //     case "city":
    //         const data2 = await fetch(`http://localhost:4000/regions/oneCityById/${idRegion}`, {
    //         method: 'GET',
    //         headers:{
    //             'x-access-token': token
    //         }
    //     });
    //     currentCity = await data2.json();
    //     setNewRegion({
    //         ...newRegion,
    //         region_name : currentCity.city_name
    //     })
    //     console.log(newRegion);
    //     break;
    //     default: break;
    }
    console.log(currentCountry);
    console.log(currentCountry.country_name);
    console.log(currentCity.city_name);
  }

  console.log(itemToAdd);
  console.log(idRegion);
  

  

  const onChangeHandler = (e) => {
    setNewRegion({
      ...newRegion,
      [e.target.name] : e.target.value
    })
  }



  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(newRegion);
    setOpacityOn("opacity-one")
    const newObject = {};
    const token = localStorage.getItem('token');
    if(token){
        tokenAuth(token);
    }
    //switch para ver si hay que agregar una ciudad - un pais o una region
    switch(itemToAdd) {
      case "region": newObject.region_name = newRegion.region_name;
      const data0 = await clienteAxios.put(`/regions/modifyRegion/${idRegion}`, newObject);
      break;
      case "country": newObject.country_name = newRegion.region_name;
      const data = await clienteAxios.put(`/regions/modifyCountry/${idRegion}`, newObject);
      break;
      case "city": newObject.city_name = newRegion.region_name;
      console.log(newObject);
      const data2 = await clienteAxios.put(`/regions/modifyCity/${idRegion}`, newObject);
      break;
      default: break;
    // const response3 = await data3.json();
    // console.log(response3);
    //   break;
    }
    setMostrarFormUpdate(false);
    setMostrarRegiones(true);
    console.log(updateRegions);
    if(updateRegions === true){
      setUpdateRegions(false);
    }else{
      setUpdateRegions(true);
    }
  }

  return (  
    <div className="contenedor-form">
      <form
        className="form-new-ccr"
        onSubmit={onSubmitHandler}
      >
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="htmlForm-label mx-2">Name of {itemToAdd}: </label>
      <input name="region_name" type="text" className="htmlForm-control" onChange={onChangeHandler} value={region_name}
      />
    </div>
    <button type="submit" className="btn btn-secondary btn-sm">Submit</button>
  </form>
    </div>
  );
}
 
export default UpdateCCR;