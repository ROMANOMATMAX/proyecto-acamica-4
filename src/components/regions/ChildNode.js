import React, {useState} from 'react';
import GrandChildNode from './GrandChildNode'
import ItemRegion from './ItemRegion'
import ItemCountry from './ItemCountry'
import('./regions.css')
import('./parentNode.css')


const ChildNode = ({setMostrarFormUpdate, setUpdateRegions, updateRegions, setOpacityOn, id, setIdRegion, itemData, children, mostrarRegiones, setMostrarRegiones, mostrarForm, setMostrarForm,setItemToAdd}) => {
    // console.log(children);
    // console.log(id);
    const [displayClassChildren, setDisplayClassChildren] = useState("no-render");
    const [showAddCityBtn, setShowAddCityBtn] = useState(false);

    const onClickHandler = () => {
        setItemToAdd("city")
        setMostrarRegiones(false)
        setMostrarForm(true)
        setOpacityOn("opacity-lower")
        setIdRegion(id)
    }
    let keyChild = 0;

    const changeDisplayClassChildren = () => {
        console.log("entranding");
        if(displayClassChildren === "no-render"){
            setDisplayClassChildren("yep-render")
        }else{
            setDisplayClassChildren("no-render")
        }
    }

    return (  
        <li>
            <ItemCountry
                parentName={itemData}
                displayClass={displayClassChildren}
                showAddCityBtn={showAddCityBtn}
                setShowAddCityBtn={setShowAddCityBtn}
                setDisplayClass={setDisplayClassChildren}
                id={id}
                setUpdateRegions={setUpdateRegions}
                updateRegions={updateRegions}
                setOpacityOn={setOpacityOn}
                setMostrarFormUpdate={setMostrarFormUpdate}
                setIdRegion={setIdRegion}
                setItemToAdd={setItemToAdd}
            />
            <ul className={displayClassChildren}>
                {children.map(item => (
                        <GrandChildNode
                            key={item.key}
                            setIdRegion={setIdRegion}
                            setItemToAdd={setItemToAdd}
                            cityID={item.id}
                            title={item.title}
                            setUpdateRegions={setUpdateRegions}
                            updateRegions={updateRegions}
                            setOpacityOn={setOpacityOn}
                            setMostrarFormUpdate={setMostrarFormUpdate}
                        />
                ))}
            </ul>
            {showAddCityBtn ?<button
                onClick={onClickHandler}
                className="btn btn-primary btn-sm btn-add-new-city my-2"
            >new city
            </button> : null}
        </li>
    );
}
 
export default ChildNode;