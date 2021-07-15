import React, {useState} from 'react';
import './itemRegion.css'

const ItemRegion = ({setIdRegion, setItemToAdd, setOpacityOn, setMostrarFormUpdate, setUpdateRegions, updateRegions, identificador, showAddCountryBtn, setShowAddCountryBtn, parentName, displayClass, setDisplayClass}) => {

    const [displayDropDown, setDisplayDropDown] = useState("hola");

    //Maneja si se muestran o no los childs
    const changeDisplayClass = () => {
        console.log("entranding");
        if(displayClass === "no-render"){
            setDisplayClass("yep-render")
            setShowAddCountryBtn(true)
        }else{
            setDisplayClass("no-render")
            setShowAddCountryBtn(false)
        }
    }

    //Maneja la aparición del form para actualizar un item
    const updateItem = () => {
        console.log("updating");
        console.log(identificador);
        setIdRegion(identificador);
        setItemToAdd("region")
        console.log("updating");
        setOpacityOn("opacity-lower")
        setMostrarFormUpdate(true);
    }

    //Maneja el request para borrar el item en cuestion
    const deleteItem = () => {
        console.log("deleting");
    }

    return (  
        <div className="region-item-container">
                {/* <button onClick={changeDisplayClass} className="btn btn-primary region-item-acordion-btn"><i class="far fa-caret-square-down"></i></button> */}
                <a onClick={changeDisplayClass} className="region-item-acordion-btn-left"><i class="far fa-caret-square-down"></i></a>
                <h1 className="item-region-name">{parentName}</h1>  
                <div className="dropDown-container">
                {/* <button onClick={dropDownMenu} className="acordion-btn"><i class="fas fa-ellipsis-v"></i></button> */}
                <div class="">
                <a class="region-item-acordion-btn-right" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
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
 
export default ItemRegion;