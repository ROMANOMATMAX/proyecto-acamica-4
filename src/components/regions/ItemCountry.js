import React, {useState} from 'react';
import './itemCountry.css'
import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/token';

const ItemCountry = ({setItemToAdd, setIdRegion, setMostrarFormUpdate, setOpacityOn, setUpdateRegions, updateRegions, id, showAddCityBtn, setShowAddCityBtn , parentName, displayClass, setDisplayClass}) => {

    const [displayDropDown, setDisplayDropDown] = useState("hola");
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIyNDExNDU2LCJleHAiOjE2MjI0OTc4NTZ9.EwVkwLUTWBtVgshxmupc0ZE5oQRXEqJjNdpm36GoOzU'
    //Maneja si se muestran o no los childs
    const changeDisplayClass = () => {
        console.log("entranding");
        if(displayClass === "no-render"){
            setDisplayClass("yep-render")
            setShowAddCityBtn(true)
        }else{
            setDisplayClass("no-render")
            setShowAddCityBtn(false)
        }
    }

    //Maneja la aparición del form para actualizar un item
    const updateItem = () => {
        console.log(id);
        setIdRegion(id);
        setItemToAdd("country")
        console.log("updating");
        setOpacityOn("opacity-lower")
        setMostrarFormUpdate(true);
    }

    //Maneja el request para borrar el item en cuestion
    const deleteItem = async () => {
        console.log("deleting");
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        const data = await clienteAxios.delete(`/regions/removeCountry/${id}`)
        // const response = await data.json();
        console.log(data);
        if(updateRegions === true){
            setUpdateRegions(false);
        }else{
            setUpdateRegions(true);
        }
    }

    return (  
        <div className="country-item-container">
                <a onClick={changeDisplayClass} className="country-item-acordion-btn"><i class="far fa-caret-square-down"></i></a>
                <h1 className="item-country-name">{parentName}</h1>  
                <div className="dropDown-container-country">
                {/* <button onClick={dropDownMenu} className="acordion-btn"><i class="fas fa-ellipsis-v"></i></button> */}
                <div class="dropdown">
                <a class="dropdown-config" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" onClick={updateItem} href="#">Modificar</a></li>
                    <li><a class="dropdown-item" onClick={deleteItem} href="#">Eliminar</a></li>
                </ul>
                </div>
                </div>
        </div>
    );
}
 
export default ItemCountry;