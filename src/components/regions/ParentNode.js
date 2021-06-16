import React, {Fragment, useState} from 'react';
import ChildNode from './ChildNode'
import ItemRegion from './ItemRegion';
// import itemRegion from './ItemRegion'
import NewCCR from './NewCCR'
import ('./region.css')
import ('./parentNode.css')



const ParentNode = ({mostrarFormUpdate, setMostrarFormUpdate,setUpdateRegions, updateRegions, setOpacityOn, itemStyleConfig, setIdRegion, identificador, parentName, children, mostrarRegiones, setMostrarRegiones, mostrarForm, setMostrarForm, setItemToAdd, classRender}) => {
    // const [displayNone, setDisplayNone] = useState("no-render")
    // console.log(children);
    // console.log(identificador);
    const [countryId, setCountryId] = useState(0);
    const [displayClass, setDisplayClass] = useState("no-render");
    const [displayDropDown, setDisplayDropDown] = useState("hola");
    const [showAddCountryBtn, setShowAddCountryBtn] = useState(false);
    // const [staticPosition, setStaticPosition] = useState("position-static");
    const onClickHandler = () =>{
        setItemToAdd("country")
        setMostrarRegiones(false)
        setMostrarForm(true)
        setOpacityOn("opacity-lower")
        setIdRegion(identificador)
    }

    const onClickDeleteHandler = () => {
        // await fetch(`http://localhost:4000/regions/addRegion`, {
        // method: 'POST',
        // headers:{
        //     'Content-Type': 'application/json',
        //     'x-access-token': token
        // },
        // body: JSON.stringify(newObject)
    }

    const changeDisplayClass = () => {
        console.log("entranding");
        if(displayClass === "no-render"){
            setDisplayClass("yep-render")
        }else{
            setDisplayClass("no-render")
        }
    }

    const dropDownMenu = () => {
        console.log("soy drop");
        if(displayDropDown === "hola"){
            setDisplayDropDown("chau")
        }else {
            setDisplayDropDown("hola")
        }
    }

    let keyParent = 0;
    return (
        <Fragment>
            <ItemRegion
                parentName={parentName}
                displayClass={displayClass}
                showAddCountryBtn={showAddCountryBtn}
                setShowAddCountryBtn={setShowAddCountryBtn}
                setDisplayClass={setDisplayClass}
                itemStyleConfig={itemStyleConfig}
                identificador={identificador}
                setUpdateRegions={setUpdateRegions} 
                updateRegions={updateRegions}
                setIdRegion={setIdRegion}
                setItemToAdd={setItemToAdd}
                setOpacityOn={setOpacityOn}
                setMostrarFormUpdate={setMostrarFormUpdate}
                setIdRegion={setIdRegion}
            />
            <ul className={displayClass+" " +"parent-container"}> 
                {
                    children.map(item => (   
                        <ChildNode
                            key={item.key}
                            id={item.id}
                            setIdRegion={setIdRegion}
                            itemData={item.title}
                            children={item.children}
                            mostrarRegiones={mostrarRegiones}
                            setMostrarRegiones={setMostrarRegiones}
                            mostrarForm={mostrarForm}
                            setMostrarForm={setMostrarForm}
                            setItemToAdd={setItemToAdd}
                            itemStyleConfig={"countries-items"}
                            setOpacityOn={setOpacityOn}
                            setUpdateRegions={setUpdateRegions}
                            setMostrarFormUpdate={setMostrarFormUpdate}
                            updateRegions={updateRegions}
                            // displayNone={displayNone}
                        />
                    ))
                }
            </ul>
            {showAddCountryBtn ?<button
                    onClick={onClickHandler}
                    className="btn btn-secondary btn-sm btn-add-new-country my-2"
            >Agregar un pais</button> : null}
        </Fragment>
    );
}
 
export default ParentNode;