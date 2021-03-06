import React, {useContext, Fragment, useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import RegionContext from '../../context/regions/regionContext';
import ParentNode from './ParentNode'
import NewCCR from './NewCCR'
import UpdateCCR from './UpdateCCR'
import Header from '../shared/Header'
import './region.css'
const Regions = () => {
    let history = useHistory();
    //Extraigo el context de region
    const regionContext = useContext(RegionContext);
    const { dataTreeInformation, obtenerRegiones } = regionContext;
    useEffect(() => {
        obtenerRegiones();
    }, [])
    //Me traigo toda esta data que es parte del diseño anterior
    const[updateRegions, setUpdateRegions] = useState(false);
    const [opacityOn, setOpacityOn] = useState("opacity-one")
    const [classRender, setClassRender] = useState("no-render");
    const[mostrarForm, setMostrarForm] = useState(false);
    const[mostrarFormUpdate, setMostrarFormUpdate] = useState(false);
    const [mostrarRegiones, setMostrarRegiones] = useState(true);
    const [itemToAdd, setItemToAdd] = useState('region')
    const [idRegion, setIdRegion] = useState(0);
    const [backToForm, setBackToForm] = useState(false);
    
    useEffect(() => {
      console.log("Hola mundo soy el useEffect que depende de un state");
      obtenerRegiones();
      const routeToRedirect = localStorage.getItem("currentComponent")
      if(routeToRedirect === '/add-new-contact' || routeToRedirect === '/modify-contact' || routeToRedirect === '/add-new-company' || routeToRedirect === '/modify-company') {
        setBackToForm(true)
      }else{
        setBackToForm(false)
      }
      // console.log(dataTreeInformation);
    }, [updateRegions])
    const onClickHandler = () => {
        setOpacityOn("opacity-lower")
        setItemToAdd("region")
        setMostrarForm(true);
        setMostrarRegiones(false)
    }
    const changeClass = () => {
        if(classRender === "no-render"){
        setClassRender("yep-render")
        }else{
        setClassRender("no-render")
        }
    }
    let key = 0;
    const goBackToForm = () => {
      console.log("hello world");
      const routeToRedirect = localStorage.getItem("currentComponent")
      if(routeToRedirect === '/add-new-contact' || routeToRedirect === '/modify-contact' || routeToRedirect === '/add-new-company' || routeToRedirect === '/modify-company') {
        history.push(routeToRedirect);
      }else{
        history.push('/regiones')
      }
    }
    return (  
        <Fragment>
          <Header setBackToForm={setBackToForm} backToForm={backToForm}/>
          {true? <div className={opacityOn + " "+ "region-main-container"}>
            {dataTreeInformation.length>0 
            ? dataTreeInformation.map(item =>(
                <ParentNode 
                setIdRegion={setIdRegion}
                identificador={item.id}
                key={item.key} 
                parentName={item.title} 
                children={item.children} 
                mostrarRegiones={mostrarRegiones} 
                setMostrarRegiones={setMostrarRegiones} 
                mostrarForm= {mostrarForm} 
                mostrarFormUpdate={mostrarFormUpdate}
                setMostrarFormUpdate={setMostrarFormUpdate}
                setMostrarForm={setMostrarForm}
                setItemToAdd={setItemToAdd}
                classRender={classRender}
                itemStyleConfig={"regions-items"}
                setOpacityOn={setOpacityOn}
                setUpdateRegions={setUpdateRegions}
                updateRegions={updateRegions}
                />
            ))
            : <h3>Ninguna Region o data para mostrar</h3>}
          </div> : null}
          {mostrarRegiones ? <button
            onClick={onClickHandler}
            className="btn btn-primary btn-add-new-region"
          >
            new region
          </button> : null}
          {backToForm ? <button
            onClick={goBackToForm}
            className="btn btn-primary btn-add-new-region"
          >
            back to form
          </button> : null}
          {mostrarForm ? <NewCCR opacityOn={opacityOn} setOpacityOn={setOpacityOn} itemToAdd={itemToAdd} idRegion={idRegion} setMostrarForm={setMostrarForm} setMostrarRegiones={setMostrarRegiones} setUpdateRegions={setUpdateRegions} updateRegions={updateRegions}/> : null}
          {mostrarFormUpdate ?<UpdateCCR setMostrarFormUpdate={setMostrarFormUpdate} opacityOn={opacityOn} setOpacityOn={setOpacityOn} itemToAdd={itemToAdd} idRegion={idRegion} setMostrarForm={setMostrarForm} setMostrarRegiones={setMostrarRegiones} setUpdateRegions={setUpdateRegions} updateRegions={updateRegions}/> : null }
        </Fragment>
      );
}
 
export default Regions;