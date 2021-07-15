import React, {useState, useContext} from 'react';
import { useHistory } from "react-router-dom";
import AlertaContext from '../../context/alertas/alertaContext'
import './newCCR.css'
import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/token';
const NewCCR = ({opacityOn, setOpacityOn, itemToAdd, idRegion, setMostrarForm, setMostrarRegiones, setUpdateRegions, updateRegions}) => {
  
  let history = useHistory();
  
  const alertaContext = useContext(AlertaContext);
  const {alerta, mostrarAlerta, ocultarAlarma} = alertaContext; 

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
    // const routeToRedirect = localStorage.getItem("currentComponent")
    mostrarAlerta("You have added successfuly a new region item")
    ocultarAlarma();
    //Si viene de los formularios debo redireccionar ahi sino me quedo no mas en region
    // if(routeToRedirect === '/add-new-contact' || routeToRedirect === '/modify-contact' || routeToRedirect === '/add-new-company' || routeToRedirect === '/modify-company') {
    //   history.push(routeToRedirect);
    // }else{
    //   history.push('/regiones')
    // }
    history.push('/regiones')
    // props.history.push("/companias")
  }

  const closeForm = () => {
    setMostrarForm(false)
    setMostrarRegiones(true);
    setOpacityOn("opacity-one")
  }

  return (  
    <div className="contenedor-form">
      {alerta ? ( <div className="alert alert-success position-fixed top-0 left-0 index-3">{alerta.msg}</div>): null}
      <a className="close-btn position-absolute" onClick={closeForm}><i class="fas fa-window-close"></i></a>
      <form
        className="form-new-ccr costumize-newUser-form-styles h-100 position-relative"
        onSubmit={onSubmitHandler}
      >
    <div className="form-group contenedor-input">
      <label htmlFor="exampleInputEmail1" className="htmlForm-label mx-2 costumized-label">Name of {itemToAdd}</label>
      <input name="region_name" type="text" className="htmlForm-control" onChange={onChangeHandler} value={region_name}
      />
    </div>
    <button type="submit" className="btn btn-primary btn-sm position-absolute btn-submit-form">Add</button>
  </form>
    </div>
  );
}
 
export default NewCCR;