import React, {useState} from 'react';
import './newCCR.css'
import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/token';
const NewCCR = ({opacityOn, setOpacityOn, itemToAdd, idRegion, setMostrarForm, setMostrarRegiones, setUpdateRegions, updateRegions}) => {
  
  
  console.log(itemToAdd);
  console.log(idRegion);
  const [newRegion, setNewRegion] = useState({
    region_name:""
  });



  const onChangeHandler = (e) => {
    setNewRegion({
      ...newRegion,
      [e.target.name] : e.target.value
    })
  }

  const {region_name} = newRegion;

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
        const data = await clienteAxios.post(`/regions/addRegion`, newObject);
        // const response = await data.json();
        console.log(data);
        break;
      case "country": newObject.country_name = newRegion.region_name;
        newObject.fk_region_id=idRegion;
        const data2 = await clienteAxios.post(`/regions/addCountry`, newObject);
        // const response2 = await data2.json();
        console.log(data2);
      break;
      case "city": newObject.city_name = newRegion.region_name;
        newObject.fk_country_id=idRegion;
        const data3 = await clienteAxios.post(`/regions/addCity`, newObject);
        // const response3 = await data3.json();
        console.log(data3);
      break;
    }
    setMostrarForm(false);
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
        className="form-new-ccr costumize-newUser-form-styles"
        onSubmit={onSubmitHandler}
      >
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="htmlForm-label mx-2">Name of {itemToAdd}</label>
      <input name="region_name" type="text" className="htmlForm-control" onChange={onChangeHandler} value={region_name}
      />
    </div>
    <button type="submit" className="btn btn-secondary btn-sm">Submit</button>
  </form>
    </div>
  );
}
 
export default NewCCR;