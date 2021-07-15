import React from 'react';
import './itemCity.css'
import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/token';
const GrandChildNode = ({setItemToAdd, setIdRegion,setMostrarFormUpdate, setOpacityOn, setUpdateRegions, updateRegions, title, cityID}) => {

    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIyNDExNDU2LCJleHAiOjE2MjI0OTc4NTZ9.EwVkwLUTWBtVgshxmupc0ZE5oQRXEqJjNdpm36GoOzU'
    // console.log(cityID);
    //Maneja si se muestran o no los childs
    // const changeDisplayClass = () => {
    //     console.log("entranding");
    //     if(displayClass === "no-render"){
    //         setDisplayClass("yep-render")
    //     }else{
    //         setDisplayClass("no-render")
    //     }
    // }

    //Maneja la aparición del form para actualizar un item
    const updateItem = () => {
        console.log(cityID);
        setIdRegion(cityID)
        setItemToAdd("city")
        console.log("updating");
        setOpacityOn("opacity-lower")
        setMostrarFormUpdate(true);
    }

    //Maneja el request para borrar el item en cuestion
    const deleteItem = async () => {
        console.log(cityID);
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        console.log("deleting");
        const data = await clienteAxios.delete(`/regions/removeCity/${cityID}`)
        // const response = await data.json();
        console.log(data);
        if(updateRegions === true){
            setUpdateRegions(false);
        }else{
            setUpdateRegions(true);
        }
    }
    return (  
        <li>
            {/* <h3>{title}</h3> */}
            <div className="city-item-container">
                {/* <button className="btn btn-secondary country-item-acordion-btn"><i class="far fa-caret-square-down"></i></button> */}
                <h1 className="item-city-name">{title}</h1>  
                <div className="dropDown-container-country">
                {/* <button onClick={dropDownMenu} className="acordion-btn"><i class="fas fa-ellipsis-v"></i></button> */}
                <div class="dropdown">
                <a class="dropdown-config-grand-child" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" onClick={updateItem} href="#">Modificar</a></li>
                    <li><a class="dropdown-item" onClick={deleteItem} href="#">Eliminar</a></li>
                </ul>
                </div>
                </div>
        </div>
        </li>
    );
}
 
export default GrandChildNode;